import { IRecordRow } from '@lazy-lotto/types/index';
import { followAreaRanges, IFollowAreaOptions, defaultFollowAreaFilter } from './lib/area/followArea';
import {
	defaultSimpleMatchInFilter,
	defaultSimpleMatchInArray,
	ISimpleMatchInOptions,
} from './lib/match/simpleMatchIn';
import {
	simpleAnalyzeHistoryRow,
	ISimpleAnalyzeHistoryOptions,
	ISimpleAnalyzeHistoryRow,
} from './lib/analyze/simpleAnalyzeHistory';

export function followArea<T extends number[]>(current: T, options?: IFollowAreaOptions)
{
	let map = followAreaRanges(current, options);

	return (options?.followAreaFilter ?? defaultFollowAreaFilter)(current, options, map);
}

export function simpleMatchIn<T extends number>(current: T[], historyArray: IRecordRow<[
	T[],
	...any
]>[], index: number, options?: ISimpleMatchInOptions<T>)
{
	let bool: boolean
	let match: number = 0;

	let { simpleMatchInFilter = defaultSimpleMatchInFilter, simpleMatchInArray = defaultSimpleMatchInArray } = options ?? {};

	let ls = historyArray.reduce((a, historyRow, idx) =>
	{
		let m = simpleMatchInArray(current, historyRow.result[0]);

		if (simpleMatchInFilter(m, index, options, current, historyRow))
		{
			a[m.length] ??= [];
			a[m.length].push(historyRow.result[0])

			match = Math.max(m.length, match)

			bool = true;
		}

		return a
	}, {} as Record<string, T[][]>)

	if (bool === true)
	{
		return {
			current,
			match,
			//ls,
			follow: followArea(current, options),
		}
	}
}

export function simpleAnalyzeHistory<T extends IRecordRow<any[]>>(historyData: Record<string, T>, options?: ISimpleAnalyzeHistoryOptions<T>)
{
	let historyArray = Object.values(historyData)

	historyArray = historyArray.reverse();

	return historyArray
		.reduce((a, b) =>
		{

			a.push(simpleAnalyzeHistoryRow(b, historyArray, options));

			return a
		}, [] as ISimpleAnalyzeHistoryRow<T>[])
}
