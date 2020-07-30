"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHistoryDataExtra = void 0;
const getHistoryPath_1 = require("./getHistoryPath");
const fs_extra_1 = require("fs-extra");
const index_1 = require("@lazy-lotto/util/index");
async function buildHistoryDataExtra(modName) {
    let targetFile = getHistoryPath_1.getHistoryPath(`${modName}.raw.json`);
    let outputFile = getHistoryPath_1.getHistoryPath(`${modName}.json`);
    let historyData = await fs_extra_1.readJSON(targetFile);
    let historyArray = index_1.simpleAnalyzeHistory(historyData);
    let historyDataExtra = historyArray.reduce((a, b) => {
        a[Number(b.id)] = b;
        return a;
    }, {});
    return fs_extra_1.outputJSON(outputFile, historyDataExtra, {
        spaces: 2
    });
}
exports.buildHistoryDataExtra = buildHistoryDataExtra;
//# sourceMappingURL=build-history-data-extra.js.map