const {
  app,
  BrowserWindow,
  globalShortcut,
  Tray,
  Menu,
  ipcMain
} = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");

const isDev = require("./scripts/isDev");

const appIcon = path.join(__dirname, "../src/assets/icons/icon.ico");
const trayIcon = path.join(__dirname, "../src/assets/icons/32x32.png");

const gotTheLock = app.requestSingleInstanceLock();
const appId = "com.roldanjrCodeArts9711.ProductivityTimer";

app.setAppUserModelId(appId);
app.setLoginItemSettings({ openAtLogin: true });

require("v8-compile-cache");

let win = null;
let tray = null;

function createWindow() {
  win = new BrowserWindow({
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

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  win.once("ready-to-show", () => win.show());

  win.on("closed", () => (win = null));
}

function createSystemTray() {
  tray = new Tray(trayIcon);

  let contextMenu = Menu.buildFromTemplate([
    {
      label: "Quit",
      role: "quit"
    }
  ]);

  tray.setToolTip("Productivity Timer");
  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    win.isVisible() ? win.hide() : win.show();
  });
}

function registerGlobalShortcut() {
  let shortcutKeys = [
    {
      key: "CommandOrControl+Shift+S",
      callback: () => win.show()
    },
    {
      key: "CommandOrControl+R",
      callback: () => isDev && win.reload()
    },
    {
      key: "CommandOrControl+Shift+R",
      callback: () => isDev && win.reload()
    },
    {
      key: "CommandOrControl+Alt+Q",
      callback: () => isDev && app.quit()
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
    if (win) {
      if (win.isMinimized()) {
        win.restore();
      } else if (!win.isVisible()) {
        win.show();
      }
      win.focus();
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
  if (win === null) {
    createWindow();
  }
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

autoUpdater.on("update-available", () =>
  win.webContents.send("update-available")
);

autoUpdater.on("update-downloaded", () =>
  win.webContents.send("update-downloaded")
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
