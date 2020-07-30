import { IFollowAreaOptions } from '../area/followArea';
import { IRecordRow } from '@lazy-lotto/types/index';
export declare function defaultSimpleMatchInFilter<T extends number>(m: T[], index: number, options: ISimpleMatchInOptions<T>, current: T[], historyRow: IRecordRow<[
    T[],
    ...any
]>): boolean;
export declare function defaultSimpleMatchInArray<T>(a1: T[], a2: T[]): T[];
export interface ISimpleMatchInOptions<T extends number> extends IFollowAreaOptions<T[]> {
    simpleMatchInFilter?(m: T[], index: number, options: ISimpleMatchInOptions<T>, current: T[], historyRow: IRecordRow<[
        T[],
        ...any
    ]>): boolean;
    simpleMatchInArray?(a1: T[], a2: T[]): T[];
}
