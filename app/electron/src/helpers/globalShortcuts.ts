import { globalShortcut, BrowserWindow } from "electron";

const EXIT_SHORTCUTS = { QUIT: "CommandOrControl+W" };

type ShortCut = {
  key: string;
  callback: () => void;
};

export function activateGlobalShortcuts(shortcuts: ShortCut[]) {
  shortcuts.map(({ key, callback }) => {
    globalShortcut.register(key, callback);
  });
}

/**
 * Block Esc and Cmd+W within the break fullscreen window using
 * webContents.before-input-event instead of globalShortcut.
 *
 * globalShortcut.registerAll(['Esc', ...]) intercepts Esc system-wide,
 * starving every other application of the key while a break is active.
 * before-input-event fires only when the Pomatez window has focus,
 * which is sufficient: the window is fullscreen + alwaysOnTop during
 * breaks so it will always be focused when the user presses Esc.
 */
export function activateFullScreenShortcuts(
  win: BrowserWindow,
  exitFullScreenCallback: () => void
) {
  // Block Esc at the window level — does not leak to other apps.
  win.webContents.on("before-input-event", handleBreakInput);

  // CommandOrControl+W still needs a global shortcut because it is a
  // OS-level window-close binding that bypasses webContents input on macOS.
  globalShortcut.register(EXIT_SHORTCUTS.QUIT, exitFullScreenCallback);
}

export function deactivateFullScreenShortcuts(win: BrowserWindow) {
  win.webContents.removeListener("before-input-event", handleBreakInput);
  globalShortcut.unregister(EXIT_SHORTCUTS.QUIT);
}

/** Swallows Escape key events — prevents users skipping a mandatory break. */
function handleBreakInput(
  event: { preventDefault(): void },
  input: { type: string; key: string }
): void {
  if (input.type === "keyDown" && input.key === "Escape") {
    event.preventDefault();
  }
}
