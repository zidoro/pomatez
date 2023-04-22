import { ElectronAPI } from "@electron-toolkit/preload";
import { api } from "./api";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: typeof api;
  }
}
