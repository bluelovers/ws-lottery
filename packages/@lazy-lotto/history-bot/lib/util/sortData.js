"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortData = sortData;
const tslib_1 = require("tslib");
const sort_object_keys2_1 = tslib_1.__importDefault(require("sort-object-keys2"));
const string_natural_compare_1 = tslib_1.__importDefault(require("@bluelovers/string-natural-compare"));
function sortData(data) {
    data = (0, sort_object_keys2_1.default)(data, {
        sort: string_natural_compare_1.default,
    });
    return data;
}
//# sourceMappingURL=sortData.js.map