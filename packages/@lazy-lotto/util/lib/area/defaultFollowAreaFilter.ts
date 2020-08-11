import { IFollowAreaOptions } from './types';

export function defaultFollowAreaFilter<T extends number[]>(current: T,
	options: IFollowAreaOptions,
	map: Record<string, number>,
)
{
	let count: number = 0;

	let skip = false;

	let c1 = 0;
	let c2 = 0;

	Object.values(map)
		.reduce((a, b) =>
		{

			if (b > 2)
			{
				c1++
			}

			if (b >= 2)
			{
				c2++
			}

			if (b > 3)
			{
				skip = true;
			}

			if ((a + b) > 4)
			{
				skip = true;
			}

			return b
		}, 0)
	;

	count = c1;

	if (skip || c1 > 1 || c2 < 1)
	{
		skip = true;
	}

	return {
		count,
		skip,
		map,
	};
}
