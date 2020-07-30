import { ISimpleMatchInOptions } from '../match/simpleMatchIn';
import { IRecordRow } from '@lazy-lotto/types/index';
export declare type ISimpleAnalyzeHistoryRow<T> = T & {
    match: Record<string, number>;
    ids: Record<string, string>;
    dates: Record<string, string>;
    maxMatch: number;
};
export interface ISimpleAnalyzeHistoryOptions<T extends IRecordRow<any[]>> extends ISimpleMatchInOptions<number> {
}
export declare function simpleAnalyzeHistoryRow<T extends IRecordRow<any[]>>(current: T, historyArray: T[], options?: ISimpleAnalyzeHistoryOptions<T>): ISimpleAnalyzeHistoryRow<T>;
