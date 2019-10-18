const { app, BrowserWindow, globalShortcut } = require("electron");

const isDev = require("electron-is-dev");
const path = require("path");

let window;

app.setAppUserModelId("time.management.app");

function createWindow() {
  window = new BrowserWindow({
    width: 400,
    height: 600,
    minWidth: 400,
    minHeight: 600,
    maximizable: false,
    frame: false,
    show: false,
    backgroundColor: "#222c33",
    webPreferences: {
      nodeIntegration: true
    }
  });

  window.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  window.on("ready-to-show", () => window.show());

  window.on("closed", () => (window = null));

  globalShortcut.register("CommandOrControl+Shift+Q", () => {
    app.quit();
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (window === null) {
    createWindow();
  }
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
