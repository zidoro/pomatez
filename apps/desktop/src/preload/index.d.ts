import { ElectronAPI } from "@electron-toolkit/preload";
import { api } from ".";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      send: typeof api.send;
    };
  }
}
