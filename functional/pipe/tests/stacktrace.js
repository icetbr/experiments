// shows the problem with lack of tracing
import { pipe, filter, map } from 'ramda';
import _ from 'lodash/fp.js';
import StackTracey from 'stacktracey';
import * as Belt from '@mobily/ts-belt';
import * as Froebel from "froebel";

// process.on ('uncaughtException',  error => {
//     // console.log(new StackTracey (error).withSourceAt(0))
//     console.log(new StackTracey (error).clean().withSources ().asTable ())
// })
// process.on ('unhandledRejection', error => { console.log(new StackTracey (error).withSources ().asTable ()) })

Error.stackTraceLimit = 50;

const gt = a => b => ab > a;
const square = a => a * 2;
const uniq = a => new Set(a);

const op1 = pipe(
    filter(gt(0)),
    map(square),
    uniq,
);

const ramda = () => op1([-1, 2, 2, 3]) // A
// console.log(ramda()) // shows A frame 10

const op2 = _.flow(                     // B
    _.filter(gt(0)),
    _.map(square),
    uniq,
);

const lodash = () => op2([-1, 2, 2, 3]) // A
// console.log(lodash()) // shows A at frame 13

const op3 = Belt.flow(
    Belt.A.filter(gt(0)),
    Belt.A.map(square),
    uniq,
);

const belt = () => op3([-1, 2, 2, 3]) // A
// console.log(belt()) // shows A frame 5

const op4 = Froebel.pipe(
    Belt.A.filter(gt(0)),
    Belt.A.map(square),
    uniq,
);

const froebel = () => op4([-1, 2, 2, 3]) // A
console.log(froebel()) // shows A frame 5

// const gt = a => b => {
//     return 'ddv'
// }


// const x = (a, b) => an * b;
// const y = x('a1', 2);
// console.log(y)

// let i;
// const a = x => y => console.log(c1)
// const b = a(1)
// const c = (x, y) => console.log(c1)
// const calculate = (input, $ = input) => (
//     $ = 1,
//     $ = map(x => x * 2)($),
//     $ = 2
// )
// const d = my => my();
// const e = y => console.log(c1)
// const makeE = x => e();
// // makeE()
// a()()
