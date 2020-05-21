"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLOCKER = exports.UPDATES = exports.ACTIONS = exports.CHANNELS = void 0;
var CHANNELS;
(function (CHANNELS) {
    CHANNELS["TO_MAIN"] = "TO_MAIN";
    CHANNELS["FROM_MAIN"] = "FROM_MAIN";
})(CHANNELS = exports.CHANNELS || (exports.CHANNELS = {}));
var ACTIONS;
(function (ACTIONS) {
    ACTIONS["ALWAYS_ON_TOP"] = "ALWAYS_ON_TOP";
    ACTIONS["FULL_SCREEN"] = "FULL_SCREEN";
    ACTIONS["MINIMIZE"] = "MINIMIZE";
    ACTIONS["HIDE"] = "HIDE";
    ACTIONS["SET_THEME"] = "SET_THEME";
    ACTIONS["QUIT_INSTALL_UPDATES"] = "QUIT_INSTALL_UPDATES";
})(ACTIONS = exports.ACTIONS || (exports.ACTIONS = {}));
var UPDATES;
(function (UPDATES) {
    UPDATES["AVAILABLE"] = "AVAILABLE";
    UPDATES["DOWNLOADING"] = "DOWNLOADING";
    UPDATES["DOWNLOADED"] = "DOWNLOADED";
})(UPDATES = exports.UPDATES || (exports.UPDATES = {}));
var BLOCKER;
(function (BLOCKER) {
    BLOCKER["DOMAINS_START"] = "###BLOCKED_DOMAINS_START";
    BLOCKER["DOMAINS_END"] = "###BLOCKED_DOMAINS_END";
})(BLOCKER = exports.BLOCKER || (exports.BLOCKER = {}));
