# Phase 3 tracking and persistence

Run the independent suite on Node 24 with `yarn test:session-history`.
Run `yarn build` for Electron, renderer and shareables compilation.

The recorder samples once per second and checkpoints every five seconds,
with immediate writes at lifecycle transitions. An unchanged heartbeat must
be observed for thirty seconds on a contender’s monotonic clock before
takeover. During takeover, a timer can run without recording. Recovery uses
the last committed checkpoint and fences the old writer. Delayed or missing
observations can undercount time. Coverage gaps remain in IndexedDB.

Electron supplies native suspend and resume events. Tauri uses clock and
gap detection. Graceful closure uses a best-effort pagehide write. IndexedDB
strict durability is requested where available. Real restart retention, tray
operation and suspend/resume remain desktop validation items on both runtimes.

The original ts-jest baseline failure remains in BASELINE.md. The Electron
runner embeds Jest 25, so it uses Jasmine and an esbuild TypeScript transformer
with the legacy return shape. With Xvfb and a temporary binary wrapper passing
`--no-sandbox` only to the test process, both existing fullscreen tests reached
assertions. Both failed on `setSkipTaskbar` expectations. The unchanged handler
does not call that method.

## Validation before Phase 4

Reviewed tooling commit `0f5aac3` and integration commit `3b6ae4e`.
Diffing the fullscreen handler, test and lifecycle directory against
`c2727800c6272573590911e9ee81637b89e55d5f` produced no differences.
Under Xvfb, the first failure expects `setSkipTaskbar(true)` at line 64 and
the second expects `setSkipTaskbar(false)` at line 121. Both spies see zero
calls. The baseline handler has no call to that method on either path.
These are pre-existing assertion/implementation mismatches, previously
masked by the broken transformer. Fullscreen code and assertions were preserved.

The five-second heartbeat remains. A contender needs thirty seconds of
an unchanged observed revision, plus polling and scheduler latency. The delay
protects live writers during ambiguous termination, especially on Tauri.
A successful non-cached pagehide now finalizes the session and releases
ownership in the same transaction, so the next renderer can claim immediately.
If that transaction cannot finish, recovery retains the previous fencing and
checkpoint behavior. A stale renderer cannot release a newer writer's lease.
Controlled-clock tests cover heartbeat renewal, takeover boundary, no credit
for the wait, idempotent recovery and immediate acquisition after clean close.
Transaction rollback, stale writes, lifecycle outcomes and elapsed-time bounds
remain covered by the independent suite.

Verification in the container:

- Ten independent tests pass. The session history modules pass strict
  TypeScript checking and all three workspaces build.
- A standalone full renderer TypeScript check still encounters parser errors
  in unchanged `i18next` and `react-i18next` declarations under TypeScript 4.9.
- The Electron recorder smoke test under Xvfb wrote a completed focus
  session and an interrupted break to real Chromium IndexedDB, then read
  exact durations and outcomes from a second Electron process with the same
  profile. The harness exercises the recorder in a real webview using a
  fixture page. Timer controls, tray and OS lifecycle are outside this harness.
- Two existing fullscreen assertions fail as described above. The sandbox
  flag was used only for testing. Tauri native validation was unavailable
  because Cargo is absent.

To repeat the Electron smoke test, use a disposable writable profile and run
`tests/sessionHistory/electron-smoke.cjs` with Electron twice, passing the
same absolute profile path followed by `write` and then `read`.
Use Xvfb if needed and a test-only sandbox override only if required by the
container.

On each native desktop runtime, use a disposable app profile and inspect the
session history IndexedDB event and coverage stores in webview developer tools:

1. Start focus, pause for several seconds, resume, and let focus complete.
   Verify separate active segments, no paused credit, and the expected
   automatic break transition. Repeat with skip, reset while paused, and a
   configured special break. Check strict mode still rejects blocked actions.
2. Minimize or close to tray and restore. Check that existing timer behavior
   and segment credit agree while the timer runs. Sleep and wake during focus,
   then try a clock adjustment and a renderer stall on a disposable machine.
   Inspect coverage markers and verify unobserved time is excluded.
3. Reload and restart with completed and interrupted history. Verify retained
   events, stable identities and immediate claim after a successfully committed
   clean close. Force termination after a checkpoint and reopen twice.
   Expect recovery at the committed boundary, no duplicate events, and a
   possible lease wait. Check that app upgrades preserve the storage origin.

Remaining risks are best-effort shutdown flushing, conservative undercount
during renderer stalls or lease waits, and unverified native tray, real sleep,
and Tauri profile behavior. This pass confirms the core for Phase 4
development. Keep native desktop validation as a release gate.
