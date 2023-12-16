import { run, bench, group, baseline } from 'mitata';

const input = [...Array(100).keys()];

const isOdd = (x) => x % 2 !== 0;
const triple = (x) => x * 3;
const sum = (a, b) => a + b;

const cases = {
    reduceFn: () => input.reduce((total, x) => {
        return isOdd(x) ? sum(total, triple(x)) : total;
    }, 0),

    declarative: () => input
        .filter(isOdd)
        .map(triple)
        .reduce(sum, 0),
}

// bench('noop', () => {});
group('pipe', () => {
    Object.entries(cases).map(([name, fn]) => bench(name, () => fn(input)));
    // bench('reduce', cases.reduceFn);
    // bench('declarative', cases.declarative);
});

await run();
