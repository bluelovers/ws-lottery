import { randomLottoGenerator } from '../index';
import fill from 'fill-range';

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
}
