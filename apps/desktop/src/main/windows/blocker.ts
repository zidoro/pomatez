import { BrowserWindow } from "electron";

export function createBlockerWindow(args: {
  bounds: {
    x: number;
    y: number;
  };
}) {
  const blockerWindow = new BrowserWindow({
    simpleFullscreen: true,
    alwaysOnTop: true,
    fullscreen: true,
    frame: false,
    x: args.bounds.x,
    y: args.bounds.y,
  });

  blockerWindow.setAlwaysOnTop(true, "screen-saver");
  blockerWindow.setVisibleOnAllWorkspaces(true);
  blockerWindow.setFullScreen(true);

  return blockerWindow;
}
