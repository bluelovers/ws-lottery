import { IFollowAreaOptions } from './types';
export declare function defaultFollowAreaFilter<T extends number[]>(current: T, options: IFollowAreaOptions, map: Record<string, number>): {
    count: number;
    skip: boolean;
    map: Record<string, number>;
};
