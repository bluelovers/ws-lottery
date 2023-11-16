"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortData = void 0;
const index_1 = __importDefault(require("sort-object-keys2/index"));
const index_2 = __importDefault(require("@bluelovers/string-natural-compare/index"));
function sortData(data) {
    data = (0, index_1.default)(data, {
        sort: index_2.default,
    });
    return data;
}
exports.sortData = sortData;
//# sourceMappingURL=sortData.js.map