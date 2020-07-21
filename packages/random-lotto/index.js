"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomLotto = exports.randomLottoGenerator = void 0;
const random_extra_1 = __importDefault(require("random-extra"));
function* randomLottoGenerator(options) {
    var _a;
    const rnd = (_a = options.random) !== null && _a !== void 0 ? _a : random_extra_1.default;
    const fns = options.ranges.map(argv => {
        var _a, _b, _c;
        let options = argv[2] || {};
        (_a = options.getWeight) !== null && _a !== void 0 ? _a : (options.getWeight = () => 1);
        (_b = options.shuffle) !== null && _b !== void 0 ? _b : (options.shuffle = true);
        (_c = options.disableSort) !== null && _c !== void 0 ? _c : (options.disableSort = true);
        argv[2] = options;
        if (argv[1] === 1) {
            return rnd.dfItemByWeight(argv[0], argv[2]);
        }
        return rnd.dfItemByWeightUnique(...argv);
    });
    while (true) {
        // @ts-ignore
        let result = fns.map(fn => {
            let ret = fn();
            if (ret.length === 3 && !Array.isArray(ret[0])) {
                return ret[1];
            }
            // @ts-ignore
            return ret.map(v => v[1]);
        });
        yield result;
    }
}
exports.randomLottoGenerator = randomLottoGenerator;
function randomLotto(options) {
    return randomLottoGenerator(options)
        .next()
        .value;
}
exports.randomLotto = randomLotto;
exports.default = randomLotto;
//# sourceMappingURL=index.js.map