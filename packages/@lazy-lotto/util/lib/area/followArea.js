"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFollowAreaFilter = exports.followAreaRanges = exports.defaultFollowAreaRanges = void 0;
exports.defaultFollowAreaRanges = [
    [1, 1 + 6],
    [8, 8 + 6],
    [15, 15 + 6],
    [22, 22 + 6],
    [29, 26 + 6],
    [36, 36 + 6],
];
function followAreaRanges(current, options) {
    let map = {};
    current.forEach(value => {
        var _a;
        ((_a = options === null || options === void 0 ? void 0 : options.areaRanges) !== null && _a !== void 0 ? _a : exports.defaultFollowAreaRanges).some(([min, max], index) => {
            var _a;
            if (value >= min && value <= max) {
                (_a = map[index]) !== null && _a !== void 0 ? _a : (map[index] = 0);
                map[index]++;
                return true;
            }
        });
    });
    return map;
}
exports.followAreaRanges = followAreaRanges;
function defaultFollowAreaFilter(current, options, map) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    let count = 0;
    let skip = false;
    count = Object.values(map).filter(v => {
        if (v > 3) {
            skip = true;
        }
        return v > 2;
    }).length;
    if (count > 1 || Object.values(map)
        .filter(v => v >= 2).length < 1 || (((_a = map[3]) !== null && _a !== void 0 ? _a : 0) + ((_b = map[4]) !== null && _b !== void 0 ? _b : 0) + ((_c = map[5]) !== null && _c !== void 0 ? _c : 0)) > 4 || (((_d = map[2]) !== null && _d !== void 0 ? _d : 0) + ((_e = map[3]) !== null && _e !== void 0 ? _e : 0) + ((_f = map[4]) !== null && _f !== void 0 ? _f : 0)) > 4 || (((_g = map[0]) !== null && _g !== void 0 ? _g : 0) + ((_h = map[1]) !== null && _h !== void 0 ? _h : 0) + ((_j = map[2]) !== null && _j !== void 0 ? _j : 0)) > 4) {
        skip = true;
    }
    return {
        count,
        skip,
        map,
    };
}
exports.defaultFollowAreaFilter = defaultFollowAreaFilter;
//# sourceMappingURL=followArea.js.map