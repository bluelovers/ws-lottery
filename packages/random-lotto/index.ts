import random from 'random-extra';
import { Random } from 'random-extra/src';
import naturalCompare from '@bluelovers/string-natural-compare';

export interface IRandomLottoParams
{
	random?: Random;
	ranges: Parameters<Random["dfItemByWeightUnique"]>[];
	weightTable?: Record<string, number>[];
	sortResults?: boolean,
}

export function* randomLottoGenerator<T extends any[] = number[][]>(options: IRandomLottoParams): Generator<T, T, unknown>
{
	const rnd = options.random ?? random;
	const weightTable = options.weightTable ?? [];

	const fns = options.ranges.map((argv,  index) =>
	{

		let options = argv[2] || {};

		options.getWeight ??= (value: any) => weightTable[index]?.[value] || 1;

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
			let value: number[] = ret.map(v => v[1]);

			if (options.sortResults)
			{
				value = value.sort(naturalCompare);
			}

			return value

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
