import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import { indexedDB } from "fake-indexeddb";
import { Repository } from "../../app/renderer/src/features/sessionHistory/repository.ts";

test("heartbeat CAS fences a contender and recovers only committed time", async () => {
  const { Tracker } = await import(
    "../../app/renderer/src/features/sessionHistory/tracker.ts"
  );
  const first = await Repository.open(indexedDB, "heartbeat");
  const second = await Repository.open(indexedDB, "heartbeat");
  const tracker = new Tracker("focus", "session");
  const midnight = Date.parse("2026-11-19T00:00:00Z");
  tracker.start(midnight - 2000, 0);
  tracker.sample(midnight + 3000, 5000);
  const stale = await first.update("first", tracker.snapshot());
  const live = await first.update("first", undefined);
  first.close();
  const staleConnection = await Repository.open(indexedDB, "heartbeat");
  await assert.rejects(second.update("second", undefined, stale));
  await second.update("second", undefined, live);
  await assert.rejects(
    staleConnection.update("first", tracker.snapshot())
  );
  await second.update("second");
  const records = await second.records();
  assert.deepEqual(
    records.map((r) => r.sequence),
    [1, 2, 3]
  );
  assert.equal(records[1].duration_ms, 5000);
  assert.equal(records[1].started_at, "2026-11-18T23:59:58.000Z");
  assert.equal(records[1].ended_at, "2026-11-19T00:00:03.000Z");
  assert.equal(records[2].end_reason, "recovered");
  staleConnection.close();
  second.close();
});

test("failed event batch preserves checkpoint and sequence", async () => {
  const { Tracker } = await import(
    "../../app/renderer/src/features/sessionHistory/tracker.ts"
  );
  const db = await Repository.open(indexedDB, "rollback");
  const tracker = new Tracker("focus", "session");
  tracker.start(1000, 0);
  tracker.sample(2000, 1000);
  const writer = await db.update("first", tracker.snapshot());
  const broken = tracker.snapshot();
  broken.segments.push({
    startedAt: Infinity,
    endedAt: Infinity,
    duration: 5,
    reason: "paused",
  });
  await assert.rejects(db.update("first", broken));
  await db.update("second", undefined, writer);
  assert.deepEqual(
    (await db.records()).map((r) => r.sequence),
    [1, 2, 3]
  );
  db.close();
});

test("closed focus and special break produce valid immutable events on retry", async () => {
  const { Tracker } = await import(
    "../../app/renderer/src/features/sessionHistory/tracker.ts"
  );
  const db = await Repository.open(indexedDB, "transitions");
  const focus = new Tracker("focus", "focus", 25000);
  focus.start(1000, 0);
  await db.update("owner", focus.snapshot());
  focus.end(3000, 2000, "special_break");
  await db.update("owner", focus.snapshot());
  await db.update("owner", focus.snapshot());
  const special = new Tracker("special_break", "break", 5000);
  special.start(3000, 2000);
  special.end(7000, 6000, "skipped");
  await db.update("owner", special.snapshot());
  const records = await db.records();
  const Ajv = createRequire(import.meta.url)("ajv");
  const schema = JSON.parse(
    readFileSync(
      new URL(
        "../../docs/issue-698/session-record.schema.json",
        import.meta.url
      ),
      "utf8"
    )
  );
  const validate = new Ajv().compile(schema);
  for (const record of records)
    assert.ok(validate(record), JSON.stringify(validate.errors));
  assert.equal(records.length, 6);
  assert.deepEqual(
    records
      .filter((r) => r.record_type === "session_ended")
      .map((r) => r.end_reason),
    ["special_break", "skipped"]
  );
  assert.deepEqual(
    records
      .filter((r) => r.record_type === "active_segment")
      .map((r) => r.duration_ms),
    [2000, 4000]
  );
  db.close();
});
