import superlotto638 from '@lazy-lotto/tw-history-data/lib/data/superlotto638.json';
import { IRecordRow, IResultSuperlotto638 } from '@lazy-lotto/types';
import { randomLottoGenerator, IRandomLottoParams } from '../index';
import fill from 'fill-range';
import naturalCompare from '@bluelovers/string-natural-compare';

let historyArray = (Object.values(superlotto638) as IRecordRow<IResultSuperlotto638>[]);

const weightTable = historyArray
	.reduce((a, row) =>
	{

		row.result[0].forEach(v =>
		{
			a[0][v] ??= 1;
			a[0][v]++;
		})

		row.result[0] = row.result[0].sort(naturalCompare);

		let v2 = row.result[1];

		a[1][v2] ??= 1;
		a[1][v2]++;

		return a
	}, [{}, {}] as IRandomLottoParams["weightTable"]);

console.dir(weightTable)

let g = randomLottoGenerator({
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
})

let list = [];

for (let i = 0; i < 100; i++)
{
	let actual = g.next().value;

	let m = simpleMatchIn(actual[0], historyArray)

	if (m !== void 0)
	{
		list.push(m);

//		console.dir(m, {
//			depth: null,
//		})
	}

	//console.log(actual)
}

list.sort((a, b) => {
	return b.max - a.max
})

console.dir(list, {
	depth: null,
})

function simpleMatchInArray<T extends number[]>(a1: T, a2: T)
{
	return a2.filter(v => a1.includes(v))
}

function simpleMatchIn<T extends number[]>(a1: T,historyArray: IRecordRow<[
	T,
	...any
]>[])
{
	let bool: boolean
	let max: number = 0;

	let ls = historyArray.reduce((a, v) => {

		let m = simpleMatchInArray(a1, v.result[0]);

		if (m.length > 3)
		{
			a[m.length] ??= [];
			a[m.length].push(v.result[0])

			max = Math.max(m.length, max)

			bool = true;
		}

		return a
	}, {} as Record<string, T[]>)

	if (bool === true)
	{
		return {
			max,
			ls
		}
	}
}
