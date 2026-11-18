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
