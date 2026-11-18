// Run under Xvfb with Electron. Pass --no-sandbox only in a test container that requires it.
const { app, BrowserWindow } = require("electron");
const { buildSync } = require("esbuild");
const { strict: assert } = require("node:assert");
const path = require("node:path");

const [profile, stage] = process.argv.slice(-2);
app.setPath("userData", path.resolve(profile));
app.whenReady().then(async () => {
  const window = new BrowserWindow({ show: false });
  await window.loadFile(path.join(__dirname, "electron-smoke.html"));
  const source = path.join(__dirname, "../../app/renderer/src/features/sessionHistory");
  const [{ text }] = buildSync({
    stdin: {
      contents: 'export * from "./recorder"; export { Repository } from "./repository";',
      resolveDir: source,
    },
    bundle: true, format: "iife", globalName: "historyTest", write: false,
  }).outputFiles;
  await window.webContents.executeJavaScript(text);
  const rows = await window.webContents.executeJavaScript(`(async () => {
    const h = historyTest;
    let time = 0;
    Date.now = () => 1700000000000 + time;
    performance.now = () => time;
    await h.checkpointRecording();
    if (${JSON.stringify(stage)} === "write") {
      h.syncRecording("focus", true, 1000, 1, 1000);
      time = 1000;
      h.finishRecording("completed");
      h.syncRecording("short_break", true, 5000, 1, 5000);
      time = 2000;
      await h.closeRecording();
    }
    return (await h.Repository.open(indexedDB, "pomatez-session-history")).records();
  })()`);
  assert.deepEqual(rows.filter(r => r.record_type === "session_ended").map(r => r.end_reason), ["completed", "quit"]);
  assert.deepEqual(rows.filter(r => r.record_type === "active_segment").map(r => r.duration_ms), [1000, 1000]);
  console.log("Electron IndexedDB smoke passed:", stage);
  app.exit();
}).catch(error => {
  console.error(error);
  app.exit(1);
});
