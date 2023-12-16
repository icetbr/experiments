// import { addSuite } from '../benchmark/benny.js';
import { addSuite } from '../benchmark/mitata.js';
import * as Belt from '@mobily/ts-belt';

const { filter, map, reduce } = Belt.A;
const nativePipe = (...fns) => (arg) => fns.reduce((arg, fn) => fn(arg), arg);

// HELPERS
const isOdd = (x) => x % 2 !== 0;
const triple = (x) => x * 3;
const sum = (a, b) => a + b;

const cases = {
    imperative: input => {
        let total = 0;
        for (let i = 0; i < input.length; i++) {
            let x = input[i];
            if (isOdd(x)) total = sum(total, triple(x));
        }
        return total;
    },

    reduceFn: input => input.reduce((total, x) => {
        return isOdd(x) ? sum(total, triple(x)) : total;
    }, 0),

    declarative: input => input
        .filter(isOdd)
        .map(triple)
        .reduce(sum, 0),

    belt: Belt.flow(
        filter(isOdd),
        map(triple),
        reduce(0, sum),
    ),

    nativePipe: nativePipe(
        filter(isOdd),
        map(triple),
        reduce(0, sum),
    ),
};

const params = [...Array(100).keys()];

await addSuite('Pipe', cases, { params, expected: 7500 });
// addSuite('Pipe', cases, { params, expected: 7500 });
