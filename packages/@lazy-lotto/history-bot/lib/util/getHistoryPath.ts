import { join } from "path";
import __root from '../../__root';

export function getHistoryPath(filename: string, root = 'tw-history-data')
{
	return join(__root, '..', root, 'lib/data', filename.toLowerCase())
}
