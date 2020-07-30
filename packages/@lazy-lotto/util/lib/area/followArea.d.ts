export interface IFollowAreaOptions<T extends number[] = number[]> {
    areaRanges?: [number, number][];
    followAreaFilter?(current: T, options: IFollowAreaOptions, map: Record<string, number>): {
        count: number;
        skip: boolean;
        map: Record<string, number>;
    };
}
export declare const defaultFollowAreaRanges: [number, number][];
export declare function followAreaRanges<T extends number[]>(current: T, options: IFollowAreaOptions<T>): Record<string, number>;
export declare function defaultFollowAreaFilter<T extends number[]>(current: T, options: IFollowAreaOptions, map: Record<string, number>): {
    count: number;
    skip: boolean;
    map: Record<string, number>;
};
