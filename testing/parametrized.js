describe('apuração é válida se', () => toArray(`

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


describe('apuração é válida se', () => [

    ['scenario'                                             , 'reckon'                                   , 'createdAfter'    , 'expected'],
    ['-----------------------------------------------------', '-----------------------------------------', '----------------', '--------'],
    ['recente: data da última atualização > data desejada'  , { dti: '2017-02-01T01:00'                 }, '2017-02-01T00:59', true      ],
    ['bloqueada'                                            , { dti: '2017-02-01T01:00', blocked: true  }, '2017-02-01T01:01', true      ],
    ['inexistente'                                          , null                                       ,  null             , false     ],
    ['velha (=): data da última atualização = data desejada', { dti: '2017-02-01T01:00'                 }, '2017-02-01T01:00', false     ],
    ['velha (>): data da última atualização > data desejada', { dti: '2017-02-01T01:00'                 }, '2017-02-01T01:01', false     ],
    ['não bloqueada'                                        , { dti: '2017-02-01T01:00', blocked: false }, '2017-02-01T01:01', false     ],

].forEach(({ scenario, reckonWith, createdAfter, expected }) => {
    it(scenario, () => expect(reckonIsValid(aReckon(reckonMod), createdAfter), true))
}));


describe('apuração é válida se', () => {
    const s = (reckon, createdAfter, expected) => expect(reckonIsValid(aReckon(reckon), createdAfter), expected);

                                                               // reckon                                     | createdAfter      | expected
                                                               // ------------------------------------------ | ----------------- | --------
    it('recente: data da última atualização > data desejada'  , s({ dti: '2017-02-01T01:00'                 }, '2017-02-01T00:59', true    ));
    it('bloqueada'                                            , s({ dti: '2017-02-01T01:00', blocked: true  }, '2017-02-01T01:01', true    ));
    it('inexistente',                                           s(null                                       , null              , false   ));
    it('velha (=): data da última atualização = data desejada', s({ dti: '2017-02-01T01:00'                 }, '2017-02-01T01:00', false   ));
    it('velha (>): data da última atualização > data desejada', s({ dti: '2017-02-01T01:00'                 }, '2017-02-01T01:01', false   ));
    it('não bloqueada'                                        , s({ dti: '2017-02-01T01:00', blocked: false }, '2017-02-01T01:01', false   ));
});

describe('apuração é válida se', () => {                       // reckon                                     | createdAfter      | expected
                                                               // ------------------------------------------ | ----------------- | --------
    it('recente: data da última atualização > data desejada'  , s({ dti: '2017-02-01T01:00'                 }, '2017-02-01T00:59', true    ));
    it('bloqueada'                                            , s({ dti: '2017-02-01T01:00', blocked: true  }, '2017-02-01T01:01', true    ));
    it('inexistente',                                           s(null                                       , null              , false   ));
    it('velha (=): data da última atualização = data desejada', s({ dti: '2017-02-01T01:00'                 }, '2017-02-01T01:00', false   ));
    it('velha (>): data da última atualização > data desejada', s({ dti: '2017-02-01T01:00'                 }, '2017-02-01T01:01', false   ));
    it('não bloqueada'                                        , s({ dti: '2017-02-01T01:00', blocked: false }, '2017-02-01T01:01', false   ));

    const s = (reckon, createdAfter, expected) => expect(reckonIsValid(aReckon(reckon), createdAfter), expected);
});


/**
 * helper function
 */

const s = (reckonMod, createdAfter, expected) => expect(reckonIsValid(aReckon(reckonMod), createdAfter), expected);

    // scenario                                               | reckon                                     | createdAfter        | expected
    // ------------------------------------------------------ | ------------------------------------------ | ------------------- | --------
describe('apuração é válida se', () => {
    it('recente: data da última atualização > data desejada'  , s({ dti: '2017-02-01T01:00'                }, '2017-02-01T00:59'), true);
    it('bloqueada'                                            , s({ dti: '2017-02-01T01:00', blocked: true }, '2017-02-01T01:01'), true);
});

describe('apuração não é válida se', () => {
    it('inexistente'                                          , s(null                                       , null              , false));
    it('velha (=): data da última atualização = data desejada', s({ dti: '2017-02-01T01:00'                 }, '2017-02-01T01:00', false));
    it('velha (>): data da última atualização > data desejada', s({ dti: '2017-02-01T01:00'                 }, '2017-02-01T01:01', false));
    it('não bloqueada'                                        , s({ dti: '2017-02-01T01:00', blocked: false }, '2017-02-01T01:01', false));
});



// neste caso a função aceita parametros, se eu estivesse testando um cenario complexo (que nao deveremos ter mais!!) nao ia ficar legal
describe('apuração é válida se', () => {
    const s = expected => (reckon, createdAfter) => expect(reckonIsValid(aReckon(reckon), createdAfter), expected);

    it('recente: data da última atualização > data desejada'  , s(true) ({ dti: '2017-02-01T01:00'                 }, { createdAfter: '2017-02-01T00:59' }));
    it('bloqueada'                                            , s(true) ({ dti: '2017-02-01T01:00', blocked: true  }, { createdAfter: '2017-02-01T01:01' }));
    it('inexistente'                                          , s(false)(null                                       , null                                ));
    it('velha (=): data da última atualização = data desejada', s(false)({ dti: '2017-02-01T01:00'                 }, { createdAfter: '2017-02-01T01:00' }));
    it('velha (>): data da última atualização > data desejada', s(false)({ dti: '2017-02-01T01:00'                 }, { createdAfter: '2017-02-01T01:01' }));
    it('não bloqueada'                                        , s(false)({ dti: '2017-02-01T01:00', blocked: false }, { createdAfter: '2017-02-01T01:01' }));
});

describe('apuração é válida se', () => {
    it('recente: data da última atualização > data desejada'  , () => expect(reckonIsValid(({ dti: '2017-02-01T01:00'                 }, { createdAfter: '2017-02-01T00:59' }), true )));
    it('bloqueada'                                            , () => expect(reckonIsValid(({ dti: '2017-02-01T01:00', blocked: true  }, { createdAfter: '2017-02-01T01:01' }), true )));
    it('inexistente',                                           () => expect(reckonIsValid((null                                       , null                                ), false)));
    it('velha (=): data da última atualização = data desejada', () => expect(reckonIsValid(({ dti: '2017-02-01T01:00'                 }, { createdAfter: '2017-02-01T01:00' }), false)));
    it('velha (>): data da última atualização > data desejada', () => expect(reckonIsValid(({ dti: '2017-02-01T01:00'                 }, { createdAfter: '2017-02-01T01:01' }), false)));
    it('não bloqueada'                                        , () => expect(reckonIsValid(({ dti: '2017-02-01T01:00', blocked: false }, { createdAfter: '2017-02-01T01:01' }), false)));
});

describe('apuração é válida se', (f = reckonIsValid) => {
    it('recente: data da última atualização > data desejada'  , y(f, { dti: '2017-02-01T01:00'                 }, { createdAfter: '2017-02-01T00:59' }));
    it('bloqueada'                                            , y(f, { dti: '2017-02-01T01:00', blocked: true  }, { createdAfter: '2017-02-01T01:01' }));
    it('inexistente',                                           n(f, null                                       , null                                ));
    it('velha (=): data da última atualização = data desejada', n(f, { dti: '2017-02-01T01:00'                 }, { createdAfter: '2017-02-01T01:00' }));
    it('velha (>): data da última atualização > data desejada', n(f, { dti: '2017-02-01T01:00'                 }, { createdAfter: '2017-02-01T01:01' }));
    it('não bloqueada'                                        , n(f, { dti: '2017-02-01T01:00', blocked: false }, { createdAfter: '2017-02-01T01:01' }));
});

describe('apuração é válida se', () => {
    it('recente: data da última atualização > data desejada'  , () =>
        expect(reckonIsValid(aReckon(({ dti: '2017-02-01T01:00'                 }, { createdAfter: '2017-02-01T00:59' }), true ))));

    it('bloqueada'                                            , () =>
        expect(reckonIsValid(aReckon(({ dti: '2017-02-01T01:00', blocked: true  }, { createdAfter: '2017-02-01T01:01' }), true ))));

    it('inexistente',                                           () =>
        expect(reckonIsValid(aReckon((null                                       , null                                ), false))));

    it('velha (=): data da última atualização = data desejada', () =>
        expect(reckonIsValid(aReckon(({ dti: '2017-02-01T01:00'                 }, { createdAfter: '2017-02-01T01:00' }), false))));

    it('velha (>): data da última atualização > data desejada', () =>
        expect(reckonIsValid(aReckon(({ dti: '2017-02-01T01:00'                 }, { createdAfter: '2017-02-01T01:01' }), false))));

    it('não bloqueada'                                        , () =>
        expect(reckonIsValid(aReckon(({ dti: '2017-02-01T01:00', blocked: false }, { createdAfter: '2017-02-01T01:01' }), false))));
});

describe('apuração é válida se', () => {
    const s = expected => (reckon, createdAfter) => expect(reckonIsValid(aReckon(reckon), createdAfter), expected);

    it('recente: data da última atualização > data desejada'  , s(`{ dti: '2017-02-01T01:00' }                 | 2017-02-01T00:59 | true`));
    it('bloqueada'                                            , s(`{ dti: '2017-02-01T01:00', blocked: true }  | 2017-02-01T01:01 | true`));
    it('inexistente'                                          , s(`null                                        | null             | false`));
    it('velha (=): data da última atualização = data desejada', s(`{ dti: '2017-02-01T01:00' }                 | 2017-02-01T01:00 | false`));
    it('velha (>): data da última atualização > data desejada', s(`{ dti: '2017-02-01T01:00' }                 | 2017-02-01T01:01 | false`));
    it('não bloqueada'                                        , s(`{ dti: '2017-02-01T01:00', blocked: false } | 2017-02-01T01:01 | false`));
});

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

describe('apuração não é válida se', () => {

    it('inexistente', () => {
        expect(reckonIsValid(null, null), false);
    });

    it('velha (=): data da última atualização = data desejada', () => {
        expect(reckonIsValid(aReckon({ dti: '2017-02-01T01:00' }), '2017-02-01T01:00'), false)
    });

    it('velha (>): data da última atualização > data desejada', () => {
        expect(reckonIsValid(aReckon({ dti: '2017-02-01T01:00' }), '2017-02-01T01:01'), false)
    });

    it('não bloqueada', () => {
        expect(reckonIsValid(aReckon({ dti: '2017-02-01T01:00', blocked: false }), '2017-02-01T01:01'), false)
    });

});







[["Adam5", "has numbers"], ["Ad@m", "has special characters"]].forEach(([invalidName, reason]) => {
    it(`should reject if the name ${reason}`, function() {})
})

// /home/ddv/projects/ahg/ahpi/test/integration/toleranceTest.js:79
// ```
//     __.forEach([
// ```


/************************ ALTS */

// describe(['apuração é válida se',                              'reckonWith',                                  'createdAfter',     'expected'], () => [

// VARIATION: object instead of array

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

].forEach(({ scenario, reckonWith, createdAfter, expected }) => {
    it(scenario, () => expect(reckonIsValid(aReckon(reckonMod), createdAfter), true))
}));






describe('apuração é válida se', () => toArray(`

    scenario                      | reckon                        | createdAfter        | expected
    ------------------------------| ----------------------------- | ------------------- | --------

    # afastamento: batida antes e depois. Limite NEGATIVO
    0905 1154 1405 1654 2000 2300 | 0905 1200 1400 1654 2000 2300 | 0800 0900 1700 1800 | true

    # 0905 estoura o limite diario, afetando 1154 e 1405 (tolerancia_afastamento = false)
    0905 1154 1405 1654 2000 2300 | 0905 1154 1405 1654 2000 2300 | 0800 0900 1700 1800 | false

    # Limite POSITIVO: 1207 + 1345 atingem o limite diário. 1956 e 2307 são afetados, mas 1207 mantém (ignora_tolerancia_passado = true)
    0905 1154 1405 1654 2000 2259 | 0905 1154 1405 1654 2000 2259 | 0800 0900 1700 1800 | true

    # 1410 estoura o limite de batida, afetando 1410
    0900 1154 1410 1654 2000 2300 | 0900 1200 1410 1654 2000 2300 | 0800 0900 1700 1800 | true

`).forEach(({ scenario, reckon, createdAfter, expected }) => {
    it(scenario, () => expect(reckonIsValid(aReckon(reckon), createdAfter), expected))
}));

describe('apuração é válida se', () => [

    ['scenario'                                      , 'reckon'                                        , 'createdAfter'                  , 'expected'],
    ['----------------------------------------------', '----------------------------------------------', '------------------------------', '--------'],

    // afastamento: batida antes e depois. Limite NEGATIVO
    [['0905', '1154', '1405', '1654', '2000', '2300'], ['0905', '1200', '1400', '1654', '2000', '2300'], ['0800', '0900', '1700', '1800'], [true]    ],

    // 0905 estoura o limite diario, afetando 1154 e 1405(tolerancia_afastamento = false)
    [['0905', '1154', '1405', '1654', '2000', '2300'], ['0905', '1154', '1405', '1654', '2000', '2300'], ['0800', '0900', '1700', '1800'], [false]   ],

    // Limite POSITIVO: 1207 + 1345 atingem o limite diário. 1956 e 2307 são afetados, mas 1207 mantém (ignora_tolerancia_passado = true)
    [['0905', '1154', '1405', '1654', '2000', '2259'], ['0905', '1154', '1405', '1654', '2000', '2259'], ['0800', '0900', '1700', '1800'], [true]    ],

    // 1410 estoura o limite de batida, afetando 1410
    [['0900', '1154', '1410', '1654', '2000', '2300'], ['0900', '1200', '1410', '1654', '2000', '2300'], ['0800', '0900', '1700', '1800'], [true]    ],

].forEach(({ scenario, reckonWith, createdAfter, expected }) => {
    it(scenario, () => expect(reckonIsValid(aReckon(reckonMod), createdAfter), true))
}));









// ALT

describe('apuração é válida se', () => toArray(`

    scenario                                         | reckon                                           | createdAfter                     | expected
    -------------------------------------------------| ------------------------------------------------ | -------------------------------- | --------
    [0905, 1154, 1405, 1654, 2000, 2300] | [0905, 1200, 1400, 1654, 2000, 2300] | [0800, 0900, 1700, 1800] | [true]
    [0905, 1154, 1405, 1654, 2000, 2300] | [0905, 1154, 1405, 1654, 2000, 2300] | [0800, 0900, 1700, 1800] | [false]
    [0905, 1154, 1405, 1654, 2000, 2259] | [0905, 1154, 1405, 1654, 2000, 2259] | [0800, 0900, 1700, 1800] | [true]
    [0900, 1154, 1410, 1654, 2000, 2300] | [0900, 1200, 1410, 1654, 2000, 2300] | [0800, 0900, 1700, 1800] | [true]

    scenario                                         | reckon                                           | createdAfter                     | expected
    -------------------------------------------------| ------------------------------------------------ | -------------------------------- | --------
    ['0905', '1154', '1405', '1654', '2000', '2300'] | ['0905', '1200', '1400', '1654', '2000', '2300'] | ['0800', '0900', '1700', '1800'] | [true]
    ['0905', '1154', '1405', '1654', '2000', '2300'] | ['0905', '1154', '1405', '1654', '2000', '2300'] | ['0800', '0900', '1700', '1800'] | [false]
    ['0905', '1154', '1405', '1654', '2000', '2259'] | ['0905', '1154', '1405', '1654', '2000', '2259'] | ['0800', '0900', '1700', '1800'] | [true]
    ['0900', '1154', '1410', '1654', '2000', '2300'] | ['0900', '1200', '1410', '1654', '2000', '2300'] | ['0800', '0900', '1700', '1800'] | [true]

`).forEach(({ scenario, reckon, createdAfter, expected }) => {
    it(scenario, () => expect(reckonIsValid(aReckon(reckon), createdAfter), expected))
}));
