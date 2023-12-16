import { run, bench, group, baseline } from 'mitata';

const input = [...Array(100).keys()];

const isOdd = (x) => x % 2 !== 0;
const triple = (x) => x * 3;
const sum = (a, b) => a + b;

// bench('noop', () => {});
bench('reduce', () =>
    input.reduce((total, x) => {
        return isOdd(x) ? sum(total, triple(x)) : total;
    }, 0)
);

bench('declarative', () =>
    input
    .filter(isOdd)
    .map(triple)
    .reduce(sum, 0)
);

await run();
