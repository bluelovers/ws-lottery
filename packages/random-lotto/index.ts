import random from 'random-extra';
import { Random } from 'random-extra/src';
import naturalCompare from '@bluelovers/string-natural-compare';
import { IGetWeight } from 'random-extra/src/distributions/internal/item-by-weight';

export interface IRandomLottoParams
{
	random?: Random;
	ranges: Parameters<Random["dfItemByWeightUnique"]>[];
	weightTable?: Record<string, number>[];
	sortResults?: boolean,
	getWeight?: IRandomLottoGetWeight<any>;

	handleOptionsRangeArgv?<T extends any[] = number[][]>(argv: Parameters<Random["dfItemByWeightUnique"]>, index: number, options: IRandomLottoParams): Parameters<Random["dfItemByWeightUnique"]>
}

export interface IRandomLottoGetWeight<T extends unknown, K extends string = string> extends IGetWeight<T, K> {
	(value: T, key: K, index: number, options: IRandomLottoParams, ...argv: any[]): number;
}

export function defaultGetWeight<T extends unknown, K extends string = string>(value: T, key: K, index: number, options: IRandomLottoParams, ...argv: any[]): number
{
	// @ts-ignore
	return options.weightTable?.[index]?.[value] || 1;
}

export function handleOptionsRange<T extends any[] = number[][]>(argv: Parameters<Random["dfItemByWeightUnique"]>, index: number, options: IRandomLottoParams)
{
	let opts = argv[2] || {};

	opts.getWeight ??= (value, key) => options.getWeight(value, key, index, options);

	opts.shuffle ??= true;
	opts.disableSort ??= true;

	argv[2] = opts;

	argv = options.handleOptionsRangeArgv?.(argv, index, options) ?? argv;

	return argv
}

export function handleOptions<T extends any[] = number[][]>(options: IRandomLottoParams)
{
	const rnd = options.random ??= random;
	const weightTable = options.weightTable ??= [];

	options.getWeight ??= defaultGetWeight;
	options.sortResults = !!options.sortResults;

	const fns = options.ranges.map((argv,  index) =>
	{
		argv = handleOptionsRange(argv, index, options);

		if (argv[1] === 1)
		{
			return rnd.dfItemByWeight(argv[0], argv[2]);
		}

		return rnd.dfItemByWeightUnique(...argv)
	})

	return {
		rnd,
		weightTable,
		fns,
		options,
	}
}

export function* randomLottoGenerator<T extends any[] = number[][]>(options: IRandomLottoParams): Generator<T, T, unknown>
{
	const { fns } = handleOptions(options);
	const { sortResults } = options;

	while (true)
	{
		let result: T = fns.map(fn => {

			let ret = fn();

			if (ret.length === 3 && !Array.isArray(ret[0]))
			{
				return ret[1]
			}

			let value: number[] = (ret as any[]).map(v => v[1]);

			if (sortResults === true)
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

export function randomLottoX<T extends any[] = number[][], R = T, O extends IRandomLottoParams = IRandomLottoParams>(options: O, xOptions: {
	limit?: number,
	handler?(actual: T, index: number, options: O, result: R[]): R
	filter?(value : R, index: number, options: O, result: R[]): boolean,
} = {}): R[]
{
	const fn = randomLottoGenerator<T>(options);

	xOptions.limit |= 0;
	if (xOptions.limit <= 0) xOptions.limit = 10;

	const result: R[] = [];

	while (result.length < xOptions.limit)
	{
		let limit = xOptions.limit - result.length;

		while (limit-- > 0)
		{
			let index = result.length;

			let actual: T = fn.next().value;
			let value: R = xOptions.handler?.(actual, index, options, result) ?? actual as any;

			if (value !== void 0 && value !== null && (xOptions.filter?.(value, index, options, result) ?? true))
			{
				result.push(value)
			}
		}
	}

	return result
}

export default randomLotto
