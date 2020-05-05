import { contextBridge, ipcRenderer, shell } from "electron";
import { CHANNELS } from "./helpers";

// https://github.com/electron/electron/issues/9920#issuecomment-575839738

contextBridge.exposeInMainWorld("electron", {
  send: (channel: string, ...args: any[]) => {
    let validChannels: string[] = [CHANNELS.TO_MAIN];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, ...args);
    }
  },
  recieve: (channel: string, response: (...args: any[]) => void) => {
    let validChannels: string[] = [CHANNELS.FROM_MAIN];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event: Electron.IpcRendererEvent, ...args) => {
        return response(...args);
      });
    }
  },
  openExternal: (url: string, options?: Electron.OpenExternalOptions) => {
    shell.openExternal(url);
  },
});
