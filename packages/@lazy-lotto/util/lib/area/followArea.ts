
export interface IFollowAreaOptions<T extends number[] = number[]>
{
	areaRanges?: [number, number][];

	followAreaFilter?(current: T, options: IFollowAreaOptions, map: Record<string, number>): {
		count: number,
		skip: boolean,
		map: Record<string, number>,
	};
}

export const defaultFollowAreaRanges: [number, number][] = [
	[1, 1 + 6],
	[8, 8 + 6],
	[15, 15 + 6],
	[22, 22 + 6],
	[29, 26 + 6],
	[36, 36 + 6],
];

export function followAreaRanges<T extends number[]>(current: T, options: IFollowAreaOptions<T>)
{
	let map: Record<string, number> = {};

	current.forEach(value =>
	{
		(options?.areaRanges ?? defaultFollowAreaRanges).some(([min, max], index) =>
		{
			if (value >= min && value <= max)
			{
				map[index] ??= 0;
				map[index]++;
				return true
			}
		})
	});

	return map
}

export function defaultFollowAreaFilter<T extends number[]>(current: T, options: IFollowAreaOptions, map: Record<string, number>)
{
	let count: number = 0;

	let skip = false;

	count = Object.values(map).filter(v =>
	{

		if (v > 3)
		{
			skip = true;
		}

		return v > 2
	}).length;

	if (count > 1 || Object.values(map)
		.filter(v => v >= 2).length < 1 || ((map[3] ?? 0) + (map[4] ?? 0) + (map[5] ?? 0)) > 4 || ((map[2] ?? 0) + (map[3] ?? 0) + (map[4] ?? 0)) > 4 || ((map[0] ?? 0) + (map[1] ?? 0) + (map[2] ?? 0)) > 4)
	{
		skip = true;
	}

	return {
		count,
		skip,
		map,
	};
}
