import { addSuite } from '../benchmark/benny.js';
import * as Belt from '@mobily/ts-belt';
const { filter, map, reduce } = Belt.A;

const isOdd = (x) => x % 2 !== 0;
const triple = (x) => x * 3;
const sum = (a, b) => a + b;

const cases = {
    imperative: input => {
        let sum = 0;
        for (let i = 0; i < input.length; i++) {
            let x = input[i];
            if (x % 2 !== 0) sum += x * 3;
        }
        return sum;
    },

    imperativeFn: input => {
        let total = 0;
        for (let i = 0; i < input.length; i++) {
            let x = input[i];
            if (isOdd(x)) total = sum(total, triple(x));
        }
        return total;
    },

    reduce: input => input.reduce((total, x) => {
        return x % 2 !== 0 ? total + x * 3 : total;
    }, 0),

    reduceFn: input => input.reduce((total, x) => {
        return isOdd(x) ? sum(total, triple(x)) : total;
    }, 0),

    declarative: input => {
        const s = input.filter(x => x % 2 !== 0)
        const t = s.map(x => x * 3)
        return t.reduce((a, b) => a + b, 0)
    },

    declarativeFn: input => {
        const s = input.filter(isOdd)
        const t = s.map(triple)
        return t.reduce(sum, 0)
    },

    chain: input => input
        .filter(x => x % 2 !== 0)
        .map(x => x * 3)
        .reduce((a, b) => a + b, 0),

    chainFn: input => input
        .filter(isOdd)
        .map(triple)
        .reduce(sum, 0),

    // XXX awaiting benchmark discrepancies to be resolved. See the repo's issues
    // belt: input => {
    //     const filtered = filter(x => x % 2 !== 0)(input);
    //     const tripled = map(x => x * 3)(filtered);
    //     return reduce(0, sum)(tripled);
    // },

    // beltDataFirst: input => {
    //     const filtered = filter(input, x => x % 2 !== 0);
    //     const tripled = map(filtered, x => x * 3);
    //     return reduce(tripled, 0, sum);
    // },

    // beltFn: input => {
    //     const filtered = filter(isOdd)(input);
    //     const tripled = map(triple)(filtered);
    //     return reduce(0, (a, b) => a + b)(tripled);
    // },

    // beltReduce: input => reduce(0, (total, x) => {
    //     return isOdd(x) ? sum(total, triple(x)) : total;
    // })(input),

    // beltComma: _ => (
    //     _ = filter(isOdd)(_),
    //     _ = map(triple)(_),
    //     _ = reduce(0, sum)(_)
    // ),

    // beltComma2: _ => (
    //     _ = filter(_, isOdd),
    //     _ = map(_, triple),
    //     _ = reduce(_, 0, sum)
    // ),
};
// const numbers = [1, 2, 3, 4, 5]; // 2, 4
// const params = [...Array(100)].map((x,i) => i);
const params = [...Array(100).keys()];


addSuite('Baseline', cases, { params, expected: 7500 });
