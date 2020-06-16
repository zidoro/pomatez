"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_store_1 = __importDefault(require("electron-store"));
var store = new electron_store_1.default();
exports.default = store;
