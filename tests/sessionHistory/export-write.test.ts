import { strict as assert } from "node:assert";
import { test } from "node:test";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  saveHistoryExport,
  validExportRequest,
  writeNewExport,
} from "../../app/electron/src/helpers/historyExport.ts";

test("save cancellation, interrupted write and existing destination preserve data", async (t) => {
  const dir = await mkdtemp(join(tmpdir(), "pomatez-export-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const destination = join(dir, "history.jsonl");
  const contents = '{"record_type":"export_header"}\n';
  assert(
    validExportRequest("pomatez-2026-03-08_2026-03-08.jsonl", contents)
  );
  assert(!validExportRequest("../escape.jsonl", contents));
  assert.deepEqual(
    await saveHistoryExport(
      async () => ({ canceled: true, filePath: destination }),
      contents
    ),
    { status: "cancelled" }
  );
  assert.deepEqual(await readdir(dir), []);
  await assert.rejects(
    writeNewExport(destination, contents, async (handle) => {
      await handle.writeFile("{");
      throw new Error("injected interruption");
    }),
    /injected interruption/
  );
  assert.deepEqual(await readdir(dir), []);
  const choose = async () => ({
    canceled: false,
    filePath: destination,
  });
  assert.deepEqual(await saveHistoryExport(choose, contents), {
    status: "saved",
    path: destination,
  });
  assert.deepEqual(
    await saveHistoryExport(choose, '{"unexpected":true}\n'),
    { status: "exists" }
  );
  assert.equal(await readFile(destination, "utf8"), contents);
  assert.deepEqual(await readdir(dir), ["history.jsonl"]);
});
