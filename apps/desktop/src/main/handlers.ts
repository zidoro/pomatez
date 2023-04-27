import {
  app,
  BrowserWindow,
  ipcMain,
  IpcMainEvent,
  screen,
} from "electron";
import { SendArgs } from "../preload/api";
import { createBlockerWindow } from "./windows";
import { MAIN_WINDOW } from "./constants";

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
    (_, { shouldFullScreenBreak = false, alwaysOnTop = false }) => {
      const allDisplays = screen.getAllDisplays();
      const mainDisplay = screen.getPrimaryDisplay();
      const otherDisplay = allDisplays.find((display) => {
        return display.bounds.x !== 0 || display.bounds.y !== 0;
      });

      if (shouldFullScreenBreak) {
        mainWindow.hide();
      }

      const mainWindowPositionX =
        mainDisplay.bounds.x +
        mainDisplay.bounds.width / 2 -
        MAIN_WINDOW.WIDTH / 2;
      const mainWindowPositionY =
        mainDisplay.bounds.y +
        mainDisplay.bounds.height / 2 -
        MAIN_WINDOW.HEIGHT / 2;

      mainWindow.setPosition(mainWindowPositionX, mainWindowPositionY);
      mainWindow.setSize(MAIN_WINDOW.WIDTH, MAIN_WINDOW.HEIGHT);

      setTimeout(() => {
        mainWindow.setVisibleOnAllWorkspaces(shouldFullScreenBreak);
        mainWindow.setSimpleFullScreen(shouldFullScreenBreak);
        mainWindow.setFullScreen(shouldFullScreenBreak);
        mainWindow.show();

        if (shouldFullScreenBreak) {
          mainWindow.setAlwaysOnTop(
            shouldFullScreenBreak,
            "screen-saver"
          );

          if (otherDisplay && !blockerWindow) {
            blockerWindow = createBlockerWindow({
              bounds: otherDisplay.bounds,
            });
          } else {
            blockerWindow?.show();
          }
        } else {
          mainWindow.setAlwaysOnTop(alwaysOnTop, "screen-saver");
          blockerWindow?.hide();
        }
      }, 100);
    }
  );
}
