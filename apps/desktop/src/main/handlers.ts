import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import { SendArgs } from "../preload/api";

type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

const listenOn = (
  event: SendArgs extends [infer T, ...any[]] ? T : never,
  listener: (
    event: IpcMainEvent,
    payload: UnionToIntersection<SendArgs[1] & {}>
  ) => void
) => ipcMain.on(event, listener);

export function watchAppEvents(mainWindow: BrowserWindow) {
  listenOn("minimize-window", () => {
    mainWindow.minimize();
  });

  listenOn("close-window", () => {
    app.quit();
  });

  listenOn("set-always-on-top", (_, { alwaysOnTop = false }) => {
    mainWindow.setAlwaysOnTop(alwaysOnTop);
  });
}
