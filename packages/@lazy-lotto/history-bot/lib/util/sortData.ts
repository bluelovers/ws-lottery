
import { IRecordRow } from '@lazy-lotto/types/index';
import sortObject from 'sort-object-keys2/index';
import naturalCompare from '@bluelovers/string-natural-compare/index';

export function sortData<T extends Record<string, IRecordRow<any[]>>>(data: T)
{
	data = sortObject(data, {
		sort: naturalCompare,
	});

	return data
}
