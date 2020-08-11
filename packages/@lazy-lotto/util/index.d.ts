import { IRecordRow } from '@lazy-lotto/types/index';
import { ISimpleMatchInOptions } from './lib/match/simpleMatchIn';
import { ISimpleAnalyzeHistoryOptions, ISimpleAnalyzeHistoryRow } from './lib/analyze/simpleAnalyzeHistory';
import { IFollowAreaOptions } from './lib/area/types';
export declare function followArea<T extends number[]>(current: T, options?: IFollowAreaOptions): {
    count: number;
    skip: boolean;
    map: Record<string, number>;
};
export declare function simpleMatchIn<T extends number>(current: T[], historyArray: IRecordRow<[
    T[],
    ...any
]>[], index: number, options?: ISimpleMatchInOptions<T>): {
    current: T[];
    match: number;
    follow: {
        count: number;
        skip: boolean;
        map: Record<string, number>;
    };
};
export declare function simpleAnalyzeHistory<T extends IRecordRow<any[]>>(historyData: Record<string, T>, options?: ISimpleAnalyzeHistoryOptions<T>): ISimpleAnalyzeHistoryRow<T>[];
