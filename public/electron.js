const { app, BrowserWindow, Tray, Menu, globalShortcut } = require("electron");

const isDev = require("electron-is-dev");
const path = require("path");

let window = null;
let tray = null;

app.setAppUserModelId("com.roldanjrCodeArts9711.TimeframeApp");

function createWindow() {
  window = new BrowserWindow({
    width: 400,
    height: 600,
    minWidth: 400,
    minHeight: 600,
    resizable: false,
    maximizable: false,
    frame: false,
    show: false,
    backgroundColor: "#222c33",
    webPreferences: {
      nodeIntegration: true,
      devTools: isDev
    }
  });

  window.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  window.on("ready-to-show", () => window.show());

  window.on("closed", () => (window = null));

  let shortcutKeys = [
    {
      key: "CommandOrControl+Shift+H",
      callback: () => window.hide()
    },
    {
      key: "CommandOrControl+Shift+S",
      callback: () => window.show()
    },
    {
      key: "CommandOrControl+R",
      callback: () => isDev && window.reload()
    },
    {
      key: "CommandOrControl+Shift+R",
      callback: () => isDev && window.reload()
    },
    {
      key: "CommandOrControl+Alt+Q",
      callback: () => app.quit()
    }
  ];

  shortcutKeys.map(({ key, callback }) =>
    globalShortcut.register(key, callback)
  );

  tray = new Tray(path.join(__dirname, "../src/assets/tray.png"));

  let contextMenu = Menu.buildFromTemplate([
    {
      label: "Quit",
      role: "quit"
    }
  ]);

  tray.setToolTip("Timeframe App");
  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    window.isVisible() ? window.hide() : window.show();
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
