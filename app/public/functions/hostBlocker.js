"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("../helpers");
// TODO: run ` ipconfig /flushdns` for Windows if doesn't work
function blockWebsiteList(domains) {
    return __awaiter(this, void 0, void 0, function () {
        var hostsFile, hosts, webBlockerPositions, blockedDomains, finalHostsContent, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, helpers_1.readHostsFile()];
                case 1:
                    hostsFile = _a.sent();
                    hosts = hostsFile.split(helpers_1.EndOfLine);
                    webBlockerPositions = helpers_1.findBlockerIndexes(hosts);
                    blockedDomains = [];
                    if (webBlockerPositions.start >= 0 && webBlockerPositions.end > 0) {
                        blockedDomains = hosts.splice(webBlockerPositions.start, webBlockerPositions.end - webBlockerPositions.start + 1);
                        blockedDomains.shift();
                        blockedDomains.pop();
                    }
                    finalHostsContent = __spreadArrays(hosts, [
                        helpers_1.BLOCKER.DOMAINS_START
                    ], blockedDomains, domains.map(function (domain) { return "127.0.0.1 www." + domain; }), [
                        helpers_1.BLOCKER.DOMAINS_END,
                    ]).join(helpers_1.EndOfLine);
                    return [4 /*yield*/, helpers_1.writeHostsFile(finalHostsContent)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.blockWebsiteList = blockWebsiteList;
function unBlockWebsiteList() {
    return __awaiter(this, void 0, void 0, function () {
        var hostsFile, hosts, webBlockerPositions, finalHostsContent, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, helpers_1.readHostsFile()];
                case 1:
                    hostsFile = _a.sent();
                    hosts = hostsFile.split(helpers_1.EndOfLine);
                    webBlockerPositions = helpers_1.findBlockerIndexes(hosts);
                    if (webBlockerPositions.start < 0 || webBlockerPositions.end < 0) {
                        return [2 /*return*/, true];
                    }
                    hosts.splice(webBlockerPositions.start, webBlockerPositions.end - webBlockerPositions.start + 1);
                    finalHostsContent = hosts.join(helpers_1.EndOfLine);
                    return [4 /*yield*/, helpers_1.writeHostsFile(finalHostsContent)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.unBlockWebsiteList = unBlockWebsiteList;
