"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path_1 = __importDefault(require("path"));
var functions_1 = require("./functions");
var helpers_1 = require("./helpers");
require("v8-compile-cache");
var onProduction = electron_1.app.isPackaged;
var trayIcon = path_1.default.join(__dirname, "../src/assets/logos/tray.png");
var trayIconDark = path_1.default.join(__dirname, "../src/assets/logos/tray-dark.png");
var onlySingleIntance = electron_1.app.requestSingleInstanceLock();
var win;
function createMainWindow() {
    win = new electron_1.BrowserWindow({
        width: 340,
        height: 500,
        resizable: false,
        maximizable: false,
        show: false,
        frame: false,
        icon: helpers_1.getIcon(),
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            backgroundThrottling: false,
            preload: path_1.default.join(__dirname, "preload.js"),
        },
    });
    win.loadURL(!onProduction
        ? "http://localhost:3000"
        : "file://" + path_1.default.join(__dirname, "index.html"));
    win.once("ready-to-show", function () {
        win === null || win === void 0 ? void 0 : win.show();
    });
    win.on("closed", function () {
        win = null;
    });
}
if (!onlySingleIntance) {
    electron_1.app.quit();
}
else {
    electron_1.app.on("second-instance", function () {
        if (win) {
            if (win.isMinimized()) {
                win.restore();
            }
            else if (!win.isVisible()) {
                win.show();
            }
            else {
                win.focus();
            }
        }
    });
    electron_1.app.on("ready", function () {
        createMainWindow();
        var tray = functions_1.createSystemTray({
            icon: trayIconDark,
            template: [
                {
                    label: "Show",
                    click: function () {
                        if (!(win === null || win === void 0 ? void 0 : win.isVisible())) {
                            win === null || win === void 0 ? void 0 : win.show();
                        }
                    },
                },
                {
                    label: "",
                    click: function () {
                        if (win === null || win === void 0 ? void 0 : win.isFullScreen())
                            return;
                        if (win === null || win === void 0 ? void 0 : win.isVisible()) {
                            win === null || win === void 0 ? void 0 : win.hide();
                        }
                    },
                },
                {
                    label: "Quit",
                    role: "quit",
                },
            ],
        });
        tray.on("click", function () {
            if (!(win === null || win === void 0 ? void 0 : win.isVisible())) {
                win === null || win === void 0 ? void 0 : win.show();
            }
            else {
                if (!(win === null || win === void 0 ? void 0 : win.isFullScreen())) {
                    win === null || win === void 0 ? void 0 : win.hide();
                }
            }
        });
        if (win && onProduction) {
            var blockKeys = [
                "CommandOrControl+R",
                "CommandOrControl+Shift+R",
                "CommandOrControl+Alt+Q",
                "F11",
            ];
            functions_1.blockShortcutKeys(win, blockKeys);
        }
        functions_1.activateGlobalShortcuts([
            {
                key: "Alt+Shift+H",
                callback: function () {
                    win === null || win === void 0 ? void 0 : win.hide();
                },
            },
            {
                key: "Alt+Shift+S",
                callback: function () {
                    win === null || win === void 0 ? void 0 : win.show();
                },
            },
        ]);
        var autoUpdater = functions_1.activateAutoUpdate({});
        electron_1.ipcMain.on(helpers_1.CHANNELS.TO_MAIN, function (event, data) {
            if (win) {
                switch (data.type) {
                    case helpers_1.ACTIONS.SET_THEME:
                        var darkTheme = data.payload.darkTheme;
                        var backgroundColor = darkTheme ? "#141e25" : "#fff";
                        var iconOnTray = darkTheme ? trayIconDark : trayIcon;
                        win.setBackgroundColor(backgroundColor);
                        tray.setImage(iconOnTray);
                        break;
                    case helpers_1.ACTIONS.MINIMIZE:
                        win.minimize();
                        break;
                    case helpers_1.ACTIONS.HIDE:
                        win.hide();
                        break;
                    case helpers_1.ACTIONS.FULL_SCREEN:
                        var _a = data.payload, isFullScreen = _a.isFullScreen, alwaysOnTop = _a.alwaysOnTop;
                        if (isFullScreen) {
                            if (!win.isVisible()) {
                                win.show();
                                win.focus();
                                win.setAlwaysOnTop(true, "screen-saver");
                            }
                            win.setSkipTaskbar(true);
                            win.setFullScreen(true);
                            win.setVisibleOnAllWorkspaces(true);
                            electron_1.globalShortcut.unregister("Alt+Shift+H");
                        }
                        else {
                            win.setAlwaysOnTop(alwaysOnTop, "screen-saver");
                            win.setSkipTaskbar(false);
                            win.setFullScreen(false);
                            win.setVisibleOnAllWorkspaces(false);
                            electron_1.globalShortcut.register("Alt+Shift+H", function () {
                                win === null || win === void 0 ? void 0 : win.hide();
                            });
                        }
                        break;
                    case helpers_1.ACTIONS.ALWAYS_ON_TOP:
                        win.setAlwaysOnTop(data.payload);
                        break;
                    case helpers_1.ACTIONS.QUIT_INSTALL_UPDATES:
                        autoUpdater.quitAndInstall();
                        break;
                    default:
                        return data.payload;
                }
            }
        });
    });
}
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    if (win === null) {
        createMainWindow();
    }
});
electron_1.app.on("will-quit", function () {
    electron_1.globalShortcut.unregisterAll();
});
electron_1.app.setLoginItemSettings({ openAtLogin: true });
electron_1.app.setAppUserModelId("electron.app.PRODUCTIVITY_TIMER");
electron_1.app.allowRendererProcessReuse = true;
