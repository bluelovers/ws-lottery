
import Bluebird from 'bluebird';
import { join } from 'path';
import PlaywrightBrowser from 'playwright-class';
import { buildHistoryDataExtra } from './lib/util/build-history-data-extra';
import { parse } from 'path';

export default Bluebird.resolve(new PlaywrightBrowser())
	.tap(pb => {
		return Bluebird.each([
			'./lib/mod/dailycash',
			'./lib/mod/lotto649',
			'./lib/mod/superlotto638'
		], async (target) => {
			console.time(target)

			await import(join(__dirname, target))
				.then(m => m.default(pb))
				.catch(e => console.error(e))
			;

			await buildHistoryDataExtra(parse(target).name);

			console.timeEnd(target)
		})
	})
	.tap(pb => pb.close())
	.tap(e => process.exit())
;



