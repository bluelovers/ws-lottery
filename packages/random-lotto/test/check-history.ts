import { simpleAnalyzeHistory } from '@lazy-lotto/util';
import superlotto638 from '@lazy-lotto/tw-history-data/lib/data/superlotto638.json';

let list = simpleAnalyzeHistory(superlotto638);

console.dir(list.length)

console.dir(list.filter(v => v.maxMatch >= 5))
