import { ElectronAPI } from "@electron-toolkit/preload";
import { EventChannels } from ".";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      send: (channel: EventChannels, ...args: any[]) => void;
    };
  }
}
