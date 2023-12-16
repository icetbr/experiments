import { addSuite } from '../benchmark/mitata.js';

const cases = {
    map: input => input.map(x => x * 2),

    for: input => {
      let results = [];
      for(let i = 0; i < input.length; i++) {
        results.push(i * 2)
      }
      return results;
    },

    forEach: input => {
      let results = [];
      input.forEach(i => {
        results.push(i * 2);
      })
      return results;
    },
}

const params = [...Array(100).keys()];

addSuite('Loop', cases, { params });
