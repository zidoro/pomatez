import { strict as assert } from "node:assert";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { Temporal } from "@js-temporal/polyfill";
import { Tracker } from "../../app/renderer/src/features/sessionHistory/tracker.ts";
import { Repository } from "../../app/renderer/src/features/sessionHistory/repository.ts";
import { IDBFactory } from "fake-indexeddb";
import { buildSync } from "esbuild";
import { fileURLToPath } from "node:url";
const [{ text }] = buildSync({
  entryPoints: [
    fileURLToPath(
      new URL(
        "../../app/renderer/src/features/sessionHistory/export.ts",
        import.meta.url
      )
    ),
  ],
  bundle: true,
  format: "esm",
  write: false,
}).outputFiles;
const Ajv = createRequire(import.meta.url)("ajv");
const schema = (name: string) =>
  JSON.parse(
    readFileSync(
      new URL("../../docs/issue-698/" + name, import.meta.url),
      "utf8"
    )
  );
const ajv = new Ajv();
ajv.addSchema(
  schema("session-record.schema.json"),
  "session-record.schema.json"
);
const validLine = ajv.compile(schema("jsonl-export.schema.json"));
const parse = (contents: string) => {
  assert(contents.endsWith("\n"));
  const rows = contents
    .slice(0, -1)
    .split("\n")
    .map((line) => JSON.parse(line));
  rows.forEach((row) =>
    assert(validLine(row), JSON.stringify(validLine.errors))
  );
  return rows;
};

const { makeExport } = await import(
  "data:text/javascript;base64," + Buffer.from(text).toString("base64")
);

test("period export preserves full contextual events, skips unsupported records and deduplicates", async () => {
  const repo = await Repository.open(new IDBFactory(), "export");
  const start = Date.parse("2026-03-08T04:59:58Z");
  const tracker = new Tracker("focus", "crossing");
  tracker.start(start, 0);
  tracker.pause(start + 3000, 3000);
  tracker.start(start + 5000, 5000);
  tracker.end(start + 6001, 6001, "skipped");
  await repo.update("owner", tracker.snapshot());
  const history = await repo.readHistory();
  const scope = {
    date: Temporal.PlainDate.from("2026-03-08"),
    range: "day" as const,
    zone: "America/New_York",
  };
  const file = makeExport(
    [...history.records, history.records[1], { schema_version: 2 }],
    history.coverage,
    scope
  );
  assert.equal(file.ignored, 1);
  assert.equal(file.eventCount, 4);
  const lines = parse(file.contents);
  assert.equal(lines[0].start_at, "2026-03-08T05:00:00.000Z");
  assert.equal(lines[0].end_at, "2026-03-09T04:00:00.000Z");
  assert.deepEqual(lines.slice(1), history.records);
  assert.equal(lines[2].duration_ms, 3000);
  assert.equal(lines[3].duration_ms, 1001);
  assert.equal(lines[4].end_reason, "skipped");
  assert.equal(
    file.contents,
    makeExport(
      [{ schema_version: 2 }, ...[...history.records].reverse()],
      [],
      scope
    ).contents
  );
  assert.equal(makeExport([], [], scope).eventCount, 0);
  assert.throws(
    () =>
      makeExport(
        [
          ...history.records,
          {
            ...history.records[1],
            recorded_at: "2026-04-01T00:00:00.000Z",
          },
        ],
        [],
        scope
      ),
    /conflicting/i
  );
  repo.close();
});

test("gap coverage, recovered history and still-open committed records remain distinct", async () => {
  const factory = new IDBFactory();
  const repo = await Repository.open(factory, "recovery-export");
  const start = Date.parse("2026-11-01T05:59:56Z");
  const tracker = new Tracker("special_break", "recovered");
  tracker.start(start, 0);
  tracker.sample(start + 3000, 3000);
  tracker.sample(start + 19000, 19000);
  tracker.sample(start + 23000, 23000);
  const owner = await repo.update("old", tracker.snapshot());
  await repo.update("new", undefined, owner);
  const started = new Tracker("long_break", "open");
  started.start(start + 24000, 24000);
  started.sample(start + 26000, 26000);
  await repo.update("new", started.snapshot());
  const history = await repo.readHistory();
  const file = makeExport(history.records, history.coverage, {
    date: Temporal.PlainDate.from("2026-11-01"),
    range: "day",
    zone: "America/New_York",
  });
  const rows = parse(file.contents);
  assert.equal(rows[0].start_at, "2026-11-01T04:00:00.000Z");
  assert.equal(rows[0].end_at, "2026-11-02T05:00:00.000Z");
  assert.deepEqual(
    rows
      .slice(1)
      .filter((r) => r.session_id === "open")
      .map((r) => r.record_type),
    ["session_started"]
  );
  assert.equal(
    rows.find((r) => r.record_type === "session_ended").end_reason,
    "recovered"
  );
  assert.deepEqual(
    rows
      .filter((r) => r.record_type === "active_segment")
      .map((r) => r.duration_ms),
    [3000, 4000]
  );
  assert.deepEqual(rows.at(-1), {
    record_type: "coverage_gap",
    export_version: 1,
    source: "pomatez",
    device_id: "old",
    session_id: "recovered",
    from_at: "2026-11-01T05:59:59.000Z",
    to_at: "2026-11-01T06:00:15.000Z",
    reason: "observation_gap",
  });
  repo.close();
});
