"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIcon = void 0;
var path_1 = __importDefault(require("path"));
function getIcon() {
    switch (process.platform) {
        case "darwin":
            return path_1.default.join(__dirname, "../../src/assets/logos/logo-dark@2x.png");
        case "linux":
            return path_1.default.join(__dirname, "../../src/assets/logos/logo-dark.png");
        default:
            return path_1.default.join(__dirname, "../../src/assets/logos/logo-dark.ico");
    }
}
exports.getIcon = getIcon;
