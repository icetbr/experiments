describe('apuração é válida se', () => a(`

    scenario                                              | reckon                                      | createdAfter     | expected
    ----------------------------------------------------- | ------------------------------------------- | ---------------- | --------
    recente: data da última atualização > data desejada   | { dti: '2017-02-01T01:00' }                 | 2017-02-01T00:59 | true
    bloqueada                                             | { dti: '2017-02-01T01:00', blocked: true }  | 2017-02-01T01:01 | true
    inexistente                                           | null                                        | null             | false
    velha (=): data da última atualização = data desejada | { dti: '2017-02-01T01:00' }                 | 2017-02-01T01:00 | false
    velha (>): data da última atualização > data desejada | { dti: '2017-02-01T01:00' }                 | 2017-02-01T01:01 | false
    não bloqueada                                         | { dti: '2017-02-01T01:00', blocked: false } | 2017-02-01T01:01 | false

`).forEach(({ scenario, reckon, createdAfter, expected }) => {
    it(scenario, () => expect(reckonIsValid(aReckon(reckon), createdAfter), expected))
}));

describe('apuração é válida se', () => a(`

    scenario                                              | reckon                                       | createdAfter      | expected
                                                          |                                              |                   |
    recente: data da última atualização > data desejada   | { dti: '2017-02-01T01:00' }                  | 2017-02-01T00:59  | true
    bloqueada                                             | { dti: '2017-02-01T01:00', blocked: true }   | 2017-02-01T01:01  | true
    inexistente                                           | null                                         | null              | false
    velha (=): data da última atualização = data desejada | { dti: '2017-02-01T01:00' }                  | 2017-02-01T01:00  | false
    velha (>): data da última atualização > data desejada | { dti: '2017-02-01T01:00' }                  | 2017-02-01T01:01  | false
    não bloqueada                                         | { dti: '2017-02-01T01:00', blocked: false }  | 2017-02-01T01:01  | false

`).forEach(({ scenario, reckon, createdAfter, expected }) => {
    it(scenario, () => expect(reckonIsValid(aReckon(reckon), createdAfter), expected))
}));


// describe(['apuração é válida se',                              'reckonWith',                                  'createdAfter',     'expected'], () => [
describe('apuração é válida se', () => [

    ['recente: data da última atualização > data desejada'   , { dti: '2017-02-01T01:00' },                   '2017-02-01T00:59',     true  ],
    ['bloqueada'                                             , { dti: '2017-02-01T01:00', blocked: true },    '2017-02-01T01:01',     true  ],
    ['inexistente'                                           , null                       ,                    null,                  false ],
    ['velha (=): data da última atualização = data desejada' , { dti: '2017-02-01T01:00' },                   '2017-02-01T01:00',     false ],
    ['velha (>): data da última atualização > data desejada' , { dti: '2017-02-01T01:00' },                   '2017-02-01T01:01',     false ],
    ['não bloqueada'                                         , { dti: '2017-02-01T01:00', blocked: false },   '2017-02-01T01:01',     false ],

].forEach(({ scenario                                        , reckonWith,                                     createdAfter,          expected }) => {
    it(scenario, () => expect(reckonIsValid(aReckon(reckonMod), createdAfter), true))
}));

describe('apuração é válida se', () => [
    ['recente: data da última atualização > data desejada',
        { dti: '2017-02-01T01:00' }, '2017-02-01T00:59', true],

    ['bloqueada',
        { dti: '2017-02-01T01:00', blocked: true }, '2017-02-01T01:01', true],

    ['inexistente',
        null, null, false],

    ['velha (=): data da última atualização = data desejada',
        { dti: '2017-02-01T01:00' }, '2017-02-01T01:00', false],

    ['velha (>): data da última atualização > data desejada',
        { dti: '2017-02-01T01:00' }, '2017-02-01T01:01', false],

    ['não bloqueada',
        { dti: '2017-02-01T01:00', blocked: false }, '2017-02-01T01:01', false],

].forEach(({ scenario                                        , reckonWith,                                     createdAfter,          expected }) => {
    it(scenario, () => expect(reckonIsValid(aReckon(reckonMod), createdAfter), true))
}));

/**
 * traditional
 */
describe('apuração é válida se', () => {

    it('recente: data da última atualização > data desejada', () => {
        expect(reckonIsValid(aReckon({ dti: '2017-02-01T01:00' }), '2017-02-01T00:59'), true)
    });

    it('bloqueada', () => {
        expect(reckonIsValid(aReckon({ dti: '2017-02-01T01:00', blocked: true }), '2017-02-01T01:01'), true)
    });

});

/**
 * helper function
 */

const s = (reckonMod, createdAfter) => reckonIsValid(aReckon(reckonMod), createdAfter);
describe('apuração é válida se', () => {
    it('recente: data da última atualização > data desejada', () => s(true)({ dti: '2017-02-01T01:00' }, '2017-02-01T00:59'), true);
    it('bloqueada',                                           () => s({ dti: '2017-02-01T01:00', blocked: true }, '2017-02-01T01:01'), true);
});

describe('apuração não é válida se', () => {
    it('inexistente',                                           () => s(null), false);
    it('velha (=): data da última atualização = data desejada', () => s({ dti: '2017-02-01T01:00' }, '2017-02-01T01:00'), false);
    it('velha (>): data da última atualização > data desejada', () => s({ dti: '2017-02-01T01:00' }, '2017-02-01T01:01'), false);
    it('não bloqueada',                                         () => s({ dti: '2017-02-01T01:00', blocked: false }, '2017-02-01T01:01'), false);
});


const s1 = (reckonMod, createdAfter) => reckonIsValid(aReckon(reckonMod), createdAfter);
describe('apuração é válida se', () => {
    y('recente: data da última atualização > data desejada', s(true)({ dti: '2017-02-01T01:00' }, '2017-02-01T00:59'), true);
    y('bloqueada',                                           s({ dti: '2017-02-01T01:00', blocked: true }, '2017-02-01T01:01'), true);
    n('inexistente',                                           s(null), false);
    n('velha (=): data da última atualização = data desejada', s({ dti: '2017-02-01T01:00' }, '2017-02-01T01:00'), false);
    n('velha (>): data da última atualização > data desejada', s({ dti: '2017-02-01T01:00' }, '2017-02-01T01:01'), false);
    n('não bloqueada',                                         s({ dti: '2017-02-01T01:00', blocked: false }, '2017-02-01T01:01'), false);
});


[["Adam5", "has numbers"], ["Ad@m", "has special characters"]].forEach(([invalidName, reason]) => {
    it(`should reject if the name ${reason}`, function() {})
})

// /home/ddv/projects/ahg/ahpi/test/integration/toleranceTest.js:79
// ```
//     __.forEach([
// ```
