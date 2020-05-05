"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    electron_updater_1.autoUpdater.logger = electron_log_1.default;
    electron_updater_1.autoUpdater.logger.debug;
    return electron_updater_1.autoUpdater;
}
exports.activateAutoUpdate = activateAutoUpdate;
