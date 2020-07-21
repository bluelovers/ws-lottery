import { randomLottoGenerator } from '../index';
import fill from 'fill-range';

test(`SuperLotto638`, () =>
{

	let g = randomLottoGenerator({
		ranges: [
			[
				fill(1, 38),
				6,
			],
			[
				fill(1, 8),
				1,
			],
		],
	})

	for (let i = 0; i < 10; i++)
	{
		let actual = g.next().value;

		console.log(actual)

		expect(actual[0].length).toStrictEqual(6);
		expect(typeof actual[1]).toStrictEqual('number');
		expect(actual.length).toStrictEqual(2);
	}

});

