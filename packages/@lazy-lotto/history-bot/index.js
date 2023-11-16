"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = __importDefault(require("bluebird"));
const path_1 = require("path");
const playwright_class_1 = __importDefault(require("playwright-class"));
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
        await Promise.resolve(`${(0, path_1.join)(__dirname, target)}`).then(s => __importStar(require(s))).then(m => m.default(pb))
            .catch(e => console.error(e));
        await (0, build_history_data_extra_1.buildHistoryDataExtra)((0, path_2.parse)(target).name);
        console.timeEnd(target);
    });
})
    .tap(pb => pb.close())
    .tap(e => process.exit());
//# sourceMappingURL=index.js.map