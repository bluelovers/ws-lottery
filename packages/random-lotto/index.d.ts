import { Random } from 'random-extra/src';
import { IGetWeight } from 'random-extra/src/distributions/internal/item-by-weight';
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
export declare function handleOptionsRange<T extends any[] = number[][]>(argv: Parameters<Random["dfItemByWeightUnique"]>, index: number, options: IRandomLottoParams): [arr: import("random-extra/src/distributions/internal/item-by-weight").IObjectInput<unknown, string>, size: number, options?: import("random-extra/src/distributions/internal/item-by-weight").IOptionsItemByWeight<unknown, string>, ...argv: any[]];
export declare function handleOptions<T extends any[] = number[][]>(options: IRandomLottoParams): {
    rnd: Random<import("random-extra/src/rng").RNG>;
    weightTable: Record<string, number>[];
    fns: ((() => import("random-extra/src/distributions/internal/item-by-weight").IWeightEntrie<unknown, string>[]) | (() => import("random-extra/src/distributions/internal/item-by-weight").IWeightEntrie<unknown, string>))[];
    options: IRandomLottoParams;
};
export declare function randomLottoGenerator<T extends any[] = number[][]>(options: IRandomLottoParams): Generator<T, T, unknown>;
export declare function randomLotto<T extends any[] = number[][]>(options: IRandomLottoParams): T;
export default randomLotto;
