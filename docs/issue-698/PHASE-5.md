# Phase 5 JSONL export

Open Statistics, choose a day, Monday-start week, or calendar month, and
confirm the reporting timezone. Select **Export JSONL**. The filename
contains the first and last local dates. Export uses the same committed
history snapshot shown by Statistics. Use Refresh to include newer events.

## Format and period

Files are UTF-8 JSON Lines with one object per line and a final LF newline.
There is no BOM. [jsonl-export.schema.json](jsonl-export.schema.json) defines
all valid line variants, including the existing [v1 event schema](session-record.schema.json).
The format has three types of lines:

| Line          | Fields and meaning                                                                                                                                                                                                                                                                                                                                                                              |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header        | `record_type=export_header`, `export_version=1`, `source=pomatez`, `reporting_timezone` (IANA name), `range` (day/week/month), inclusive local `first_date` and `last_date`, UTC `start_at` and exclusive `end_at`, `event_count` (history-event lines), `ignored_records` (damaged or unsupported events in the read snapshot), and `ignored_coverage` (damaged coverage entries encountered). |
| History event | The existing `schema_version=1` and `source=pomatez`, installation `device_id`, immutable `event_id`, installation-local `sequence`, `session_id`, `phase`, UTC `recorded_at`, and nullable `task_id`. The event variant supplies the fields below.                                                                                                                                             |
| Coverage gap  | `record_type=coverage_gap`, `export_version=1`, `source=pomatez`, `device_id`, `session_id`, UTC `from_at` and `to_at`, and `reason` (`observation_gap`, `clock_changed`, or `suspended`). These are observed endpoints. A backward clock change may put the second endpoint before the first. Neither endpoint contributes credited time.                                                      |

The four phases are `focus`, `short_break`, `long_break`, and
`special_break`. A `session_started` event records `started_at`,
`configured_duration_ms`, and nullable `round`. An `active_segment`
records `started_at`, `ended_at`, `observed_ended_at`, exact credited
`duration_ms`, `end_reason`, and `quality_flags`. A `session_ended`
event records `ended_at`, `status`, `end_reason`, and `quality_flags`.
Outcome reasons include completed, skipped, reset, quit, recovered,
special break, and configuration change. Segment reasons can also denote
pause, suspension, clock change, or an observation gap. Quality flags
mark recovery, uncertain coverage, clock adjustment, and detected sleep.

The interval is half-open `[start_at, end_at)`, derived from local midnight
boundaries in the selected zone. DST days can have 23 or 25 hours. A session
is selected if a credited segment overlaps the period, or a start or end
falls within it. Export includes its full committed event and coverage
context, including evidence outside the period. It neither rewrites original
segment boundaries nor allocates new event identities. A started session
may lack a terminal event. Uncommitted checkpoint activity is excluded.

To reproduce dashboard totals, sum the intersection of each credited
segment with the period. Use UTC coordinates and integer milliseconds.
The observed wall-clock endpoint is evidence only. Count unique completed
focus sessions and any interrupted sessions by their in-range terminal
timestamp. A history row can show an entire session's credited duration
while period totals contain only its in-range contribution.

The header comes first. Events are ordered by device ID, then sequence,
then event ID. Coverage lines follow, deduplicated and in stable lexical
order. Identical event identities and payloads appear once. Conflicting
identities abort the save. Re-export of an unchanged history and scope is
byte-identical. Importers can deduplicate events from overlapping exports
by `(source, device_id, event_id)`.

A representative file with all three line classes is
[phase5-example.jsonl](phase5-example.jsonl). Example coverage line:

```json
{
  "record_type": "coverage_gap",
  "export_version": 1,
  "source": "pomatez",
  "device_id": "example-device",
  "session_id": "example-session",
  "from_at": "2026-03-08T13:05:00.000Z",
  "to_at": "2026-03-08T13:25:00.000Z",
  "reason": "observation_gap"
}
```

## Save and failure behavior

The history repository reads events and coverage in one read-only IndexedDB
transaction. The renderer validates records, selects the period, and sends
only a proposed filename and text to the native adapter. Empty or invalid-only
periods do not create a file. The export is capped at 32 MiB. Damage counts
are visible in the file and the save message. A storage read failure disables
export and uses the existing Retry action.

Electron opens a native save dialog. Cancel writes nothing. An existing
destination is refused even if a dialog confirmed replacement. Desktop
Tauri writes to Downloads, selecting a numbered suffix when needed. The
renderer cannot pass a Tauri destination path. Each adapter writes a private
exclusive sibling temporary file, flushes and closes it, then hard-links
the completed file into its final name without overwriting. Filesystems
without hard-link support fail explicitly. A crash can leave a hidden
partial, whereas a published export has complete file contents. Directory
entry durability after OS power loss is not guaranteed. Neither adapter
updates or deletes stored history. This is manual export only.

## Verification procedure and release gates

Run `yarn test:session-history` and `yarn build` with Node 24. The automated
suite checks each JSON line against the schemas and covers context across
midnight, DST changes, millisecond precision, pauses, skipped and recovered
outcomes, incomplete sessions, duplicate identity, gaps, cancellation,
collision protection and interrupted filesystem writes.

The independent parser does not import Pomatez, Electron, or the serializer:

```sh
python3 tests/sessionHistory/validate_jsonl.py docs/issue-698/phase5-example.jsonl
```

Pass `--source` with a Repository.readHistory snapshot to compare all selected
persisted records and coverage, and `--compare` with a second export to
compare bytes. For a desktop check, launch with a fresh test profile, record
and interrupt sessions, verify Statistics, save the selected period, and
repeat after restart. Exercise cancellation on Electron and collision
suffixes on Tauri.

Windows and native Tauri validation remain release gates. Check native
save paths, profile retention and protected publication on supported
filesystems. The Tauri command uses the existing desktop invoke mechanism
and Downloads resolver. Cargo and desktop Tauri were unavailable in the
validation container.

## Recorded results

The 17 independent tests, focused strict TypeScript check, and all three
workspace builds passed. Under Xvfb, the actual packaged Linux Electron
application saved through the native dialog and re-exported after process
restart. The files were byte-identical. Python independently parsed all
18 lines and compared the 16 event lines and one coverage line with the
IndexedDB snapshot. Credited totals matched the dashboard at 50 minutes of
focus, 20 minutes of breaks, two completed focus sessions and one reset.
Native cancellation, collision protection, and storage error retry passed.
The old fullscreen suite still fails both baseline setSkipTaskbar assertions.

## Submission validation

The packaged Linux Electron build at `d2fc58c` passed a real timer
start, pause, resume, natural completion, skip, restart, and native save
workflow. Independent comparison of the export against IndexedDB and
Statistics found 60,157 ms of focus, 5,382 ms of break, 11 unique events,
and one excluded observation gap. A follow-up Electron smoke test
verified that resetting the round during focus leaves the current history
session open, matching the unchanged countdown. The history suite,
workspace builds, and TypeScript checks passed.

Linux native Tauri testing requires the dependencies listed in
`.github/workflows/build-tauri.yml`. Cargo reached dependency compilation,
where pkg-config could not find the GLib and GObject development files.
WebKitGTK, JavaScriptCoreGTK, GTK, and Ayatana development files were
also unavailable. A standalone Rust test exercised the filesystem
writer, including suffix selection for an existing destination and
failure when the directory is missing. The native command, webview
reopening, tray shutdown, checkpoint recovery, and sleep/wake still
need testing in Tauri. Tauri writes directly to Downloads under a new
filename and has no save dialog to cancel. Windows native runtime
validation was deferred.
The full renderer declaration issue documented in Phase 4 is unchanged.
