"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var _1 = require(".");
function readHostsFile() {
    return new Promise(function (resolve, reject) {
        fs_1.default.readFile(_1.HOSTS_FILE_PATH, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data.toString());
            }
        });
    });
}
exports.readHostsFile = readHostsFile;
