import { join } from "path";
import __root from '../../__root';

export function getHistoryPath(filename: string, options?: {
	root?: string
	subPath?: string
})
{
	let { root = 'tw-history-data', subPath = 'lib/data' } = options ?? {};

	return join(__root, '..', root, subPath, filename.toLowerCase())
}
