import type { Random } from 'random-extra/src';
import { IGetWeight } from '@lazy-random/df-item-by-weight';
export interface IRandomLottoParams {
    random?: Random;
    ranges: Parameters<Random["dfItemByWeightUnique"]>[];
    weightTable?: Record<string, number>[];
    sortResults?: boolean;
    getWeight?: IRandomLottoGetWeight<any>;
    handleOptionsRangeArgv?<T extends any[] = number[][]>(argv: Parameters<Random["dfItemByWeightUnique"]>, index: number, options: IRandomLottoParams): Parameters<Random["dfItemByWeightUnique"]>;
}
export interface IRandomLottoGetWeight<T extends unknown, K extends string = string> extends IGetWeight<T, K> {
    (value: T, key: K, index: number, options: IRandomLottoParams, ...argv: any[]): number;
}
export declare function defaultGetWeight<T extends unknown, K extends string = string>(value: T, key: K, index: number, options: IRandomLottoParams, ...argv: any[]): number;
export declare function handleOptionsRange<T extends any[] = number[][]>(argv: Parameters<Random["dfItemByWeightUnique"]>, index: number, options: IRandomLottoParams): unknown[];
export declare function handleOptions<T extends any[] = number[][]>(options: IRandomLottoParams): {
    rnd: any;
    weightTable: Record<string, number>[];
    fns: any[];
    options: IRandomLottoParams;
};
export declare function randomLottoGenerator<T extends any[] = number[][]>(options: IRandomLottoParams): Generator<T, T, unknown>;
export declare function randomLotto<T extends any[] = number[][]>(options: IRandomLottoParams): T;
export declare function randomLottoX<T extends any[] = number[][], R = T, O extends IRandomLottoParams = IRandomLottoParams>(options: O, xOptions?: {
    limit?: number;
    handler?(actual: T, index: number, options: O, result: R[]): R;
    filter?(value: R, index: number, options: O, result: R[]): boolean;
}): R[];
export default randomLotto;
