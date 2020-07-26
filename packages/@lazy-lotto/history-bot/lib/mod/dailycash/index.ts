import playwright, { WebKitBrowser } from 'playwright';
import PlaywrightBrowser, { EnumPlaywrightBrowserType } from 'playwright-class';
import Bluebird from 'bluebird';
import { outputJSON, readJSON } from 'fs-extra';
import { join } from 'path';
import __root from '../../../__root';
import { getHistoryPath } from '../../util/getHistoryPath';
import { IResultSuperlotto638, IRecordRow, IResultDailyCash } from '@lazy-lotto/types';
import sortObject from 'sort-object-keys2';
import { addRow } from '../../util/addRow';

export function doTask(pb: PlaywrightBrowser)
{
	//pb ??= new PlaywrightBrowser();

	return Bluebird.resolve(pb)
		.then(async (pb) =>
		{
			let targetFile = getHistoryPath('DailyCash.json');

			let data: Record<string, IRecordRow<IResultDailyCash>> = await readJSON(targetFile).catch(e => ({}));

			return Bluebird.resolve(pb)
				.tap(async (pb) =>
				{

					const page = await pb.newPage();
					await page.goto('http://lotto.arclink.com.tw/Lotto39jhdz.html');
//	await page.goto('https://www.taiwanlottery.com.tw/lotto/superlotto638/history2.aspx');

					let trs = await page.$$('table[width="780"] tr[onmouseover]');

					await Bluebird.each(trs, async (tr) =>
					{

						let tds = await tr.$$('td');

						let id = await tds[0].innerText();
						let date = await tds[1].innerText();

						let ls = await Bluebird.map(tds.slice(-5), async (td) =>
						{
							return Number(await td.innerText())
						});

						addRow(id, data, {
							id,
							date,
							result: [
								ls,
							],
						});

						return data;
					});

					await page.close();

//					console.dir(data, {
//						depth: null,
//					});

				})
				.finally(async () =>
				{
					//data = sortObject(data);

					await outputJSON(targetFile, data, {
						spaces: 2,
					})

					//return pb.close()
				})

		})
		;
}

export default doTask
