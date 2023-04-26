import { join } from "path";
import { is } from "@electron-toolkit/utils";
import { shell, BrowserWindow } from "electron";
import icon from "../../../resources/icon.png?asset";
import { watchWindowEvents } from "../handlers";

export function createMainWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 340,
    height: 480,
    show: false,
    frame: false,
    resizable: false,
    autoHideMenuBar: true,
    simpleFullscreen: true,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }

  // This will watch all events of
  // the main window from the renderer process.
  watchWindowEvents(mainWindow);
}
