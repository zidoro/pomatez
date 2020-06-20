import { BrowserWindow, app, ipcMain, globalShortcut, Menu } from "electron";
import notifier from "node-notifier";
import path from "path";
import {
  activateGlobalShortcuts,
  activateAutoUpdate,
  blockShortcutKeys,
  createSystemTray,
  getIcon,
  SET_ALWAYS_ON_TOP,
  SET_FULLSCREEN_BREAK,
  SET_MINIMIZE,
  SET_HIDE,
  SET_UI_THEME,
  SET_NATIVE_TITLEBAR,
  isWindow,
} from "./helpers";
import store from "./store";

import "v8-compile-cache";

const onProduction = app.isPackaged;

const trayIcon = path.join(__dirname, "../src/assets/logos/tray-dark.png");
const notificationIcon = path.join(
  __dirname,
  "../src/assets/logos/notification-dark.png"
);

const onlySingleIntance = app.requestSingleInstanceLock();

Menu.setApplicationMenu(null);

const getFrameHeight = () => {
  if (isWindow()) {
    return 500;
  } else {
    if (store.get("useNativeTitlebar")) {
      return 480;
    }
    return 500;
  }
};

let win: BrowserWindow | null;

let isFullScreen: boolean = false;

function createMainWindow() {
  win = new BrowserWindow({
    width: 340,
    height: getFrameHeight(),
    resizable: false,
    maximizable: false,
    show: false,
    frame: store.get("useNativeTitlebar"),
    icon: getIcon(),
    backgroundColor: store.get("isDarkMode") ? "#141e25" : "#fff",
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

  win.on("close", (e) => {
    e.preventDefault();
    if (!isFullScreen) {
      win?.hide();
    }
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
      icon: trayIcon,
      template: [
        {
          label: "Quit",
          click: () => {
            app.exit();
          },
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

    if (onProduction) {
      if (win) {
        const blockKeys = [
          "CommandOrControl+R",
          "CommandOrControl+Shift+R",
          "CommandOrControl+Alt+Q",
          "F11",
        ];
        blockShortcutKeys(win, blockKeys);
      }
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

    const autoUpdater = activateAutoUpdate({
      onUpdateAvailable: (info) => {
        notifier.notify({
          icon: notificationIcon,
          title: "NEW UPDATE IS AVAILABLE",
          message: `App version ${info.version} ready to be downloaded.`,
          sound: true,
          wait: true,
        });
      },
      onUpdateDownloaded: (info) => {
        notifier.notify(
          {
            icon: notificationIcon,
            title: "READY TO BE INSTALLED",
            message: "Update has been successfully downloaded.",
            actions: ["Quit and Install", "Install it Later"],
            sound: true,
            wait: true,
          },
          (err, response) => {
            if (!err) {
              if (response === "quit and install") {
                autoUpdater.quitAndInstall();
              }
            }
          }
        );
      },
    });

    ipcMain.on(SET_ALWAYS_ON_TOP, (e, { alwaysOnTop }) => {
      win?.setAlwaysOnTop(alwaysOnTop);
    });

    ipcMain.on(SET_FULLSCREEN_BREAK, (e, args) => {
      const { shouldFullscreen, alwaysOnTop } = args;

      if (shouldFullscreen) {
        win?.show();
        win?.focus();
        win?.setAlwaysOnTop(true, "screen-saver");
        win?.setSkipTaskbar(true);
        win?.setFullScreen(true);
        win?.setVisibleOnAllWorkspaces(true);

        globalShortcut.unregister("Alt+Shift+H");

        if (!win?.isVisible()) {
          win?.show();
          win?.focus();
        }

        isFullScreen = shouldFullscreen;
      } else {
        win?.setAlwaysOnTop(alwaysOnTop, "screen-saver");

        win?.setSkipTaskbar(false);
        win?.setFullScreen(false);
        win?.setVisibleOnAllWorkspaces(false);

        globalShortcut.register("Alt+Shift+H", () => {
          win?.hide();
        });

        if (win?.isFullScreen()) win?.setFullScreen(false);

        isFullScreen = shouldFullscreen;
      }
    });

    ipcMain.on(SET_UI_THEME, (e, { isDarkMode }) => {
      store.set("isDarkMode", isDarkMode);
    });

    ipcMain.on(SET_MINIMIZE, () => {
      win?.minimize();
    });

    ipcMain.on(SET_HIDE, () => {
      win?.hide();
    });
  });
}

ipcMain.on(SET_NATIVE_TITLEBAR, (e, { useNativeTitlebar }) => {
  if (store.get("useNativeTitlebar") !== useNativeTitlebar) {
    store.set("useNativeTitlebar", useNativeTitlebar);
    app.relaunch();
    app.exit();
  }
});

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
