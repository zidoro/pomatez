"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIcon = void 0;
var path_1 = __importDefault(require("path"));
function getIcon(isDarkMode) {
    switch (process.platform) {
        case "darwin":
            return isDarkMode
                ? path_1.default.join(__dirname, "../../src/assets/logos/logo-dark@2x.png")
                : path_1.default.join(__dirname, "../../src/assets/logos/logo-light@2x.png");
        case "linux":
            return isDarkMode
                ? path_1.default.join(__dirname, "../../src/assets/logos/logo-dark.png")
                : path_1.default.join(__dirname, "../../src/assets/logos/logo-light.png");
        default:
            return isDarkMode
                ? path_1.default.join(__dirname, "../../src/assets/logos/logo-dark.ico")
                : path_1.default.join(__dirname, "../../src/assets/logos/logo-light.ico");
    }
}
exports.getIcon = getIcon;
