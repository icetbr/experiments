const { describe, it, expect } = require('@ah/test-utils');
const { toJoiSchema, fullExample, requiredExample, dbFullExample, toDb, fromDb, swapKeyWithColumn } = require('../Schema.js');
const { object, string, date, boolean, number, array } = require('@ah/crud/Joi');
const { stringToBoolean, stringToNumber } = require('@ah/crud/Mapper');

const EMPTY = '&#8203';
const i = { db: 0, example: 1, validation: 2, label: 3, description: 4, devNotes: 5 };

const eqSchema = (actual, expected) => eq(actual.describe(), expected.describe());

// describe(`SchemaTable: one source of truth to rule them all
describe('SchemaTable: a structure to keep all your model related rules in one place', () => {

    const schemaTable = {
        aString : ['dados.pis'                   , string , '5312291715[x]'            , '05312291715[x]' , toPis           ],
        aDate   : ['dados.dt_admissao'           , date   , '2017-02-01'               , ''               , anyToString     ], // requiredOnSave
        aBoolean: ['dados.permitido_coleta_ponto', boolean, true                       , '1'              , stringToBoolean ],
    };

    describe('Use it to generate', () => {
        it('joiSchema: for data validation', () => eqSchema({
            actual: toJoiSchema(i, schemaTable),
            expected: Joi.object({
                motivo        : string.required().example('Quebrou o pé 5')  .description('A causa do afastamento').note('chave estrangeira'),
                inicio        : date.required()  .example('2019-01-21T09:01').description(EMPTY)                   .note(EMPTY),
                padrao_escala : boolean          .example(true)              .description('Padrão')                .note(EMPTY),
            }),
        }));


        describe('examples: for test data and documentation', () => {
            describe('fullExample', () => {
                it('maps a schemaInfo to an example', () => {});
                it('replaces [x] with given value', () => {});
            });

            describe('dbFullExample', () => fullExampleTests())
            describe('requiredExample', () => requiredExampleTests())
    });

    describe('toDb/fromDb mappers', () => {}
});

    describe('swapKeyWithColumn', () => {
        it('swaps key with column', () => {
            expect(
                swapKeyWithColumn({
                    reason   : ['dados.motivo', 1, 2],
                    salary   : ['dados.salario', 3, 4],
                }, 0)
            ).toEqual({
                'dados.motivo'   : ['reason', 1, 2],
                'dados.salario'  : ['salary', 3, 4],
            });
        });
    });

    describe('dbFullExample', () => {
        const i2 = { db: 0, validation: 1, example: 2, dbExample: 3, mapper: 4 };

        it('maps a schemaInfo to an db example', () => {
            expect(
                dbFullExample(i2, swapKeyWithColumn({
                    reason: ['motivo', , 'Quebrou o pé [x]'    , 'Quebrou o pé DbVersion [x]' ],
                    start : ['inicio', , '2019-01-21T09:01', '21/12/2023'             ],
                }, 0))(3)
            ).toEqual(
                {
                    motivo: 'Quebrou o pé DbVersion 3',
                    inicio: '21/12/2023',
                }
            );
        });

        it('inherits example when nil', () => {
            expect(
                dbFullExample(i2, swapKeyWithColumn({
                    reason    : ['motivo'     , , 'Quebrou o pé [x]',       ],
                    start     : ['inicio'     , , '2019-01-21T09:01', ''    ],
                    isBlocked : ['ehBloqueado', , true              , false ],
                }, 0))(3)
            ).toEqual(
                {
                    motivo: 'Quebrou o pé 3',
                    inicio: '',
                    ehBloqueado: false
                }
            );
        });
    });

    describe('toDb/fromDb', () => {
        const i2 = { db: 0, validation: 1, example: 2, dbExample: 3, mapper: 4 };

        it('maps to db format', () => {
            expect(
                toDb(i2, {
                    'history.0.value'  : ['historico.0.valor'                    ], // array
                    'history.0.date'   : ['historico.0.data'                     ],
                    // locations          : ['localizacao'                          ],
                    reason             : ['dados.motivo'  , , , ,                ], // object
                    'financial.salary' : ['dados.salario' , , , , stringToNumber ],
                    isBlocked          : ['ehBloqueado'   , , , , stringToBoolean],
                    notUsed            : ['naoUsado'      , , , , stringToBoolean],
                    unchanged          : [''              , , , , stringToBoolean],
                })({
                    history: [{ value: 1, date: '2017-02-01' }, { value: 2, date: '2017-03-01' }],
                    // locations: ['location1'],
                    reason   : 'Teste',
                    financial: { salary  : 100 },
                    isBlocked: false,
                    unchanged: 'keeeps same name',
                })
            ).toEqual({
                historico: [{ valor: 1, data: '2017-02-01' }, { valor: 2, data: '2017-03-01' }],
                // localizacao: ['location1'],
                dados: {
                    motivo   : 'Teste',
                    salario  : '100',
                },
                ehBloqueado: '0',
                unchanged: 'keeeps same name',
            });
        });

        it('maps from db format', () => {
            expect(
                fromDb(i2, swapKeyWithColumn({
                    'history.0.value'  : ['historico.0.valor'                    ],
                    'history.0.date'   : ['historico.0.data'                     ],
                    // locations          : ['localizacao'                          ],
                    reason             : ['dados.motivo'  , , , ,                ],
                    'financial.salary' : ['dados.salario' , , , , stringToNumber ],
                    isBlocked          : ['ehBloqueado'   , , , , stringToBoolean],
                    notUsed            : ['naoUsado'      , , , , stringToBoolean],
                }, 0))({
                    historico: [{ valor: 1, data: '2017-02-01' }, { valor: 2, data: '2017-03-01' }],
                    // localizacao: ['location1'],
                    dados: {
                        motivo   : 'Teste',
                        salario  : '100',
                    },
                    ehBloqueado: '0',
                })
            ).toEqual(
                {
                    history: [{ value: 1, date: '2017-02-01' }, { value: 2, date: '2017-03-01' }],
                    // locations: ['location1'],
                    reason   : 'Teste',
                    financial: { salary  : 100 },
                    isBlocked: false,
                }
            );
        });
    });
});

