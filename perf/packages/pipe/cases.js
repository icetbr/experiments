import { addSuite } from '../benchmark/benny.js';
import * as Belt from '@mobily/ts-belt';
import t from 'transducers-js';
import * as Lazy from 'lazy-collections'
import C from '@arrows/composition';
import * as R from 'ramda';
import _ from 'lodash/fp.js';
import Ppipe from 'ppipe';
import * as IterOps from 'iter-ops';

const { filter, map, reduce } = Belt.A;

const nativePipe = (...fns) => (arg) => fns.reduce((arg, fn) => fn(arg), arg);

// HELPERS
const isOdd = (x) => x % 2 !== 0;
const triple = (x) => x * 3;
const sum = (a, b) => a + b;

var xf = t.comp(t.filter(isOdd), t.map(triple));

const cases = {
    imperative: input => {
        let total = 0;
        for (let i = 0; i < input.length; i++) {
            let x = input[i];
            if (isOdd(x)) total = sum(total, triple(x));
        }
        return total;
    },

    declarative: input => input
        .filter(isOdd)
        .map(triple)
        .reduce(sum, 0),

    reduceFn: input => input.reduce((total, x) => {
        return isOdd(x) ? sum(total, triple(x)) : total;
    }, 0),

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

    ramda: R.pipe(
        filter(isOdd),
        map(triple),
        reduce(0, sum),
    ),

    '@arrows': C.pipe(
        filter(isOdd),
        map(triple),
        reduce(0, sum),
    ),

    'lodash/fp': _.pipe(
        filter(isOdd),
        map(triple),
        reduce(0, sum),
    ),

    ppipe: input => Ppipe(input)
        .pipe(filter(isOdd))
        .pipe(map(triple))
        .pipe(reduce(0, sum))(),

    iterOps: input => {
        const i = IterOps.pipe(
            input,
            IterOps.filter(isOdd),
            IterOps.map(triple),
            IterOps.reduce(sum, 0),
            // IterOps.toArray(),
        )
        return i.first;
    },

    lazy: Lazy.pipe(
        Lazy.filter(isOdd),
        Lazy.map(triple),
        Lazy.reduce(sum, 0),
    ),

    transducersJs: (input) => {
        return t.transduce(xf, sum, 0, input);
    },
};

const params = [...Array(100).keys()];

// await addSuite('Pipe', cases, { params, expected: 7500 });
addSuite('Pipe', cases, { params, expected: 7500 });
