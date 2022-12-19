import { autoUpdater, UpdateInfo, AppUpdater } from "electron-updater";
import ElectronLogger from "electron-log";

type AutoUpdateProps = {
	onErrorUpdating?: (error: any) => void;
	onCheckingUpdates?: () => void;
	onUpdateAvailable?: (info: UpdateInfo) => void;
	onUpdateNotAvailable?: (info: UpdateInfo) => void;
	onDownloadProgress?: (...args: any) => void;
	onUpdateDownloaded?: (info: UpdateInfo) => void;
};

export function activateAutoUpdate({
	onCheckingUpdates,
	onUpdateAvailable,
	onUpdateNotAvailable,
	onDownloadProgress,
	onUpdateDownloaded,
}: AutoUpdateProps): AppUpdater {
	const logger = ElectronLogger;
	logger.transports.file.level = "debug";
	autoUpdater.logger = logger;

	autoUpdater.checkForUpdates();

	if (onCheckingUpdates)
		autoUpdater.on("checking-for-update", onCheckingUpdates);

	if (onUpdateAvailable) autoUpdater.on("update-available", onUpdateAvailable);

	if (onUpdateNotAvailable)
		autoUpdater.on("update-not-available", onUpdateNotAvailable);

	if (onDownloadProgress)
		autoUpdater.on("download-progress", onDownloadProgress);

	if (onUpdateDownloaded)
		autoUpdater.on("update-downloaded", onUpdateDownloaded);

	return autoUpdater;
}
