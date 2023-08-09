set(reckons, 'wasLoaded', true)
forEach(reckons, r => r.wasLoaded = true);
map(reckons, r => ({ ...r, wasLoaded: true }))
map(reckons, set('wasLoaded', true))


// import { map, set, pipe } from '@mobily/ts-belt';
const { flow, N, D, A } = require('@mobily/ts-belt');
const { map } = A;
const { set } = D;

const asyncPipe = (...fns) => x => (fns.reduce(async (y, f) => f(await y), x));

const x = async y => new Promise((resolve, reject) => {
    resolve(y);
});



const z = y => y;

const a = asyncPipe(
    x,
    map(set('c', 3)),
    set('c', 3),
);

(async () => {
    // console.log(await a(1))
    console.log(await a([{a: 1, b: 2 }]))
})();

