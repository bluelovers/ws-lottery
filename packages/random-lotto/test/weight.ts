import superlotto638 from '@lazy-lotto/tw-history-data/lib/data/superlotto638.json';
import { IRecordRow, IResultSuperlotto638 } from '@lazy-lotto/types';
import { randomLottoGenerator, IRandomLottoParams } from '../index';
import fill from 'fill-range';

const weightTable = (Object.values(superlotto638) as IRecordRow<IResultSuperlotto638>[])
	.reduce((a, row) =>
	{

		row.result[0].forEach(v =>
		{
			a[0][v] ??= 1;
			a[0][v]++;
		})

		let v2 = row.result[1];

		a[1][v2] ??= 1;
		a[1][v2]++;

		return a
	}, [{}, {}] as IRandomLottoParams["weightTable"]);

console.dir(weightTable)

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
	weightTable,
	sortResults: true,
})

for (let i = 0; i < 15; i++)
{
	let actual = g.next().value;

	console.log(actual)
}
