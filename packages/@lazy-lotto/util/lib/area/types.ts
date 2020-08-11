export interface IFollowAreaOptions<T extends number[] = number[]>
{
	areaRanges?: [number, number][];

	followAreaFilter?(current: T, options: IFollowAreaOptions, map: Record<string, number>): {
		count: number,
		skip: boolean,
		map: Record<string, number>,
	};
}
