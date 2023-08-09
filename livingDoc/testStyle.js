describe('para gerar uma apuração é preciso passar uma **empresa**, **funcionário** e **período** para o endpoint `/reckons`', () => {

    it('chamar o endpoint `/reckons` com `empresa`, `funcionário` e `período` => gera uma apuração', async () => {
        await aBareMinimumDbWith(
            a.employee({ _id: '59667b5fbca8131700000005' }),
            a.company({ code: 'a000001' }),
        );

        const actual = await fetch('/a000001/reckons?employeeId=59667b5fbca8131700000005&start=2017-02');

        expect(actual, a.reckonsResult({
            company: 'a000001',
            employee: { _id: '59667b5fbca8131700000005' },
            period: '201702',
        }));

        expect(actual, a.reckonsResult(
            {
                company: 'a000001',
                employee: { _id: '59667b5fbca8131700000005' },
                period: '201702',
            }
        ));

        expect(
            await fetch('/a000001/reckons?employeeId=59667b5fbca8131700000005&start=2017-02'),
            a.reckonsResult({
                company: 'a000001',
                employee: { _id: '59667b5fbca8131700000005' },
                period: '201702',
            }),
        );

        expect(
            await fetch('/a000001/reckons?employeeId=59667b5fbca8131700000005&start=2017-02'))
            .to.equal(
                a.reckonsResult({
                    company: 'a000001',
                    employee: { _id: '59667b5fbca8131700000005' },
                    period: '201702',
                }),
            );
    });

    describe('/reckons', async () => {
        assert({
            given: 'uma **empresa**, **funcionário** e **período**',
            should: 'gera uma apuração',

            db: await populate([
                a.employee({ _id: '59667b5fbca8131700000005' }),
                a.company({ code: 'a000001' }),
            ]),

            actual: await fetch('/a000001/reckons?employeeId=59667b5fbca8131700000005&start=2017-02'),

            expected: a.reckonsResult({
                company: 'a000001',
                employee: { _id: '59667b5fbca8131700000005' },
                period: '201702',
            }),
        });
    });

    // spaced
    describe('/reckons', async () => {
        assert({
            given: 'uma **empresa**, **funcionário** e **período**',
            should: 'gera uma apuração',

            db: await aBareMinimumWith({
                employee: { _id: '59667b5fbca8131700000005' },
                company: { code: 'a000001' },
            }),

            actual: await fetch('/a000001/reckons?employeeId=59667b5fbca8131700000005&start=2017-02'),

            expected: a.reckonsResult({
                company: 'a000001',
                employee: { _id: '59667b5fbca8131700000005' },
                period: '201702',
            }),
        });
    });

    // modo descritivo
    describe('/reckons', async () => {
        assert({
            given: 'uma **empresa**, **funcionário** e **período**',
            should: 'gera uma apuração',
            db: aBareMinimumWith({
                employee: [{ _id: '59667b5fbca8131700000005' }],
            }),
            actual: () => await fetch('/a000001/reckons?employeeId=59667b5fbca8131700000005&start=2017-02'),
            expected: a.reckonsResult({
                company: 'a000001',
                employee: { _id: '59667b5fbca8131700000005' },
                period: '201702',
            }),
        });
    });

    describe('/reckons', async () => {
        assert({
            given: 'uma **empresa**, **funcionário** e **período**',
            should: 'gera uma apuração',
            db: [a.employee({ _id: '59667b5fbca8131700000005' })],
            actual: await fetch('/a000001/reckons?employeeId=59667b5fbca8131700000005&start=2017-02'),
            expected: a.reckonsResult(),
        });
    });

    describe('/reckons', async () => {
        it('com **empresa**, **funcionário** e **período** gera uma apuração', async () => {
            await db(a.employee({ _id: '59667b5fbca8131700000005' }));
            const { result } = await fetch('/a000001/reckons?employeeId=59667b5fbca8131700000005&start=2017-02');
            expected(result, a.reckonsResult());
        })
    });



    it('chamar o endpoint `/reckons` com **empresa**, **funcionário** e **período** gera uma apuração', async () => {
        // await db.with(a.bareMinimum(), { reckons: [a.reckon({ blocked: true, register: 1 })]});
        // await db.with(a.bareMinimum(), { reckons: [a.validReckon({ register: 1 })]}); // use type to remove need for table name
        await db.with(a.bareMinimum(), a.validReckon({ register: 1 }));

        await db.with(
            a.bareMinimum(),
            a.validReckon({ register: 1 })
        );

        await aBareMinimumDb().with(a.validReckon({ register: 1 }));

        await aBareMinimumDbWith(a.validReckon({ register: 1 }));

        await a_bare_minimum_db_with(a.validReckon({ register: 1 }));

        await 'a bare minimum db with'(a.validReckon({ register: 1 }));

        await aBareMinimumDb(a.validReckon({ register: 1 }));

        await aBareMinimumDbWith({
            reckon: a.validReckon({ register: 1 }),
            employee: anEmployee({ register: '1' }),
            company: aCompany({ cod: 'a000001' }),
        });

        await aBareMinimumDbWith(
            a.validReckon({ register: 1 }),
            an.employee({ register: '1' }),
            a.company({ cod: 'a000001' }),
        );

        const response = await fetch('/a000001/reckons?employeeId=59667b5fbca8131700000005&start=2017-02');
        expect(response.result, a.reckonsResult());
        expect(response.result).to.equal(a.reckonsResult());
    });
});