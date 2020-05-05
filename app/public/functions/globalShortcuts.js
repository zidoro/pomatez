"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
function activateGlobalShortcuts(shortcuts) {
    shortcuts.map(function (_a) {
        var key = _a.key, callback = _a.callback;
        electron_1.globalShortcut.register(key, callback);
    });
}
exports.activateGlobalShortcuts = activateGlobalShortcuts;
