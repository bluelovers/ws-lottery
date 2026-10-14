"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistoryPath = getHistoryPath;
const tslib_1 = require("tslib");
const path_1 = require("path");
const __root_1 = tslib_1.__importDefault(require("../../__root"));
function getHistoryPath(filename, options) {
    let { root = 'tw-history-data', subPath = 'lib/data' } = options !== null && options !== void 0 ? options : {};
    return (0, path_1.join)(__root_1.default, '..', root, subPath, filename.toLowerCase());
}
//# sourceMappingURL=getHistoryPath.js.map