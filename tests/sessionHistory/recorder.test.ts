import { strict as assert } from "node:assert";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { buildSync } from "esbuild";
import { IDBFactory } from "fake-indexeddb";
import { Repository } from "../../app/renderer/src/features/sessionHistory/repository.ts";

test("recorder persists automatic phases and interrupted paused sessions", async (t) => {
  const database = new IDBFactory();
  Object.defineProperty(globalThis, "indexedDB", {
    value: database,
    configurable: true,
  });
  t.after(() => {
    Reflect.deleteProperty(globalThis, "indexedDB");
  });
  let now = 0;
  t.mock.method(Date, "now", () => now + 1700000000000);
  t.mock.method(performance, "now", () => now);
  const entry = new URL(
    "../../app/renderer/src/features/sessionHistory/recorder.ts",
    import.meta.url
  );
  const [{ text }] = buildSync({
    entryPoints: [fileURLToPath(entry)],
    bundle: true,
    format: "esm",
    write: false,
  }).outputFiles;
  const recorder = await import(
    "data:text/javascript;base64," +
      Buffer.from(text).toString("base64")
  );
  await recorder.checkpointRecording();
  recorder.syncRecording("focus", true, 1000, 1, 1000);
  now = 1250;
  recorder.finishRecording("completed");
  recorder.syncRecording("short_break", true, 5000, 1, 5000);
  now = 2250;
  recorder.syncRecording("short_break", false, 5000, 1, 4000);
  now = 3250;
  recorder.finishRecording("reset");
  await recorder.checkpointRecording();
  const reader = await Repository.open(
    database,
    "pomatez-session-history"
  );
  const events = await reader.records();
  assert.deepEqual(
    events.map((event) => event.record_type),
    [
      "session_started",
      "active_segment",
      "session_ended",
      "session_started",
      "active_segment",
      "session_ended",
    ]
  );
  assert.deepEqual(
    events
      .filter((e) => e.record_type === "active_segment")
      .map((e) => e.duration_ms),
    [1000, 1000]
  );
  assert.equal(events[5].end_reason, "reset");
  reader.close();
});

test("restart waits on a live heartbeat and excludes takeover time", async (t) => {
  const database = new IDBFactory();
  Object.defineProperty(globalThis, "indexedDB", {
    value: database,
    configurable: true,
  });
  t.after(() => {
    Reflect.deleteProperty(globalThis, "indexedDB");
  });
  let now = 0;
  t.mock.method(Date, "now", () => now + 1700000000000);
  t.mock.method(performance, "now", () => now);
  const [{ text }] = buildSync({
    entryPoints: [
      fileURLToPath(
        new URL(
          "../../app/renderer/src/features/sessionHistory/recorder.ts",
          import.meta.url
        )
      ),
    ],
    bundle: true,
    format: "esm",
    write: false,
  }).outputFiles;
  const url =
    "data:text/javascript;base64," +
    Buffer.from(text).toString("base64");
  const old = await import(url + "#old");
  await old.checkpointRecording();
  old.syncRecording("focus", true, 60000, 1, 60000);
  now = 5000;
  await old.checkpointRecording();
  const restarted = await import(url + "#restart");
  await restarted.checkpointRecording();
  now = 10000;
  await old.checkpointRecording();
  await restarted.checkpointRecording();
  restarted.syncRecording("focus", true, 60000, 1, 60000);
  now = 39999;
  await restarted.checkpointRecording();
  const reader = await Repository.open(
    database,
    "pomatez-session-history"
  );
  assert.equal((await reader.records()).length, 1);
  now = 40000;
  await restarted.checkpointRecording();
  await restarted.checkpointRecording();
  let records = await reader.records();
  assert.deepEqual(records.map((e) => e.duration_ms).filter(Boolean), [
    10000,
  ]);
  assert.equal(records[2].end_reason, "recovered");

  restarted.syncRecording("short_break", true, 5000, 1, 5000);
  now = 41000;
  await restarted.closeRecording();
  const clean = await import(url + "#clean");
  await clean.checkpointRecording();
  clean.syncRecording("focus", true, 60000, 1, 60000);
  now = 42000;
  await clean.closeRecording();
  records = await reader.records();
  assert.deepEqual(
    records.map((e) => e.duration_ms).filter(Boolean),
    [10000, 1000, 1000]
  );
  assert.deepEqual(
    records
      .filter((e) => e.record_type === "session_ended")
      .map((e) => e.end_reason),
    ["recovered", "quit", "quit"]
  );
  reader.close();
});
