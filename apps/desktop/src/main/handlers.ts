import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import { EventArgs } from "../preload";

const listenOn = (
  event: EventArgs extends [infer T, ...any[]] ? T : never,
  listener: (event: IpcMainEvent, data: EventArgs[1]) => void
) => ipcMain.on(event, listener);

export function watchAppEvents(mainWindow: BrowserWindow) {
  listenOn("minimize-window", () => {
    mainWindow.minimize();
  });

  listenOn("close-window", () => {
    app.quit();
  });

  listenOn("set-always-on-top", (_, data) => {
    const { alwaysOnTop = false } = data || {};
    mainWindow.setAlwaysOnTop(alwaysOnTop);
  });
}
