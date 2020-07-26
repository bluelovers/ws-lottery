import { IRecordRow } from '@lazy-lotto/types';

export function addRow<R extends IRecordRow<any>>(id: string | number, data: Record<string, R>, row: Partial<R>)
{
	let old =	getRow(id, data);

	let result = {
		...old,
		...row,
	}

	data[Number(id)] = result as R;

	return result
}

export function getRow<T extends Record<string, IRecordRow<any>>>(id: string | number, data: T)
{
	return data[Number(id)]
}
