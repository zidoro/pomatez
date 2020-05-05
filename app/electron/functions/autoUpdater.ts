import { autoUpdater, UpdateInfo, AppUpdater } from "electron-updater";
import ElectronLogger from "electron-log";

type AutoUpdateProps = {
  onErrorUpdating?: (error: any) => void;
  onUpdateAvailable?: (info: UpdateInfo) => void;
  onUpdateNotAvailable?: (info: UpdateInfo) => void;
  onDownloadProgress?: (...args: any) => void;
  onUpdateDownloaded?: (info: UpdateInfo) => void;
};

export function activateAutoUpdate({
  onUpdateAvailable,
  onUpdateNotAvailable,
  onDownloadProgress,
  onUpdateDownloaded,
}: AutoUpdateProps): AppUpdater {
  if (onUpdateAvailable) {
    autoUpdater.on("update-available", onUpdateAvailable);
  }
  if (onUpdateNotAvailable) {
    autoUpdater.on("update-not-available", onUpdateNotAvailable);
  }
  if (onDownloadProgress) {
    autoUpdater.on("download-progress", onDownloadProgress);
  }
  if (onUpdateDownloaded) {
    autoUpdater.on("update-downloaded", onUpdateDownloaded);
  }

  const logger = ElectronLogger;
  logger.transports.file.level = "debug";
  autoUpdater.logger = logger;
  autoUpdater.checkForUpdatesAndNotify();

  return autoUpdater;
}
