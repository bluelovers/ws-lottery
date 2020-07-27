import superlotto638 from '@lazy-lotto/tw-history-data/lib/data/superlotto638.json';
import random from 'random-extra';
import { Random } from 'random-extra/src';
import naturalCompare from '@bluelovers/string-natural-compare';
import { IRandomLottoParams } from '../../index';
import { IRecordRow, IResultSuperlotto638 } from '@lazy-lotto/types';
import { inspect } from "util";

inspect.defaultOptions.colors = true;

export function getWeightTable<T extends IRecordRow<any> = IRecordRow<IResultSuperlotto638>>(historyData: Record<string, T> = superlotto638 as any)
{
	let historyArray = (Object.values(historyData) as T[]);

	historyArray = historyArray.reverse();

	const weightTable: IRandomLottoParams["weightTable"] = historyArray
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

	Object.entries(weightTable[0])
		.forEach((row) =>
		{

			if (row[1] < 100)
			{
				delete weightTable[0][row[0]]
			}

		})
	;

	console.dir(weightTable[0])

	return {
		historyArray,
		weightTable,
	}
}

function simpleMatchInArray<T extends number[]>(a1: T, a2: T)
{
	return a2.filter(v => a1.includes(v))
}

export function simpleMatchIn<T extends number[]>(current: T, historyArray: IRecordRow<[
	T,
	...any
]>[])
{
	let bool: boolean
	let match: number = 0;

	let ls = historyArray.reduce((a, v, index) =>
	{

		let m = simpleMatchInArray(current, v.result[0]);

		if (m.length >= 2 && m.length < 5)
		{
			a[m.length] ??= [];
			a[m.length].push(v.result[0])

			match = Math.max(m.length, match)

			bool = true;
		}
		else if (index < 20)
		{
			a[m.length] ??= [];
			a[m.length].push(v.result[0])

			match = Math.max(m.length, match)

			bool = true;
		}

		return a
	}, {} as Record<string, T[]>)

	if (bool === true)
	{
		return {
			current,
			match,
			//ls,
			follow: followArea(current),
		}
	}
}

export function followArea<T extends number[]>(current: T)
{
	let count: number = 0;
	let map: Record<string, number> = {};

	current.forEach(value =>
	{
		[
			[1, 7],
			[8, 14],
			[15, 21],
			[22, 28],
			[29, 35],
			[36, 39],
		].some(([min, max], index) =>
		{
			if (value >= min && value <= max)
			{
				map[index] ??= 0;
				map[index]++;
				return true
			}
		})
	});

	let skip = false;

	count = Object.values(map).filter(v =>
	{

		if (v > 3)
		{
			skip = true;
		}

		return v > 2
	}).length;

	if (count > 1 || Object.values(map).filter(v => v >= 2).length < 1 || ((map[3] ?? 0) + (map[4] ?? 0) + (map[5] ?? 0)) > 4 || ((map[2] ?? 0) + (map[3] ?? 0) + (map[4] ?? 0)) > 4 || ((map[0] ?? 0) + (map[1] ?? 0) + (map[2] ?? 0)) > 4)
	{
		skip = true;
	}

	return {
		count,
		skip,
		map,
	};
}
