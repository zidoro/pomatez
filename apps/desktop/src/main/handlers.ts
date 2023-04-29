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

let windowAlwaysOnTop: boolean = false;

let otherWindows: BrowserWindow[] | null | undefined;

export function watchWindowEvents(mainWindow: BrowserWindow) {
  const allDisplays = screen.getAllDisplays();
  const mainDisplay = screen.getPrimaryDisplay();

  const otherDisplays = allDisplays.filter(
    (display) => display.id !== mainDisplay.id
  );

  if (otherDisplays.length && !otherWindows) {
    otherWindows = otherDisplays.map((display) =>
      createAppWindow({
        bounds: display.bounds,
        showWhenReady: false,
        isMainWindow: false,
      })
    );
  }

  listenOn("minimize-window", () => mainWindow.minimize());

  listenOn("close-window", () => app.exit());

  listenOn("set-always-on-top", (_, { alwaysOnTop = false }) => {
    mainWindow.setAlwaysOnTop(alwaysOnTop, "screen-saver");
    windowAlwaysOnTop = alwaysOnTop;
  });

  listenOn(
    "set-fullscreen-break",
    (_, { shouldFullScreenBreak = false }) => {
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

      if (otherDisplays.length && otherWindows?.length) {
        otherWindows.forEach((otherWindow, index) => {
          const blockerWindowPositionX =
            otherDisplays[index].bounds.x +
            otherDisplays[index].bounds.width / 2 -
            MAIN_WINDOW.WIDTH / 2;
          const blockerWindowPositionY =
            otherDisplays[index].bounds.y +
            otherDisplays[index].bounds.height / 2 -
            MAIN_WINDOW.HEIGHT / 2;

          otherWindow.setPosition(
            blockerWindowPositionX,
            blockerWindowPositionY
          );
          otherWindow.setSize(MAIN_WINDOW.WIDTH, MAIN_WINDOW.HEIGHT);
        });
      }

      if (!shouldFullScreenBreak) {
        mainWindow.setAlwaysOnTop(windowAlwaysOnTop, "screen-saver");

        otherWindows?.forEach((otherWindow) => {
          otherWindow?.hide();
        });
      }

      setTimeout(() => {
        mainWindow.setVisibleOnAllWorkspaces(shouldFullScreenBreak);
        mainWindow.setSimpleFullScreen(shouldFullScreenBreak);
        mainWindow.setFullScreen(shouldFullScreenBreak);
        mainWindow.show();

        otherWindows?.forEach((otherWindow) => {
          otherWindow?.setVisibleOnAllWorkspaces(shouldFullScreenBreak);
          otherWindow?.setSimpleFullScreen(shouldFullScreenBreak);
          otherWindow?.setFullScreen(shouldFullScreenBreak);
        });

        if (shouldFullScreenBreak) {
          mainWindow.setAlwaysOnTop(
            shouldFullScreenBreak,
            "screen-saver"
          );
          otherWindows?.forEach((otherWindow) => {
            otherWindow.setAlwaysOnTop(
              shouldFullScreenBreak,
              "screen-saver"
            );
            otherWindow?.show();
          });
        }
      }, 100);
    }
  );
}
