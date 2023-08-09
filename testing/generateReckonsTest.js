'use strict';

const { describe, it, fb, r, b, u, e, r1, r1a, it1, expect } = require('../allLite');
const generateReckons = require('reckonLite/generateReckons');

const generateReckons1 = () => generateReckons(b.aValidatedReckonQuery());
// pensando DI rejection ou parametrized?g
describe('Geração de apurações', () => {

    // ideal / tape
    describe('sem nada cadastrado', () => {
        await r.populate(fb.minimum());
        const response = await generateReckons1();

        it('cria uma apuração vazia',                              async () => expect(await db.find().to.equal(b.aMinimumReckon())));
        it('retorna a apuração criada com uma estrutura mínima',   async () => expect(response).to.equal(b.aMinimumReckon()));
    }),

    // ideal / tape B
    describe('sem nada cadastrado', () => {
        await r.populate(fb.minimum())
        const response = await generateReckons1();

        it('cria uma apuração vazia',                            await db.find()).to.equal(b.aMinimumReckon());
        it('retorna a apuração criada com uma estrutura mínima', response).to.equal(b.aMinimumReckon());
    }),

    // common / mocha
    describe('sem nada cadastrado', () => {
        let response;

        before(async () => {
            await r.populate(fb.minimum());
            response = await generateReckons1();
        });

        it('cria uma apuração vazia',                              async () => expect(await db.find().to.equal(b.aMinimumReckon())));
        it('retorna a apuração criada com uma estrutura mínima',   async () => expect(response).to.equal(b.aMinimumReckon()));
    }),

    describe('sem nada cadastrado', () => {
        const fixture = memoize(async () => {
            await r.populate(fb.minimum());
            return { response: await generateReckons1() };
        });

        it('cria uma apuração vazia', async () => {
            await fixture();
            expect(await db.find().to.equal(b.aMinimumReckon()));
        });

        it('retorna a apuração criada com uma estrutura mínima', async () => {
            const { response } = await fixture();
            expect(response).to.equal(b.aMinimumReckon())
        });
    }),

        // describe('sem nada cadastrado', () => {
        //     it('cria uma apuração vazia', async () => {
        //     it('retorna a apuração criada com uma estrutura mínima', async () => { vou ter o metodo toMinimumStructure, que recebe uma apuracao, posso fazer teste de unidade nisso!!!!
        //     it('cria e retorna uma apuração vazia com uma estrutura mínima', async () => {
        //     it('cria e retorna uma apuração vazia com uma estrutura mínima', async () => {
        //         await r.populate(fb.minimum());
        //         const result = await generateReckons1();
        //         retorna estr minima de rest, salva estr minima de banco
        //         // e.expectReckon(response, b.aReckonResult());
        //         // e.expectReckon(result, b.aMinimumReckon());
        //         expect(result, b.aMinimumReckon());
        //     });
        // }),

        describe('**cria** e retorna a apuração se', () => {
            it('ela não existir', async () => {
                await r.populate(fb.minimum());
                const response = await generateReckons1();
                // e.expectReckon(response, b.aReckonResult());
                e.expectReckon(response.result, b.aMinimumReckon());
            });
            it('existir mas for velha', () => { });
            it('existir, for recente mas não bloqueada', () => { });
        });

    // describe('retorna apuração **criada** se não encontrar umaela for inválida', () => {
    //     r.populate(fb.minimum());
    //     const response = await generateReckons1();
    //     // e.expectReckon(response, b.aReckonResult());
    //     e.expectReckon(response.result, b.aMinimumReckon());
    // });

    // describe('retorna apuração **carregada** se ela for válida', () => {
    //     r.populate(fb.minimum());
    //     const response = await generateReckons1();
    //     // e.expectReckon(response, b.aReckonResult());
    //     e.expectReckon(response.result, b.aMinimumReckon());
    // });


    // describe('**carrega** e retorna a apuração do banco se ela já existir e', () => {
    //     it('for recente', () => { });
    //     it('estiver bloqueada', () => { });
    // });

    const testt = () => {
        addMeta(create())
    };

});

const generateReckons1 = () => generateReckons(b.aValidatedReckonQuery());

_('Geração de apurações', () => {

    __('sem nada cadastrado', async is => {
        await timeout(10);

        ___('cria uma apuração vazia',
            true,
            true
        );
        ___('retorna a apuração criada com uma estrutura mínima',
            true,
            true
        );
    });
})

x('Geração de apurações', () => {

    x('sem nada cadastrado', async is => {
        await timeout(10);

        o('cria uma apuração vazia', true, true);
        o('retorna a apuração criada com uma estrutura mínima', true, true );
    });
})

// alt syntax: break title and expectation messages into x-o
    x('com o mínimo cadastrado', async o => {
        await populate(bareMinimum());
        const response = await createReckons(aReckonQuery());
        o('cria uma apuração vazia', await savedReckons(), [b.anEmptyReckon()]); // explicar o que é emptyReckon com links / docs in place
        // o('retorna a apuração criada com uma estrutura mínima', response,             b.aMinimumReckon());
        o('adiciona metadados', response, b.anEmptyReckon()); // TODO este expect nao é relevante
        // expect(response.result.data[0]).to.equal(b.aReckonsResult());
    });