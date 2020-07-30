"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSimpleMatchInArray = exports.defaultSimpleMatchInFilter = void 0;
function defaultSimpleMatchInFilter(m, index, options, current, historyRow) {
    return m.length >= 4;
}
exports.defaultSimpleMatchInFilter = defaultSimpleMatchInFilter;
function defaultSimpleMatchInArray(a1, a2) {
    return a2.filter(v => a1.includes(v));
}
exports.defaultSimpleMatchInArray = defaultSimpleMatchInArray;
//# sourceMappingURL=simpleMatchIn.js.map