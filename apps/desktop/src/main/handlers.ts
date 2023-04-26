import {
  app,
  BrowserWindow,
  ipcMain,
  IpcMainEvent,
  screen,
} from "electron";
import { SendArgs } from "../preload/api";
import { createBlockerWindow } from "./windows";

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

let blockerWindow: BrowserWindow | null | undefined;

export function watchWindowEvents(mainWindow: BrowserWindow) {
  listenOn("minimize-window", () => mainWindow.minimize());

  listenOn("close-window", () => app.exit());

  listenOn("set-always-on-top", (_, { alwaysOnTop = false }) => {
    mainWindow.setAlwaysOnTop(alwaysOnTop, "screen-saver");
  });

  listenOn(
    "set-fullscreen-break",
    (_, { fullscreenBreak = false, alwaysOnTop = false }) => {
      mainWindow.setVisibleOnAllWorkspaces(fullscreenBreak);
      mainWindow.setSimpleFullScreen(fullscreenBreak);
      mainWindow.setFullScreen(fullscreenBreak);

      if (fullscreenBreak) {
        mainWindow.setAlwaysOnTop(fullscreenBreak, "screen-saver");
      } else {
        mainWindow.setAlwaysOnTop(alwaysOnTop, "screen-saver");
      }

      const displays = screen.getAllDisplays();
      const otherDisplay = displays.find((display) => {
        return display.bounds.x !== 0 || display.bounds.y !== 0;
      });

      if (fullscreenBreak) {
        if (otherDisplay && !blockerWindow) {
          blockerWindow = createBlockerWindow({
            bounds: otherDisplay.bounds,
          });
        } else {
          blockerWindow?.show();
        }
      } else {
        blockerWindow?.hide();
      }
    }
  );
}
