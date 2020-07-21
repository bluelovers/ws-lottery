"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doTask = void 0;
const playwright_class_1 = __importDefault(require("playwright-class"));
const bluebird_1 = __importDefault(require("bluebird"));
const fs_extra_1 = require("fs-extra");
const getHistoryPath_1 = require("../../../util/getHistoryPath");
const fill_range_1 = __importDefault(require("fill-range"));
function doTask(pb) {
    pb !== null && pb !== void 0 ? pb : (pb = new playwright_class_1.default());
    return bluebird_1.default.resolve(pb)
        .then(async (pb) => {
        let targetFile = getHistoryPath_1.getHistoryPath('superlotto638.json');
        let data = await fs_extra_1.readJSON(targetFile).catch(e => ({}));
        return bluebird_1.default.resolve(pb)
            .tap(async (pb) => {
            const page = await pb.newPage();
            await page.goto('http://lotto.arclink.com.tw/Lotto388jhdz.html');
            //	await page.goto('https://www.taiwanlottery.com.tw/lotto/superlotto638/history2.aspx');
            let trs = await page.$$('table[width="780"] tr[onmouseover]');
            await bluebird_1.default.each(trs, async (tr) => {
                let tds = await tr.$$('td');
                let id = await tds[0].innerText();
                let date = await tds[1].innerText();
                let ls = await bluebird_1.default.map(tds.slice(-7), async (td) => {
                    return Number(await td.innerText());
                });
                data[id] = {
                    id,
                    date,
                    result: [
                        ls.slice(0, 6),
                        ls.pop(),
                    ],
                };
                return data;
            });
            await bluebird_1.default.each([
                fill_range_1.default(1, 6),
                fill_range_1.default(7, 12),
                fill_range_1.default(13, 18),
                fill_range_1.default(19, 24),
                fill_range_1.default(25, 30),
                fill_range_1.default(31, 36),
            ], async (ls, index) => {
                let href = `http://lotto.arclink.com.tw/Lottonocheck.do?type=12&limit=50&num1=${ls[0]}&num2=${ls[1]}&num3=${ls[2]}&num4=${ls[3]}&num5=${ls[4]}&num6=${ls[5]}&num7=${index + 1}&Submit=%B9%EF%A4%F1%ACd%B8%DF`;
                //console.dir(href)
                const page = await pb.newPage();
                await page.goto(href);
                let trs = await page.$$('tr[onmouseover][onmouseout]');
                await bluebird_1.default.each(trs, async (tr) => {
                    let tds = await tr.$$('td');
                    let id = await tds[0].innerText();
                    let date = await tds[1].innerText();
                    let ls = await bluebird_1.default.map(tds.slice(2), async (td) => {
                        return Number(await td.innerText());
                    });
                    ls.pop();
                    data[id] = {
                        id,
                        date,
                        result: [
                            ls.slice(0, 6),
                            ls.pop(),
                        ],
                    };
                    return data;
                });
                return bluebird_1.default.delay(1000);
            });
            console.dir(data, {
                depth: null,
            });
        })
            .finally(async () => {
            await fs_extra_1.outputJSON(targetFile, data, {
                spaces: 2,
            });
            return pb.close();
        });
    });
}
exports.doTask = doTask;
exports.default = doTask();
//# sourceMappingURL=index.js.map