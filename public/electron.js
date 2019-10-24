const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  globalShortcut,
  ipcMain
} = require("electron");
const { autoUpdater } = require("electron-updater");

const isDev = require("electron-is-dev");
const path = require("path");

let window = null;
let tray = null;

app.setAppUserModelId("com.roldanjrCodeArts9711.TimeframeApp");

const appIcon = path.join(__dirname, "../src/assets/icons/icon.ico");
const trayIcon = path.join(__dirname, "../src/assets/icons/32x32.png");

const gotTheLock = app.requestSingleInstanceLock();

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
    icon: appIcon,
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

  window.once("ready-to-show", () => window.show());

  window.on("closed", () => (window = null));
}

function createSystemTray() {
  tray = new Tray(trayIcon);

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

function registerGlobalShortcut() {
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
}

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    if (window) {
      if (window.isMinimized()) {
        window.restore();
      } else if (!window.isVisible()) {
        window.show();
      }
      window.focus();
    }
  });

  app.on("ready", () => {
    createWindow();
    createSystemTray();
    registerGlobalShortcut();
    autoUpdater.checkForUpdatesAndNotify();
  });
}

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

autoUpdater.on("update-available", () =>
  window.webContents.send("update-available")
);

autoUpdater.on("update-downloaded", () =>
  window.webContents.send("update-downloaded")
);

autoUpdater.on("download-progress", dp =>
  ipcMain.on("get-update-progress", event =>
    event.sender.send("download-progress", {
      percent: Math.floor(dp.percent)
    })
  )
);

ipcMain.on("restart-app", () => autoUpdater.quitAndInstall());

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
