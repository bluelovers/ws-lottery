"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortData = void 0;
const sort_object_keys2_1 = __importDefault(require("sort-object-keys2"));
const string_natural_compare_1 = __importDefault(require("@bluelovers/string-natural-compare"));
function sortData(data) {
    data = sort_object_keys2_1.default(data, {
        sort: string_natural_compare_1.default,
    });
    return data;
}
exports.sortData = sortData;
//# sourceMappingURL=sortData.js.map