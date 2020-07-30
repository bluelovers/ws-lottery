import { ISimpleMatchInOptions, defaultSimpleMatchInArray } from '../match/simpleMatchIn';
import { IRecordRow } from '@lazy-lotto/types/index';

export type ISimpleAnalyzeHistoryRow<T> = T & {
	match: Record<string, number>;
	ids: Record<string, string>;
	dates: Record<string, string>;
	maxMatch: number;
}

export interface ISimpleAnalyzeHistoryOptions<T extends IRecordRow<any[]>> extends ISimpleMatchInOptions<number>
{

}

export function simpleAnalyzeHistoryRow<T extends IRecordRow<any[]>>(current: T,
	historyArray: T[],
	options?: ISimpleAnalyzeHistoryOptions<T>,
): ISimpleAnalyzeHistoryRow<T>
{
	let match = {} as Record<string, number>;
	let ids = {} as Record<string, string>;
	let dates = {} as Record<string, string>;

	let { simpleMatchInArray = defaultSimpleMatchInArray } = options ?? {};

	historyArray
		.forEach(v =>
		{

			if (v.id !== current.id)
			{
				let m = simpleMatchInArray(current.result[0], v.result[0])

				if (m.length > 1)
				{
					match[m.length] = (match[m.length] ?? 0) + 1;

					ids[m.length] ??= v.id
					dates[m.length] ??= v.date
				}
			}

		})
	;

	let maxMatch = Object.keys(match).reduce((a, b) => Math.max(a, b as any), 0)

	return {
		...current,
		match,
		ids,
		dates,
		maxMatch,
	}
}
