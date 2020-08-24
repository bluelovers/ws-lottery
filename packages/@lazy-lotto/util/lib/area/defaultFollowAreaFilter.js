"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFollowAreaFilter = void 0;
function defaultFollowAreaFilter(current, options, map) {
    let count = 0;
    let skip = false;
    let c1 = 0;
    let c2 = 0;
    Object.values(map)
        .reduce((a, b) => {
        if (b > 2) {
            c1++;
        }
        if (b >= 2) {
            c2++;
        }
        if (b > 4) {
            skip = true;
        }
        if ((a + b) > 5) {
            skip = true;
        }
        return b;
    }, 0);
    count = c1;
    if (skip || c1 > 1 || c2 < 1) {
        skip = true;
    }
    return {
        count,
        skip,
        map,
    };
}
exports.defaultFollowAreaFilter = defaultFollowAreaFilter;
//# sourceMappingURL=defaultFollowAreaFilter.js.map