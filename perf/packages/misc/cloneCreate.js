import { addSuite } from '../benchmark/mitata.js';

const clone = { a: 1, b: 2, c: 3 };
// const create = d => ({ a: 1, b: 2, c: 3, d });

const cases = {
    clone: d => ({ ...clone, d }),
    create: d => ({ a: 1, b: 2, c: 3, d }),
}

console.log(cases.clone({d: 4}))

addSuite('cloneCreate', cases, { params: { d: 4 } });
