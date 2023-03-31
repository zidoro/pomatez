import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

type BuildEventArgs<TEvent = string, TData = never> = Parameters<
  (event: TEvent, data?: TData) => void
>;

export type EventArgs =
  | BuildEventArgs<"minimize-window">
  | BuildEventArgs<"close-window">
  | BuildEventArgs<
      "set-always-on-top",
      {
        alwaysOnTop: boolean;
      }
    >;

// Custom APIs for renderer
export const api = {
  send: (...args: EventArgs) => {
    ipcRenderer.send(...(args as BuildEventArgs));
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
