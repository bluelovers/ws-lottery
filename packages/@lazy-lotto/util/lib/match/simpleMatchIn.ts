import { IRecordRow } from '@lazy-lotto/types/index';
import { IFollowAreaOptions } from '../area/types';

export function defaultSimpleMatchInFilter<T extends number>(m: T[], index: number, options: ISimpleMatchInOptions<T>, current: T[], historyRow: IRecordRow<[
	T[],
	...any
]>)
{
	return m.length >= 4
}

export function defaultSimpleMatchInArray<T>(a1: T[], a2: T[]): T[]
{
	return a2.filter(v => a1.includes(v))
}

export interface ISimpleMatchInOptions<T extends number> extends IFollowAreaOptions<T[]>
{
	simpleMatchInFilter?(m: T[], index: number, options: ISimpleMatchInOptions<T>, current: T[], historyRow: IRecordRow<[
		T[],
		...any
	]>): boolean

	simpleMatchInArray?(a1: T[], a2: T[]): T[]
}
