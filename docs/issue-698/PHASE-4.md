# Phase 4 session history and statistics

The normal navigation exposes Statistics. It reads a snapshot of committed
IndexedDB events on entry or Refresh. Day, Monday-based week and calendar
month filters use the reporting timezone. The first visit saves the system
timezone, and applying a different IANA timezone recomputes the same UTC
history. The view shows credited focus and break time, their ratio,
completed focus and interrupted counts, daily bars with text equivalents,
and session outcomes with credited duration.

Version 1 events are checked before use. Segments with invalid timestamps,
duration mismatches or unknown fields used for accounting are excluded.
Only validated credited intervals contribute time. Calendar clipping uses
Temporal for local midnight and daylight saving transitions. Outcome counts
use the terminal timestamp. A session row shows its credited time across
all validated segments, while summary totals clip to the selected period.
Checkpoint-only activity is not included. Damaged or unsupported events
produce an inline notice, and storage read failures offer Retry.

## Verification

- Run `yarn test:session-history` with Node 24. Deterministic tests exercise
  midnight, Monday weeks, daylight saving transitions, all three break
  phases, malformed and unsupported records, duplicates, interruptions and
  report loading, empty and error states.
- `yarn build` checks the Electron, renderer and shareables workspaces.
  A focused strict type check covers aggregation and the report component.
  The standalone full renderer type check still encounters the Phase 3
  declaration parser failures in i18next and react-i18next on TypeScript 4.9.
- After building, run `tests/sessionHistory/electron-statistics-smoke.cjs`
  with Electron and pass a disposable absolute profile directory. Under Xvfb
  this exercises navigation in the built renderer, real IndexedDB fixture
  reads, refresh, credited times and period filtering. The smoke test uses
  a BrowserWindow harness. It does not exercise native tray, clock, sleep,
  or restart behavior.
- Phase 3 documents why the two unrelated fullscreen assertions fail.

## Native release checks

Run the Phase 3 desktop procedure on Electron and Tauri. Open Statistics
after recording and restarting, change the reporting timezone, and confirm
the same events rebucket without modifying timer state. Check keyboard use,
dark and light styling, and scrolling at the minimum supported window size.
Validate actual Tauri webview storage and navigation on a supported desktop.
