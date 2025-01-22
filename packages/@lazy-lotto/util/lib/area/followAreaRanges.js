"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followAreaRanges = followAreaRanges;
const defaultFollowAreaRanges_1 = require("./defaultFollowAreaRanges");
function followAreaRanges(current, options) {
    let map = {};
    current.forEach(value => {
        var _a;
        ((_a = options === null || options === void 0 ? void 0 : options.areaRanges) !== null && _a !== void 0 ? _a : defaultFollowAreaRanges_1.defaultFollowAreaRanges).some(([min, max], index) => {
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
//# sourceMappingURL=followAreaRanges.js.map