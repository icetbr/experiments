import { addSuite } from '../benchmark/mitata.js';

const cases = {
    equal: input => input === 'rotten green tomatoes',

    startsWith1: input => input.startsWith('rotten'),
    startsWith2: input => input.startsWith('rotten green'),
    startsWith3: input => input.startsWith('rotten green tomatoes'),

    regex1: input => /^rotten/.test(input),
    regex2: input => /^rotten green/.test(input),
    regex3: input => /^rotten green tomatoes/.test(input),

}

addSuite('equalStartsWithRegex', cases, { params: '2rotten green tomatoes' });
