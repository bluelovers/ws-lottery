import random from 'random-extra';
import fill from 'fill-range';
import { Random } from 'random-extra/src';

export interface IRandomLottoParams
{
	random?: Random;
	ranges: Parameters<Random["dfItemByWeightUnique"]>[];
}

export function* randomLottoGenerator<T extends any[] = number[][]>(options: IRandomLottoParams): Generator<T, T, unknown>
{
	const rnd = options.random ?? random;

	const fns = options.ranges.map(argv =>
	{

		let options = argv[2] || {};

		options.getWeight ??= () => 1;
		options.shuffle ??= true;
		options.disableSort ??= true;

		argv[2] = options;

		if (argv[1] === 1)
		{
			return rnd.dfItemByWeight(argv[0], argv[2]);
		}

		return rnd.dfItemByWeightUnique(...argv)
	})

	while (true)
	{
		// @ts-ignore
		let result: T = fns.map(fn => {

			let ret = fn();

			if (ret.length === 3 && !Array.isArray(ret[0]))
			{
				return ret[1]
			}

			// @ts-ignore
			return ret.map(v => v[1])

		}) as any

		yield result;
	}
}

export function randomLotto<T extends any[] = number[][]>(options: IRandomLottoParams): T
{
	return randomLottoGenerator<T>(options)
		.next()
		.value
}

export default randomLotto
