import { randomLottoX } from '../index';
import fill from 'fill-range';
import { inspect } from 'util';
import { simpleMatchIn, getWeightTable } from './util';

inspect.defaultOptions.depth = null;

const { weightTable, historyArray } = getWeightTable();

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
}, {

	// @ts-ignore
	handler(actual): {
		current: number[],
		match: number,
		follow: {
			count: number,
			map: Record<string, number>,
		},
		sp: number
	}
	{
		let m = simpleMatchIn(actual[0], historyArray)

		if (m !== void 0)
		{
			return {
				...m,
				sp: actual[1] as any as number,
			}
		}
	},
	filter(value)
	{
		// @ts-ignore
		let { skip } = value.follow;
		// @ts-ignore
		delete value.follow.skip;
		return !skip
	},
	limit: 50,
})

console.dir(list)
console.dir(list.length)

