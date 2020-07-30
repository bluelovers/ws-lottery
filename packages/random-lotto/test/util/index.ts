import superlotto638 from '@lazy-lotto/tw-history-data/lib/data/superlotto638.json';
import naturalCompare from '@bluelovers/string-natural-compare';
import { IRandomLottoParams } from '../../index';
import { IRecordRow, IResultSuperlotto638 } from '@lazy-lotto/types';
import { inspect } from "util";

inspect.defaultOptions.colors = true;

export function getWeightTable<T extends IRecordRow<any[]> = IRecordRow<IResultSuperlotto638>>(options?: {
	historyData?: Record<string, T>,
	historyLimit?: number,
})
{
	let { historyData = superlotto638, historyLimit = Infinity } = options ?? {};

	let historyArray = (Object.values(historyData) as T[]);

	historyArray = historyArray.reverse();

	if (historyLimit < historyArray.length)
	{
		historyArray = historyArray.slice(0, historyLimit)
	}

	const weightTable: IRandomLottoParams["weightTable"] = historyArray
		.reduce((a, row) =>
		{

			row.result[0].forEach(v =>
			{
				a[0][v] ??= 1;
				a[0][v]++;
			})

			row.result[0] = row.result[0].sort(naturalCompare);

			let v2 = row.result[1];

			a[1][v2] ??= 1;
			a[1][v2]++;

			return a
		}, [{}, {}] as IRandomLottoParams["weightTable"]);

	console.dir(weightTable[0])

	Object.entries(weightTable[0])
		.forEach((row) =>
		{

			if (row[1] < 100)
			{
				delete weightTable[0][row[0]]
			}

		})
	;

	//console.dir(weightTable[0])

	return {
		historyArray,
		weightTable,
	}
}

