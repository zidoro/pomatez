import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import { EventChannels } from "../preload";

const listenOn = (
  event: EventChannels,
  listener: (event: IpcMainEvent, ...args: any[]) => void
) => ipcMain.on(event, listener);

export function watchAppEvents(mainWindow: BrowserWindow) {
  listenOn("minimize-window", () => {
    mainWindow.minimize();
  });

  listenOn("close-window", () => {
    app.quit();
  });
}
