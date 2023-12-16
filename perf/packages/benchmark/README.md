Base file to be used by benchmarks.

- asserts results to ensure all cases work the same
- measures memory

## Interesting libs
[mitata][1]: my prefered right now
[tinybench][2]: used by Vitest, inspired by mitata
[benchmark][3]: the most popular
[benny][4]: benchmark.js + minor DX improvement

## Usage
```js
addSuite('Baseline', cases, { params, expected: 7500 });
```

[1]: https://github.com/evanwashere/mitata
[2]: https://github.com/tinylibs/tinybench
[3]: https://github.com/bestiejs/benchmark.js
[4]: https://github.com/caderek/benny

<!-- node_modules/npm-compare/cli.js tynibench benchmark benny -->
