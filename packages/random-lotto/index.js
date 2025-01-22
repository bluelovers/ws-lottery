"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultGetWeight = defaultGetWeight;
exports.handleOptionsRange = handleOptionsRange;
exports.handleOptions = handleOptions;
exports.randomLottoGenerator = randomLottoGenerator;
exports.randomLotto = randomLotto;
exports.randomLottoX = randomLottoX;
const random_extra_1 = __importDefault(require("random-extra"));
const string_natural_compare_1 = require("@bluelovers/string-natural-compare");
function defaultGetWeight(value, key, index, options, ...argv) {
    var _a, _b;
    // @ts-ignore
    return ((_b = (_a = options.weightTable) === null || _a === void 0 ? void 0 : _a[index]) === null || _b === void 0 ? void 0 : _b[value]) || 1;
}
function handleOptionsRange(argv, index, options) {
    var _a, _b, _c, _d, _e;
    let opts = argv[2] || {};
    (_a = opts.getWeight) !== null && _a !== void 0 ? _a : (opts.getWeight = (value, key) => options.getWeight(value, key, index, options));
    (_b = opts.shuffle) !== null && _b !== void 0 ? _b : (opts.shuffle = true);
    (_c = opts.disableSort) !== null && _c !== void 0 ? _c : (opts.disableSort = true);
    argv[2] = opts;
    argv = (_e = (_d = options.handleOptionsRangeArgv) === null || _d === void 0 ? void 0 : _d.call(options, argv, index, options)) !== null && _e !== void 0 ? _e : argv;
    return argv;
}
function handleOptions(options) {
    var _a, _b, _c;
    const rnd = (_a = options.random) !== null && _a !== void 0 ? _a : (options.random = random_extra_1.default);
    const weightTable = (_b = options.weightTable) !== null && _b !== void 0 ? _b : (options.weightTable = []);
    (_c = options.getWeight) !== null && _c !== void 0 ? _c : (options.getWeight = defaultGetWeight);
    options.sortResults = !!options.sortResults;
    const fns = options.ranges.map((argv, index) => {
        argv = handleOptionsRange(argv, index, options);
        if (argv[1] === 1) {
            return rnd.dfItemByWeight(argv[0], argv[2]);
        }
        return rnd.dfItemByWeightUnique(...argv);
    });
    return {
        rnd,
        weightTable,
        fns,
        options,
    };
}
function* randomLottoGenerator(options) {
    const { fns } = handleOptions(options);
    const { sortResults } = options;
    while (true) {
        let result = fns.map(fn => {
            let ret = fn();
            if (ret.length === 3 && !Array.isArray(ret[0])) {
                return ret[1];
            }
            let value = ret.map(v => v[1]);
            if (sortResults === true) {
                value = value.sort(string_natural_compare_1.naturalCompare);
            }
            return value;
        });
        yield result;
    }
}
function randomLotto(options) {
    return randomLottoGenerator(options)
        .next()
        .value;
}
function randomLottoX(options, xOptions = {}) {
    var _a, _b;
    const fn = randomLottoGenerator(options);
    xOptions.limit |= 0;
    if (xOptions.limit <= 0)
        xOptions.limit = 10;
    const result = [];
    const cache = new Set();
    (_a = xOptions.handler) !== null && _a !== void 0 ? _a : (xOptions.handler = (actual) => actual);
    (_b = xOptions.filter) !== null && _b !== void 0 ? _b : (xOptions.filter = (value) => value !== void 0 && value !== null);
    while (result.length < xOptions.limit) {
        let limit = xOptions.limit - result.length;
        while (limit-- > 0) {
            let index = result.length;
            let actual = fn.next().value;
            let cache_value = JSON.stringify(Array.isArray(actual[0]) ? actual[0].slice().sort() : actual[0]);
            if (cache.has(cache_value)) {
                continue;
            }
            else {
                cache.add(cache_value);
            }
            let value = xOptions.handler(actual, index, options, result);
            if (value !== void 0 && value !== null && (xOptions.filter(value, index, options, result))) {
                result.push(value);
            }
        }
    }
    return result;
}
exports.default = randomLotto;
//# sourceMappingURL=index.js.map