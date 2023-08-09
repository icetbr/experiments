const { add, suite } = require('./benny');
const fastDeepEqual_original = require('../src/fastDeepEqual_original.js');
const fastDeepEqual_simple = require('../src/fastDeepEqual_simple.js');
const fastDeepEqual_modern = require('../src/fastDeepEqual_modern.js');
const fastDeepEqual_modern2 = require('../src/fastDeepEqual_modern2.js');
const assert = require('assert');

const x = () => {
const a = [{
    data: {
        post: {
            id: 'be01e7669cbd',
            responsesCount: Math.random(),
            threadedPostResponses: {
                pagingInfo: { next: { to: '1.1520096666424:538368ee7758' } },
                posts: [{
                    id: 'f6070b0288c7',
                    responsesCount: 0,
                    creator: { name: 'Kristian Mandrup' },
                    clapCount: 11,
                    createdAt: 1521128384454,
                    content: {
                        bodyModel: {
                            paragraphs: [{
                                id: '4acf88645d08_0', name: '00fd', type: 'P', markups: [], text: 'any'
                            }],
                        },
                    },
                    threadedPostResponses: { pagingInfo: { next: null }, posts: [] },
                }],
            },
        },
    },
}];

const b = JSON.parse(JSON.stringify(a));
return { a, b }
}

// assert.equal(fastDeepEqual_original(a, b), true);
// assert.equal(fastDeepEqual_simple(a, b), true);
// assert.equal(fastDeepEqual_modern(a, b), true);
// assert.equal(fastDeepEqual_modern2(a, b), true);

suite(
    'Deep Equals',

    // add('original', () => fastDeepEqual_original(a, b)),
    // add('simple', () => fastDeepEqual_simple(a, b)),

    // add('modern', () => fastDeepEqual_modern2(a, b)),
    // add('modern', () => fastDeepEqual_modern(a, b)),
    add('modern', () => {
        const ret = x();
        fastDeepEqual_modern(ret.a, ret.b);
    }),
    add('modern 2', () => {
        const ret = x();
        fastDeepEqual_modern2(ret.a, ret.b);
    }),
);
