import { contextBridge, ipcRenderer, shell } from "electron";
import { TO_MAIN, FROM_MAIN } from "@pomatez/shareables";

// https://github.com/electron/electron/issues/9920#issuecomment-575839738

contextBridge.exposeInMainWorld("electron", {
	send: (channel: string, ...args: any[]) => {
		if (TO_MAIN.includes(channel)) {
			ipcRenderer.send(channel, ...args);
		}
	},
	recieve: (channel: string, response: (...args: any[]) => void) => {
		if (FROM_MAIN.includes(channel)) {
			ipcRenderer.on(channel, (event: Electron.IpcRendererEvent, ...args) => {
				return response(...args);
			});
		}
	},
	openExternal: (url: string, options?: Electron.OpenExternalOptions) => {
		shell.openExternal(url);
	},
});
