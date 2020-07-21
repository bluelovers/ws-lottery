# README.md

   generator random lotto 樂透獎號生成器

## install

```bash
yarn add random-lotto
yarn-tool add random-lotto
yt add random-lotto
```

```ts
import { randomLottoGenerator } from 'random-lotto';
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
```

```
[ [ 35, 33, 10, 34, 20, 26 ], 4 ]
[ [ 15, 2, 25, 34, 14, 7 ], 7 ]
[ [ 1, 24, 15, 28, 32, 20 ], 2 ]
[ [ 19, 20, 2, 33, 13, 5 ], 7 ]
[ [ 7, 25, 22, 1, 30, 20 ], 3 ]
[ [ 21, 38, 6, 36, 10, 35 ], 2 ]
[ [ 8, 38, 11, 25, 20, 6 ], 6 ]
[ [ 27, 36, 17, 9, 20, 24 ], 8 ]
[ [ 35, 24, 5, 3, 33, 29 ], 7 ]
[ [ 37, 26, 7, 20, 23, 19 ], 6 ]
```
