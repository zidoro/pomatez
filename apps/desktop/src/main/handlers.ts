import {
  app,
  BrowserWindow,
  ipcMain,
  IpcMainEvent,
  screen,
} from "electron";
import { SendArgs } from "../preload/api";
import { createAppWindow } from "./windows";
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
  const allDisplays = screen.getAllDisplays();
  const mainDisplay = screen.getPrimaryDisplay();
  const otherDisplay = allDisplays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0;
  });

  if (otherDisplay && !blockerWindow) {
    blockerWindow = createAppWindow({
      bounds: otherDisplay.bounds,
      showWhenReady: false,
      isMainWindow: false,
    });
  }

  listenOn("minimize-window", () => mainWindow.minimize());

  listenOn("close-window", () => app.exit());

  listenOn("set-always-on-top", (_, { alwaysOnTop = false }) => {
    mainWindow.setAlwaysOnTop(alwaysOnTop, "screen-saver");
  });

  listenOn(
    "set-fullscreen-break",
    (_, { shouldFullScreenBreak = false, alwaysOnTop = false }) => {
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

      if (otherDisplay && blockerWindow) {
        const blockerWindowPositionX =
          otherDisplay.bounds.x +
          otherDisplay.bounds.width / 2 -
          MAIN_WINDOW.WIDTH / 2;
        const blockerWindowPositionY =
          otherDisplay.bounds.y +
          otherDisplay.bounds.height / 2 -
          MAIN_WINDOW.HEIGHT / 2;

        blockerWindow.setPosition(
          blockerWindowPositionX,
          blockerWindowPositionY
        );
        blockerWindow.setSize(MAIN_WINDOW.WIDTH, MAIN_WINDOW.HEIGHT);
      }

      if (!shouldFullScreenBreak) {
        mainWindow.setAlwaysOnTop(alwaysOnTop, "screen-saver");
        blockerWindow?.hide();
      }

      setTimeout(() => {
        mainWindow.setVisibleOnAllWorkspaces(shouldFullScreenBreak);
        mainWindow.setSimpleFullScreen(shouldFullScreenBreak);
        mainWindow.setFullScreen(shouldFullScreenBreak);
        mainWindow.show();

        blockerWindow?.setVisibleOnAllWorkspaces(shouldFullScreenBreak);
        blockerWindow?.setSimpleFullScreen(shouldFullScreenBreak);
        blockerWindow?.setFullScreen(shouldFullScreenBreak);

        if (shouldFullScreenBreak) {
          mainWindow.setAlwaysOnTop(
            shouldFullScreenBreak,
            "screen-saver"
          );
          blockerWindow?.show();
        }
      }, 100);
    }
  );
}
