import { randomLottoGenerator } from '../index';
import fill from 'fill-range';
import { test, TestContext} from 'node:test';

test(`SuperLotto638`, (t: TestContext) =>
{

	let g = randomLottoGenerator({
		ranges: [
			[
				fill(1, 38) as any,
				6,
			],
			[
				fill(1, 8) as any,
				1,
			],
		],
	})

	for (let i = 0; i < 10; i++)
	{
		let actual = g.next().value;

		console.log(actual)

		t.assert.strictEqual(actual[0].length, 6);
		t.assert.strictEqual(typeof actual[1], 'number');
		t.assert.strictEqual(actual.length, 2);
	}

});

