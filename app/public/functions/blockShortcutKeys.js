"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
function blockShortcutKeys(window, shortcutKeys) {
    window.on("focus", function () {
        return shortcutKeys.map(function (key) {
            electron_1.globalShortcut.register(key, function () { });
        });
    });
    window.on("blur", function () {
        return shortcutKeys.map(function (key) {
            electron_1.globalShortcut.unregister(key);
        });
    });
    window.on("show", function () {
        return shortcutKeys.map(function (key) {
            electron_1.globalShortcut.register(key, function () { });
        });
    });
    window.on("hide", function () {
        return shortcutKeys.map(function (key) {
            electron_1.globalShortcut.unregister(key);
        });
    });
}
exports.blockShortcutKeys = blockShortcutKeys;
