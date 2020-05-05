"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var _1 = require(".");
function writeHostsFile(content) {
    return new Promise(function (resolve, reject) {
        fs_1.default.writeFile(_1.HOSTS_FILE_PATH, content, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
exports.writeHostsFile = writeHostsFile;
