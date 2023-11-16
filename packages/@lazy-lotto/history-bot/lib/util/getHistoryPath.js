"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistoryPath = void 0;
const path_1 = require("path");
const __root_1 = __importDefault(require("../../__root"));
function getHistoryPath(filename, options) {
    let { root = 'tw-history-data', subPath = 'lib/data' } = options !== null && options !== void 0 ? options : {};
    return (0, path_1.join)(__root_1.default, '..', root, subPath, filename.toLowerCase());
}
exports.getHistoryPath = getHistoryPath;
//# sourceMappingURL=getHistoryPath.js.map