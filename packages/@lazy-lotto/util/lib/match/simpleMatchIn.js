"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSimpleMatchInFilter = defaultSimpleMatchInFilter;
exports.defaultSimpleMatchInArray = defaultSimpleMatchInArray;
function defaultSimpleMatchInFilter(m, index, options, current, historyRow) {
    return m.length >= 4;
}
function defaultSimpleMatchInArray(a1, a2) {
    return a2.filter(v => a1.includes(v));
}
//# sourceMappingURL=simpleMatchIn.js.map