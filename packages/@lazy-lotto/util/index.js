"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleAnalyzeHistory = exports.simpleMatchIn = exports.followArea = void 0;
const simpleMatchIn_1 = require("./lib/match/simpleMatchIn");
const simpleAnalyzeHistory_1 = require("./lib/analyze/simpleAnalyzeHistory");
const followAreaRanges_1 = require("./lib/area/followAreaRanges");
const defaultFollowAreaFilter_1 = require("./lib/area/defaultFollowAreaFilter");
function followArea(current, options) {
    var _a;
    let map = (0, followAreaRanges_1.followAreaRanges)(current, options);
    return ((_a = options === null || options === void 0 ? void 0 : options.followAreaFilter) !== null && _a !== void 0 ? _a : defaultFollowAreaFilter_1.defaultFollowAreaFilter)(current, options, map);
}
exports.followArea = followArea;
function simpleMatchIn(current, historyArray, index, options) {
    let bool;
    let match = 0;
    let { simpleMatchInFilter = simpleMatchIn_1.defaultSimpleMatchInFilter, simpleMatchInArray = simpleMatchIn_1.defaultSimpleMatchInArray } = options !== null && options !== void 0 ? options : {};
    let ls = historyArray.reduce((a, historyRow, idx) => {
        var _a;
        var _b;
        let m = simpleMatchInArray(current, historyRow.result[0]);
        if (simpleMatchInFilter(m, index, options, current, historyRow)) {
            (_a = a[_b = m.length]) !== null && _a !== void 0 ? _a : (a[_b] = []);
            a[m.length].push(historyRow.result[0]);
            match = Math.max(m.length, match);
            bool = true;
        }
        return a;
    }, {});
    if (bool === true) {
        return {
            current,
            match,
            //ls,
            follow: followArea(current, options),
        };
    }
}
exports.simpleMatchIn = simpleMatchIn;
function simpleAnalyzeHistory(historyData, options) {
    let historyArray = Object.values(historyData);
    historyArray = historyArray.reverse();
    return historyArray
        .reduce((a, b) => {
        a.push((0, simpleAnalyzeHistory_1.simpleAnalyzeHistoryRow)(b, historyArray, options));
        return a;
    }, []);
}
exports.simpleAnalyzeHistory = simpleAnalyzeHistory;
//# sourceMappingURL=index.js.map