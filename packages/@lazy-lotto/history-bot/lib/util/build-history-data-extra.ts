import { getHistoryPath } from './getHistoryPath';
import { readJSON, outputJSON } from 'fs-extra';
import { IRecordRow } from '@lazy-lotto/types/index';
import { simpleAnalyzeHistory } from '@lazy-lotto/util/index';
import { ISimpleAnalyzeHistoryRow } from '@lazy-lotto/util/lib/analyze/simpleAnalyzeHistory';

export async function buildHistoryDataExtra<T extends IRecordRow<any[]>>(modName: string)
{
	let targetFile = getHistoryPath(`${modName}.raw.json`);
	let outputFile = getHistoryPath(`${modName}.json`);

	let historyData: Record<string, T> = await readJSON(targetFile);

	let historyArray = simpleAnalyzeHistory(historyData)

	let historyDataExtra = historyArray.reduce((a, b) => {

		a[Number(b.id)] = b

		return a
	}, {} as Record<string, ISimpleAnalyzeHistoryRow<T>>)

	return outputJSON(outputFile, historyDataExtra, {
		spaces: 2
	})
}
