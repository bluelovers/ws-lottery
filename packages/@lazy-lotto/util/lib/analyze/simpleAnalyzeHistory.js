"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleAnalyzeHistoryRow = simpleAnalyzeHistoryRow;
const simpleMatchIn_1 = require("../match/simpleMatchIn");
function simpleAnalyzeHistoryRow(current, historyArray, options) {
    let match = {};
    let ids = {};
    let dates = {};
    let { simpleMatchInArray = simpleMatchIn_1.defaultSimpleMatchInArray } = options !== null && options !== void 0 ? options : {};
    historyArray
        .forEach(v => {
        var _a, _b, _c;
        var _d, _e;
        if (v.id !== current.id) {
            let m = simpleMatchInArray(current.result[0], v.result[0]);
            if (m.length > 1) {
                match[m.length] = ((_a = match[m.length]) !== null && _a !== void 0 ? _a : 0) + 1;
                (_b = ids[_d = m.length]) !== null && _b !== void 0 ? _b : (ids[_d] = v.id);
                (_c = dates[_e = m.length]) !== null && _c !== void 0 ? _c : (dates[_e] = v.date);
            }
        }
    });
    let maxMatch = Object.keys(match).reduce((a, b) => Math.max(a, b), 0);
    return {
        ...current,
        match,
        ids,
        dates,
        maxMatch,
    };
}
//# sourceMappingURL=simpleAnalyzeHistory.js.map