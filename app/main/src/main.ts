import {
	BrowserWindow,
	app,
	ipcMain,
	globalShortcut,
	Menu,
	Tray,
	shell,
	nativeImage,
} from "electron";
import debounce from "lodash.debounce";
import notifier from "node-notifier";
import path from "path";
import {
	SET_ALWAYS_ON_TOP,
	SET_FULLSCREEN_BREAK,
	SET_MINIMIZE,
	SET_CLOSE,
	SET_UI_THEME,
	SET_NATIVE_TITLEBAR,
	SET_SHOW,
	RELEASED_NOTES_LINK,
	TRAY_ICON_UPDATE,
} from "@pomatez/shareables";
import {
	activateGlobalShortcuts,
	activateAutoUpdate,
	blockShortcutKeys,
	getIcon,
	isWindow,
	getFromStorage,
	createContextMenu,
} from "./helpers";
import { activateUser } from "./helpers/analytics";
import store from "./store";

import "v8-compile-cache";
import { FullscreenState, setFullscreenBreakHandler } from "./lifecycleEventHandlers/fullScreenBreak";

const onProduction = app.isPackaged;

const notificationIcon = path.join(__dirname, "./assets/notification-dark.png");

const trayIcon = path.join(__dirname, "./assets/tray-dark.png");

const onlySingleIntance = app.requestSingleInstanceLock();

Menu.setApplicationMenu(null);

const getFrameHeight = () => {
	if (isWindow()) {
		return 502;
	} else {
		if (store.get("useNativeTitlebar")) {
			return 480;
		}
		return 502;
	}
};

let tray: Tray | null = null;

let win: BrowserWindow | null;

const fullscreenState: FullscreenState = { isFullscreen: false };

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

	win.on(
		"minimize",
		debounce(
			async () => {
				try {
					if (win) {
						const data = await getFromStorage(win, "state");
						if (data.settings.minimizeToTray) {
							if (!fullscreenState.isFullscreen) {
								win?.hide();
								if (tray === null && data.settings.minimizeToTray) {
									createSystemTray();
								}
							}
						}
					}
				} catch (error) {
					console.log(error);
				}
			},
			1000,
			{ leading: true }
		)
	);

	win.on(
		"close",
		debounce(
			async (e) => {
				e.preventDefault();
				try {
					if (win) {
						const data = await getFromStorage(win, "state");
						if (!data.settings.closeToTray) {
							app.exit();
						} else {
							if (!fullscreenState.isFullscreen) {
								win?.hide();
								if (tray === null && data.settings.closeToTray) {
									createSystemTray();
								}
							}
						}
					}
				} catch (error) {
					console.log(error);
				}
			},
			1000,
			{ leading: true }
		)
	);

	win.on("closed", () => {
		win = null;
	});

	createContextMenu(win);
}

const trayTooltip = "Just click to restore.";

const contextMenu = Menu.buildFromTemplate([
	{
		label: "Restore the app",
		click: () => {
			win?.show();
		},
	},
	{
		label: "Exit",
		click: () => {
			app.exit();
		},
	},
]);

function createSystemTray() {
	tray = new Tray(trayIcon);

	tray.setToolTip(trayTooltip);
	tray.setContextMenu(contextMenu);

	tray?.on("click", () => {
		if (!win?.isVisible()) {
			win?.show();
		} else {
			if (!win?.isFullScreen()) {
				win?.hide();
			}
		}
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

	app.whenReady().then(() => {
		createMainWindow();

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
				notifier.notify(
					{
						icon: notificationIcon,
						title: "NEW UPDATE IS AVAILABLE",
						message: `App version ${info.version} ready to be downloaded.`,
						actions: ["View Released Notes"],
						sound: true,
						wait: true,
					},
					(err, response) => {
						if (!err) {
							shell.openExternal(RELEASED_NOTES_LINK);
						}
					}
				);
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
	});
	activateUser();
}

ipcMain.on(SET_ALWAYS_ON_TOP, (e, { alwaysOnTop }) => {
	win?.setAlwaysOnTop(alwaysOnTop);
});

ipcMain.on(SET_FULLSCREEN_BREAK, (e, args) => {
	setFullscreenBreakHandler(args, { tray, trayTooltip, fullscreenState, win, contextMenu});
});

ipcMain.on(SET_UI_THEME, (e, { isDarkMode }) => {
	store.set("isDarkMode", isDarkMode);
});

ipcMain.on(SET_SHOW, () => {
	if (!win?.isVisible()) {
		win?.show();
	} else {
		win?.focus();
	}
});

ipcMain.on(SET_MINIMIZE, (e, { minimizeToTray }) => {
	win?.minimize();
	if (tray === null && minimizeToTray) {
		createSystemTray();
	}
});

ipcMain.on(SET_CLOSE, (e, { closeToTray }) => {
	app.quit();
	if (tray === null && closeToTray) {
		createSystemTray();
	}
});

ipcMain.on(SET_NATIVE_TITLEBAR, (e, { useNativeTitlebar }) => {
	if (store.get("useNativeTitlebar") !== useNativeTitlebar) {
		store.set("useNativeTitlebar", useNativeTitlebar);
		setTimeout(() => {
			app.relaunch();
			app.exit();
		}, 1000);
	}
});

ipcMain.on(TRAY_ICON_UPDATE, (e, dataUrl) => {
	const image = nativeImage.createFromDataURL(dataUrl);
	tray?.setImage(image);
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createMainWindow();
	}
});

app.on("will-quit", () => {
	globalShortcut.unregisterAll();
});

app.setLoginItemSettings({ openAtLogin: true });
app.setAppUserModelId("com.roldanjr.pomatez");
