import { Random } from 'random-extra/src';
export interface IRandomLottoParams {
    random?: Random;
    ranges: Parameters<Random["dfItemByWeightUnique"]>[];
    weightTable?: Record<string, number>[];
    sortResults?: boolean;
}
export declare function randomLottoGenerator<T extends any[] = number[][]>(options: IRandomLottoParams): Generator<T, T, unknown>;
export declare function randomLotto<T extends any[] = number[][]>(options: IRandomLottoParams): T;
export default randomLotto;
