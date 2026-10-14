"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bluebird_1 = tslib_1.__importDefault(require("bluebird"));
const path_1 = require("path");
const playwright_class_1 = tslib_1.__importDefault(require("playwright-class"));
const build_history_data_extra_1 = require("./lib/util/build-history-data-extra");
const path_2 = require("path");
exports.default = bluebird_1.default.resolve(new playwright_class_1.default())
    .tap(pb => {
    return bluebird_1.default.each([
        './lib/mod/dailycash',
        './lib/mod/lotto649',
        './lib/mod/superlotto638'
    ], async (target) => {
        console.time(target);
        await Promise.resolve(`${(0, path_1.join)(__dirname, target)}`).then(s => tslib_1.__importStar(require(s))).then(m => m.default(pb))
            .catch(e => console.error(e));
        await (0, build_history_data_extra_1.buildHistoryDataExtra)((0, path_2.parse)(target).name);
        console.timeEnd(target);
    });
})
    .tap(pb => pb.close())
    .tap(e => process.exit());
//# sourceMappingURL=index.js.map