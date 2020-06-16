"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateAutoUpdate = void 0;
var electron_updater_1 = require("electron-updater");
var electron_log_1 = __importDefault(require("electron-log"));
function activateAutoUpdate(_a) {
    var onUpdateAvailable = _a.onUpdateAvailable, onUpdateNotAvailable = _a.onUpdateNotAvailable, onDownloadProgress = _a.onDownloadProgress, onUpdateDownloaded = _a.onUpdateDownloaded;
    if (onUpdateAvailable) {
        electron_updater_1.autoUpdater.on("update-available", onUpdateAvailable);
    }
    if (onUpdateNotAvailable) {
        electron_updater_1.autoUpdater.on("update-not-available", onUpdateNotAvailable);
    }
    if (onDownloadProgress) {
        electron_updater_1.autoUpdater.on("download-progress", onDownloadProgress);
    }
    if (onUpdateDownloaded) {
        electron_updater_1.autoUpdater.on("update-downloaded", onUpdateDownloaded);
    }
    var logger = electron_log_1.default;
    logger.transports.file.level = "debug";
    electron_updater_1.autoUpdater.logger = logger;
    electron_updater_1.autoUpdater.checkForUpdatesAndNotify();
    return electron_updater_1.autoUpdater;
}
exports.activateAutoUpdate = activateAutoUpdate;
