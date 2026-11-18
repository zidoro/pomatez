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
