import { defaultFollowAreaRanges } from './defaultFollowAreaRanges';
import { IFollowAreaOptions } from './types';

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
