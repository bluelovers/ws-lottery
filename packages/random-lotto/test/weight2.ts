import { randomLottoX } from '../index';
import fill from 'fill-range';
import { inspect } from 'util';
import { getWeightTable } from './util';
import { _createWeight, _percentageWeight, _calcWeight } from '@lazy-random/df-item-by-weight';
import { naturalCompare } from '@bluelovers/string-natural-compare';
import random from 'random-extra';
import { simpleMatchIn } from '@lazy-lotto/util/index';
import { defaultSimpleMatchInFilter } from '@lazy-lotto/util/lib/match/simpleMatchIn';

inspect.defaultOptions.depth = null;

const { weightTable, historyArray } = getWeightTable({
//	historyData: checkHistory().filter(v => v.max >= 4).reduce((a, b) => {
//
//		a[Number(b.id)] = b;
//
//		return a
//	}, {})
});

//console.log(Object.keys(weightTable[0]).length)

let historyTop = [];

export let list = randomLottoX({
	ranges: [
		[
			fill(1, 38),
			6,
		],
		[
			fill(1, 8),
			1,
		],
	],
	weightTable,
	sortResults: true,

	handleOptionsRangeArgv(argv, index, options)
	{
		let { vlist, kwlist } = _calcWeight(options.random, argv[0], argv[2]);

		vlist.sort((a, b) => {
			return naturalCompare(a[1] as any, b[1] as any)
		})

		console.dir(kwlist)
		console.dir(vlist)

		return argv
	},

}, {

	// @ts-ignore
	handler(actual, index): {
		current: number[],
		match: number,
		follow: {
			count: number,
			map: Record<string, number>,
		},
		sp: number
	}
	{
		let m = simpleMatchIn(actual[0], historyArray, index, {
			simpleMatchInFilter(m, index, options, current, historyRow, ...argv)
			{
				if (m.length > 5)
				{
					// @ts-ignore
					delete historyRow.dates[2]
					// @ts-ignore
					delete historyRow.dates[3]
					// @ts-ignore
					delete historyRow.ids[2]
					// @ts-ignore
					delete historyRow.ids[3]

					// @ts-ignore
					historyTop.push([index, current, historyRow.result[1], historyRow.date, historyRow.id, historyRow.dates, historyRow.ids])
				}

				return defaultSimpleMatchInFilter(m, index, options, current, historyRow, ...argv)
			}
		})

		if (m !== void 0)
		{
			return {
				...m,
				sp: actual[1] as any as number,
			}
		}

		return void 0
	},
	filter(value)
	{
		if (!value)
		{
			return false
		}

		// @ts-ignore
		let { skip } = value.follow;
		// @ts-ignore
		delete value.follow.skip;
		return !skip
	},
	limit: 3000,

})

//console.dir(list)
//console.dir(list.length)

console.warn(historyTop);

console.dir(random.itemByWeightUnique(list, 2, {
	getWeight: (m) => 1,
	shuffle: true,
}).map(v => v[1]))

