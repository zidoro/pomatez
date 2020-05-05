import Electron from "electron";

type DataIPC = {
  type: string;
  payload?: boolean | string | number | object;
};

declare global {
  interface Window {
    electron: {
      send: (channel: string, data: DataIPC) => void;
      recieve: (channel: string, response: Function) => void;
      openExternal: (
        url: string,
        options?: Electron.OpenExternalOptions
      ) => Promise<void>;
    };
  }
}

export {};
