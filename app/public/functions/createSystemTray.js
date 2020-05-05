"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var tray;
function createSystemTray(_a) {
    var icon = _a.icon, tooltip = _a.tooltip, template = _a.template;
    tray = new electron_1.Tray(icon);
    var contextMenu = electron_1.Menu.buildFromTemplate(template);
    if (tooltip)
        tray.setToolTip(tooltip);
    tray.setContextMenu(contextMenu);
    return tray;
}
exports.createSystemTray = createSystemTray;
