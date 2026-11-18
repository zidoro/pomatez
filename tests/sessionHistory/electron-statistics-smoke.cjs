// Build first. Launch this script with Electron and pass a disposable writable profile.
const { app, BrowserWindow } = require("electron");
const { strict: assert } = require("node:assert");
const path = require("node:path");
const { statSync } = require("node:fs");

const profile = process.argv.at(-1);
assert(
  path.isAbsolute(profile) && statSync(profile).isDirectory(),
  "Pass an absolute disposable profile directory"
);
app.setPath("userData", profile);
app
  .whenReady()
  .then(async () => {
    const build = path.resolve(__dirname, "../../app/electron/build");
    const window = new BrowserWindow({
      show: false,
      webPreferences: { preload: path.join(build, "preload.js") },
    });
    await window.loadFile(path.join(build, "index.html"));
    const result = await window.webContents
      .executeJavaScript(`(async () => {
    async function until(check) {
      for (let i = 0; i < 100; i++) {
        if (check()) return;
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      throw new Error("Statistics UI did not reach expected state: " + document.body.innerText);
    }
    localStorage.setItem("pomatez.reporting-time-zone", "UTC");
    const link = () => document.querySelector('a[href="#/statistics"]');
    await until(link);
    link().click();
    const contains = text => document.querySelector(".history-page")?.innerText.includes(text);
    await until(() => contains("No recorded activity"));
    const db = await new Promise((resolve, reject) => {
      const request = indexedDB.open("pomatez-session-history", 4);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    await new Promise((resolve, reject) => {
      const tx = db.transaction("events", "readwrite");
      const store = tx.objectStore("events");
      const start = new Date();
      start.setUTCHours(12, 0, 0, 0);
      const end = new Date(start.getTime() + 300000).toISOString();
      const common = {
        schema_version: 1, source: "pomatez", device_id: "fixture", session_id: "focus",
        phase: "focus", task_id: null, recorded_at: end,
      };
      store.add({ ...common, event_id: "fixture:segment", sequence: 1, record_type: "active_segment",
        started_at: start.toISOString(), ended_at: end, observed_ended_at: end,
        duration_ms: 300000, quality_flags: [], end_reason: "completed" });
      store.add({ ...common, event_id: "fixture:end", sequence: 2, record_type: "session_ended",
        ended_at: end, status: "completed", quality_flags: [], end_reason: "completed" });
      tx.oncomplete = resolve;
      tx.onabort = () => reject(tx.error);
    });
    db.close();
    Array.from(document.querySelectorAll(".history-page button")).find(button => button.textContent === "Refresh").click();
    await until(() => contains("5 min focus") && contains("5 min credited") && contains("Completed"));
    document.querySelector('button[aria-label="Previous period"]').click();
    await until(() => contains("No recorded activity"));
    return true;
  })()`);
    assert.equal(result, true);
    console.log(
      "Electron Statistics navigation, filtering and IndexedDB display passed"
    );
    app.exit();
  })
  .catch((error) => {
    console.error(error);
    app.exit(1);
  });
