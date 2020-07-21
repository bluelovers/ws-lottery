"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
require("./lib/mod/dailycash");
require("./lib/mod/lotto649");
require("./lib/mod/superlotto638");
const bluebird_1 = __importDefault(require("bluebird"));
const path_1 = require("path");
const playwright_class_1 = __importDefault(require("playwright-class"));
exports.default = bluebird_1.default.resolve(new playwright_class_1.default())
    .then(pb => {
    return bluebird_1.default.each([
        './lib/mod/dailycash',
        './lib/mod/lotto649',
        './lib/mod/superlotto638'
    ], async (target) => {
        console.time(target);
        await Promise.resolve().then(() => __importStar(require(path_1.join(__dirname, target)))).then(m => m.default(pb))
            .catch(e => console.error(e));
        console.timeEnd(target);
    });
})
    .tap(e => process.exit());
//# sourceMappingURL=index.js.map