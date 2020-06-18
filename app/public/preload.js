"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var helpers_1 = require("./helpers");
// https://github.com/electron/electron/issues/9920#issuecomment-575839738
electron_1.contextBridge.exposeInMainWorld("electron", {
    send: function (channel) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (helpers_1.TO_MAIN.includes(channel)) {
            electron_1.ipcRenderer.send.apply(electron_1.ipcRenderer, __spreadArrays([channel], args));
        }
    },
    recieve: function (channel, response) {
        if (helpers_1.FROM_MAIN.includes(channel)) {
            electron_1.ipcRenderer.on(channel, function (event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return response.apply(void 0, args);
            });
        }
    },
    openExternal: function (url, options) {
        electron_1.shell.openExternal(url);
    },
});
