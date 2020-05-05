import { BrowserWindow, app, ipcMain, globalShortcut } from "electron";
import path from "path";

import {
  activateGlobalShortcuts,
  blockShortcutKeys,
  createSystemTray,
  activateAutoUpdate,
} from "./functions";

import { CHANNELS, UPDATES, ACTIONS } from "./helpers";

import "v8-compile-cache";

const onProduction = app.isPackaged;

const appIconDark =
  process.platform === "linux"
    ? path.join(__dirname, "../src/assets/logos/logo-dark.png")
    : path.join(__dirname, "../src/assets/logos/logo-dark.ico");

const trayIcon = path.join(__dirname, "../src/assets/logos/tray.png");
const trayIconDark = path.join(__dirname, "../src/assets/logos/tray-dark.png");

const onlySingleIntance = app.requestSingleInstanceLock();

let win: BrowserWindow | null;

function createMainWindow() {
  win = new BrowserWindow({
    width: 340,
    height: 500,
    resizable: false,
    maximizable: false,
    show: false,
    frame: false,
    icon: appIconDark,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL(
    !onProduction
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "index.html")}`
  );

  win.once("ready-to-show", () => {
    win?.show();
  });

  win.on("closed", () => {
    win = null;
  });
}

if (!onlySingleIntance) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (win) {
      if (win.isMinimized()) {
        win.restore();
      } else if (!win.isVisible()) {
        win.show();
      } else {
        win.focus();
      }
    }
  });

  app.on("ready", () => {
    createMainWindow();

    const tray = createSystemTray({
      icon: trayIconDark,
      template: [
        {
          label: "Hide",
          accelerator: "Alt+Shift+H",
          click: () => {
            if (!win?.isVisible()) {
              win?.hide();
            }
          },
        },
        {
          label: "Show",
          accelerator: "Alt+Shift+S",
          click: () => {
            if (!win?.isVisible()) {
              win?.show();
            }
          },
        },
        {
          label: "Quit",
          role: "quit",
        },
      ],
    });

    tray.on("click", () => {
      if (!win?.isVisible()) {
        win?.show();
      } else {
        win?.hide();
      }
    });

    if (win && onProduction) {
      const blockKeys = [
        "CommandOrControl+R",
        "CommandOrControl+Shift+R",
        "CommandOrControl+Alt+Q",
        "F11",
      ];
      blockShortcutKeys(win, blockKeys);
    }

    activateGlobalShortcuts([
      {
        key: "Alt+Shift+H",
        callback: () => {
          win?.hide();
        },
      },
      {
        key: "Alt+Shift+S",
        callback: () => {
          win?.show();
        },
      },
    ]);

    const autoUpdater = activateAutoUpdate({});

    ipcMain.on(CHANNELS.TO_MAIN, (event, data) => {
      if (win) {
        switch (data.type) {
          case ACTIONS.SET_THEME:
            const { darkTheme } = data.payload;

            const backgroundColor = darkTheme ? "#141e25" : "#fff";
            const iconOnTray = darkTheme ? trayIconDark : trayIcon;

            win.setBackgroundColor(backgroundColor);
            tray.setImage(iconOnTray);
            break;

          case ACTIONS.MINIMIZE:
            win.minimize();
            break;

          case ACTIONS.HIDE:
            win.hide();
            break;

          case ACTIONS.FULL_SCREEN:
            win.setSkipTaskbar(data.payload);
            win.setFullScreen(data.payload);
            win.setVisibleOnAllWorkspaces(data.payload);

            if (data.payload === false) {
              if (win.isFullScreen()) {
                win.setFullScreen(false);
              }
            } else {
              if (!win.isFullScreen()) {
                win.setFullScreen(true);
              }
            }

            if (!win.isVisible()) {
              win.show();
              win.focus();
            }

            if (!win.isAlwaysOnTop()) {
              win.setAlwaysOnTop(data.payload, "screen-saver");
            } else {
              win.setAlwaysOnTop(true, "screen-saver");
            }

            if (win.isFullScreen()) {
              globalShortcut.unregister("Alt+Shift+H");
            } else {
              globalShortcut.register("Alt+Shift+H", () => {
                win?.hide();
              });
            }
            break;

          case ACTIONS.ALWAYS_ON_TOP:
            win.setAlwaysOnTop(data.payload);
            break;

          case ACTIONS.QUIT_INSTALL_UPDATES:
            autoUpdater.quitAndInstall();
            break;

          default:
            return data.payload;
        }
      }
    });
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createMainWindow();
  }
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.setLoginItemSettings({ openAtLogin: true });
app.setAppUserModelId("electron.app.PRODUCTIVITY_TIMER");
