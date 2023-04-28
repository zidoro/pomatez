import { join } from "path";
import { is } from "@electron-toolkit/utils";
import {
  shell,
  BrowserWindow,
  BrowserWindowConstructorOptions,
} from "electron";
import icon from "../../../resources/icon.png?asset";
import { MAIN_WINDOW } from "../constants";

export function createAppWindow(
  args?: {
    bounds: {
      x: number;
      y: number;
    };
    showWhenReady?: boolean;
    isMainWindow?: boolean;
  } & BrowserWindowConstructorOptions
) {
  const {
    bounds,
    showWhenReady = true,
    isMainWindow = true,
    ...otherArgs
  } = args || {};

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: MAIN_WINDOW.WIDTH,
    height: MAIN_WINDOW.HEIGHT,
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
    x: bounds?.x,
    y: bounds?.y,
    ...otherArgs,
  });

  mainWindow.on("ready-to-show", () => {
    if (showWhenReady) mainWindow.show();
  });

  if (isMainWindow) {
    mainWindow.webContents.openDevTools({
      mode: "detach",
    });
  }

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

  return mainWindow;
}
