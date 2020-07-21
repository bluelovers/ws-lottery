"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doTask = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
const fs_extra_1 = require("fs-extra");
const getHistoryPath_1 = require("../../../util/getHistoryPath");
function doTask(pb) {
    //pb ??= new PlaywrightBrowser();
    return bluebird_1.default.resolve(pb)
        .then(async (pb) => {
        let targetFile = getHistoryPath_1.getHistoryPath('DailyCash.json');
        let data = await fs_extra_1.readJSON(targetFile).catch(e => ({}));
        return bluebird_1.default.resolve(pb)
            .tap(async (pb) => {
            const page = await pb.newPage();
            await page.goto('http://lotto.arclink.com.tw/Lotto39jhdz.html');
            //	await page.goto('https://www.taiwanlottery.com.tw/lotto/superlotto638/history2.aspx');
            let trs = await page.$$('table[width="780"] tr[onmouseover]');
            await bluebird_1.default.each(trs, async (tr) => {
                let tds = await tr.$$('td');
                let id = await tds[0].innerText();
                let date = await tds[1].innerText();
                let ls = await bluebird_1.default.map(tds.slice(-5), async (td) => {
                    return Number(await td.innerText());
                });
                data[id] = {
                    id,
                    date,
                    result: [
                        ls,
                    ],
                };
                return data;
            });
            await page.close();
            //					console.dir(data, {
            //						depth: null,
            //					});
        })
            .finally(async () => {
            await fs_extra_1.outputJSON(targetFile, data, {
                spaces: 2,
            });
            //return pb.close()
        });
    });
}
exports.doTask = doTask;
exports.default = doTask;
//# sourceMappingURL=index.js.map