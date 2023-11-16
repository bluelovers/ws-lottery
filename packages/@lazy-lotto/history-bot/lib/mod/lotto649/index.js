"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doTask = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
const fs_extra_1 = require("fs-extra");
const getHistoryPath_1 = require("../../util/getHistoryPath");
const fill_range_1 = __importDefault(require("fill-range"));
const addRow_1 = require("../../util/addRow");
const defaultGoToOptions_1 = require("../../util/defaultGoToOptions");
//doTask(new PlaywrightBrowser()).then(pb => pb.close())
function doTask(pb) {
    //pb ??= new PlaywrightBrowser();
    return bluebird_1.default.resolve(pb)
        .then(async (pb) => {
        let targetFile = (0, getHistoryPath_1.getHistoryPath)('lotto649.raw.json');
        let data = await (0, fs_extra_1.readJSON)(targetFile).catch(e => ({}));
        return bluebird_1.default.resolve(pb)
            .tap(async (pb) => {
            const page = await pb.newPage();
            await page.goto('http://lotto.arclink.com.tw/Lotto49jhdz.html', defaultGoToOptions_1.defaultGoToOptions);
            //	await page.goto('https://www.taiwanlottery.com.tw/lotto/superlotto638/history2.aspx');
            let trs = await page.$$('table[width="780"] tr[onmouseover]');
            await bluebird_1.default.each(trs, async (tr) => {
                let tds = await tr.$$('td');
                let id = await tds[0].innerText();
                let date = await tds[1].innerText();
                let ls = await bluebird_1.default.map(tds.slice(-7), async (td) => {
                    return Number(await td.innerText());
                });
                (0, addRow_1.addRow)(id, data, {
                    id,
                    date,
                    result: [
                        ls.slice(0, 6),
                        ls.pop(),
                    ],
                });
                return data;
            });
            await page.close();
            await pb.newPage()
                .then(async (page) => {
                await page.goto(`http://lotto.arclink.com.tw/jsp/lotto/historyKind10100.jsp?n1=&n2=&n3=`, defaultGoToOptions_1.defaultGoToOptions);
                let trs = await page.$$('table tr[id^="p"]');
                await bluebird_1.default.each(trs, async (tr) => {
                    let tds = await tr.$$('td');
                    let id = await tds[0].innerText();
                    let ls = await bluebird_1.default.map(tds.slice(1), async (td) => {
                        return Number(await td.innerText());
                    });
                    (0, addRow_1.addRow)(id, data, {
                        id,
                        result: [
                            ls.slice(0, 6),
                            ls.pop(),
                        ],
                    });
                    return data;
                });
                await page.close();
            });
            await bluebird_1.default.each([
                `http://lotto.arclink.com.tw/Lottonocheck.do?type=1`,
            ].concat([
                (0, fill_range_1.default)(1, 6),
                (0, fill_range_1.default)(7, 12),
                (0, fill_range_1.default)(13, 18),
                (0, fill_range_1.default)(19, 24),
                (0, fill_range_1.default)(25, 30),
                (0, fill_range_1.default)(31, 36),
                (0, fill_range_1.default)(37, 42),
                (0, fill_range_1.default)(43, 48),
                [4, 15, 22, 37, 49, 39, 1],
            ].map((ls, index) => `http://lotto.arclink.com.tw/Lottonocheck.do?type=1&limit=50&num1=${ls[0]}&num2=${ls[1]}&num3=${ls[2]}&num4=${ls[3]}&num5=${ls[4]}&num6=${ls[5]}&Submit=%B9%EF%A4%F1%ACd%B8%DF`)), async (href) => {
                //console.dir(href)
                const page = await pb.newPage();
                await page.goto(href, defaultGoToOptions_1.defaultGoToOptions);
                let trs = await page.$$('tr[onmouseover][onmouseout]');
                await bluebird_1.default.each(trs, async (tr) => {
                    let tds = await tr.$$('td');
                    let id = await tds[0].innerText();
                    let date = await tds[1].innerText();
                    let ls = await bluebird_1.default.map(tds.slice(2), async (td) => {
                        return Number(await td.innerText());
                    });
                    ls.pop();
                    (0, addRow_1.addRow)(id, data, {
                        id,
                        date,
                        result: [
                            ls.slice(0, 6),
                            ls.pop(),
                        ],
                    });
                    return data;
                });
                await page.close();
                return bluebird_1.default.delay(1000);
            });
            //					console.dir(data, {
            //						depth: null,
            //					});
        })
            .finally(async () => {
            //data = sortObject(data);
            await (0, fs_extra_1.outputJSON)(targetFile, data, {
                spaces: 2,
            });
            //return pb.close()
        });
    });
}
exports.doTask = doTask;
exports.default = doTask;
//# sourceMappingURL=index.js.map