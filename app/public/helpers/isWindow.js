"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWindow = function () { return process.platform === "win32"; };
exports.EndOfLine = exports.isWindow() ? "\r\n" : "\n";
exports.HOSTS_FILE_PATH = exports.isWindow()
    ? "C:/Windows/System32/drivers/etc/hosts"
    : "/etc/hosts";
