import { BrowserWindow, app, ipcMain, globalShortcut } from "electron";
import path from "path";

import {
  activateGlobalShortcuts,
  blockShortcutKeys,
  createSystemTray,
  activateAutoUpdate,
} from "./functions";

import { CHANNELS, ACTIONS, getIcon } from "./helpers";

import "v8-compile-cache";

const onProduction = app.isPackaged;

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
    icon: getIcon(),
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      backgroundThrottling: false,
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
          label: "Show",
          click: () => {
            if (!win?.isVisible()) {
              win?.show();
            }
          },
        },
        {
          label: "Hide",
          click: () => {
            if (win?.isFullScreen()) return;
            if (win?.isVisible()) {
              win?.hide();
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
        if (!win?.isFullScreen()) {
          win?.hide();
        }
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
            const { isFullScreen, alwaysOnTop } = data.payload;

            if (isFullScreen) {
              if (!win.isVisible()) {
                win.show();
                win.focus();
                win.setAlwaysOnTop(true, "screen-saver");
              }

              win.setSkipTaskbar(true);
              win.setFullScreen(true);
              win.setVisibleOnAllWorkspaces(true);

              globalShortcut.unregister("Alt+Shift+H");
            } else {
              win.setAlwaysOnTop(alwaysOnTop, "screen-saver");

              win.setSkipTaskbar(false);
              win.setFullScreen(false);
              win.setVisibleOnAllWorkspaces(false);

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

app.allowRendererProcessReuse = true;
