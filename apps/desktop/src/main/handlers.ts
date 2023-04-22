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

export function watchWindowEvents(win: BrowserWindow) {
  listenOn("minimize-window", () => win.minimize());

  listenOn("close-window", () => app.quit());

  listenOn(
    "set-always-on-top",
    (_, { alwaysOnTop, fullscreenBreak }) => {
      console.log("fullscreen", fullscreenBreak);
      win.setAlwaysOnTop(alwaysOnTop, "screen-saver");
    }
  );

  listenOn(
    "set-fullscreen-break",
    (_, { fullscreenBreak, alwaysOnTop }) => {
      win.setVisibleOnAllWorkspaces(fullscreenBreak);
      win.setSimpleFullScreen(fullscreenBreak);
      win.setFullScreen(fullscreenBreak);
      if (fullscreenBreak) {
        win.setAlwaysOnTop(fullscreenBreak, "screen-saver");
      } else {
        win.setAlwaysOnTop(alwaysOnTop, "screen-saver");
      }

      // const displays = screen.getAllDisplays();
      // const externalDisplay = displays.find((display) => {
      //   return display.bounds.x !== 0 || display.bounds.y !== 0;
      // });

      // let otherWindow: BrowserWindow | undefined;

      // if (fullscreenBreak) {
      //   if (externalDisplay) {
      //     otherWindow = new BrowserWindow({
      //       x: externalDisplay.bounds.x + 50,
      //       y: externalDisplay.bounds.y + 50,
      //       simpleFullscreen: true,
      //       fullscreen: true,
      //     });
      //   }
      // } else {
      //   otherWindow?.setFullScreen(false);
      //   otherWindow?.setSimpleFullScreen(false);
      // }
    }
  );
}
