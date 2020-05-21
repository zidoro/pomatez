"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBlockerIndexes = void 0;
var constants_1 = require("./constants");
function findBlockerIndexes(hosts) {
    var positions = { start: -1, end: -1 };
    for (var index = 0; index < hosts.length; index++) {
        if (hosts[index].indexOf(constants_1.BLOCKER.DOMAINS_START) > -1) {
            positions.start = index;
        }
        if (hosts[index].indexOf(constants_1.BLOCKER.DOMAINS_END) > -1) {
            positions.end = index;
        }
    }
    if (positions.start > positions.end) {
        return { start: -1, end: -1 };
    }
    return positions;
}
exports.findBlockerIndexes = findBlockerIndexes;
