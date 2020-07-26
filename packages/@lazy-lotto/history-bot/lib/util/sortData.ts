
import { IRecordRow } from '@lazy-lotto/types';
import sortObject from 'sort-object-keys2';
import naturalCompare from '@bluelovers/string-natural-compare';

export function sortData<T extends Record<string, IRecordRow<any>>>(data: T)
{
	data = sortObject(data, {
		sort: naturalCompare,
	});

	return data
}
