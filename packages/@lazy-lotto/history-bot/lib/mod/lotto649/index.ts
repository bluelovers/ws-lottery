import playwright, { WebKitBrowser } from 'playwright';
import PlaywrightBrowser, { EnumPlaywrightBrowserType } from 'playwright-class';
import Bluebird from 'bluebird';
import { outputJSON, readJSON } from 'fs-extra';
import { join } from 'path';
import __root from '../../../__root';
import { getHistoryPath } from '../../../util/getHistoryPath';
import { IResultSuperlotto638, IRecordRow } from '@lazy-lotto/types';
import fill from 'fill-range';

export function doTask(pb: PlaywrightBrowser)
{
	//pb ??= new PlaywrightBrowser();

	return Bluebird.resolve(pb)
		.then(async (pb) =>
		{
			let targetFile = getHistoryPath('lotto649.json');

			let data: Record<string, IRecordRow<IResultSuperlotto638>> = await readJSON(targetFile).catch(e => ({}));

			return Bluebird.resolve(pb)
				.tap(async (pb) =>
				{

					const page = await pb.newPage();
					await page.goto('http://lotto.arclink.com.tw/Lotto49jhdz.html');
//	await page.goto('https://www.taiwanlottery.com.tw/lotto/superlotto638/history2.aspx');

					let trs = await page.$$('table[width="780"] tr[onmouseover]');

					await Bluebird.each(trs, async (tr) =>
					{

						let tds = await tr.$$('td');

						let id = await tds[0].innerText();
						let date = await tds[1].innerText();

						let ls = await Bluebird.map(tds.slice(-7), async (td) =>
						{
							return Number(await td.innerText())
						});

						data[id] = {
							id,
							date,
							result: [
								ls.slice(0, 6),
								ls.pop(),
							],
						}

						return data;
					});

					await page.close();

					await Bluebird.each([
						`http://lotto.arclink.com.tw/Lottonocheck.do?type=1`,
					].concat([
						fill(1, 6),
						fill(7, 12),
						fill(13, 18),
						fill(19, 24),
						fill(25, 30),
						fill(31, 36),
						fill(37, 42),
						fill(43, 48),
						[4, 15, 22, 37, 49, 39, 1],
					].map((ls,
						index,
					) => `http://lotto.arclink.com.tw/Lottonocheck.do?type=1&limit=50&num1=${ls[0]}&num2=${ls[1]}&num3=${ls[2]}&num4=${ls[3]}&num5=${ls[4]}&num6=${ls[5]}&Submit=%B9%EF%A4%F1%ACd%B8%DF`)), async (href) =>
					{

						//console.dir(href)

						const page = await pb.newPage();
						await page.goto(href);

						let trs = await page.$$('tr[onmouseover][onmouseout]');

						await Bluebird.each(trs, async (tr) =>
						{

							let tds = await tr.$$('td');

							let id = await tds[0].innerText();
							let date = await tds[1].innerText();

							let ls = await Bluebird.map(tds.slice(2), async (td) =>
							{
								return Number(await td.innerText())
							});

							ls.pop();

							data[id] = {
								id,
								date,
								result: [
									ls.slice(0, 6),
									ls.pop(),
								],
							}

							return data;
						});

						await page.close();

						return Bluebird.delay(1000)
					})

//					console.dir(data, {
//						depth: null,
//					});

				})
				.finally(async () =>
				{

					await outputJSON(targetFile, data, {
						spaces: 2,
					})

					//return pb.close()
				})

		})
		;
}

export default doTask
