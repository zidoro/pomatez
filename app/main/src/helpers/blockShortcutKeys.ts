import { BrowserWindow, globalShortcut } from "electron";

export function blockShortcutKeys(
  window: BrowserWindow,
  shortcutKeys: string[]
) {
  window.on("focus", () =>
    shortcutKeys.map((key) => {
      globalShortcut.register(key, () => {});
    })
  );

  window.on("blur", () =>
    shortcutKeys.map((key) => {
      globalShortcut.unregister(key);
    })
  );

  window.on("show", () =>
    shortcutKeys.map((key) => {
      globalShortcut.register(key, () => {});
    })
  );

  window.on("hide", () =>
    shortcutKeys.map((key) => {
      globalShortcut.unregister(key);
    })
  );
}
