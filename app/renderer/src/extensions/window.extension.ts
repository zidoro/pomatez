import Electron from "electron";

declare global {
  interface Window {
    electron: {
      saveHistoryJsonl?: (
        filename: string,
        contents: string
      ) => Promise<{
        status: "saved" | "cancelled" | "exists";
        path?: string;
      }>;
      onHistoryPower?: (
        callback: (suspended: boolean) => void
      ) => () => void;
      send: (channel: string, ...args: any[]) => void;
      recieve: (channel: string, response: Function) => void;
      openExternal: (
        url: string,
        options?: Electron.OpenExternalOptions
      ) => Promise<void>;
    };
    __TAURI__: {};
  }
}

export {};
