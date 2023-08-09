describe('se a apuração já existir no banco e for **recente** ou estiver **bloqueada**, ela é apenas carregada, senão ela é criada', () => {

    describe('gerar uma apuração', () => {

        it('com apuração válida no banco => carrega a apuração', async () => {
            await db(a.validReckon());
            const { loaded } = await generateReckons(query());
            expect(loaded, 1);
        });

        it('com apuração inválida no banco => cria a apuração', async () => {
            await db(a.invalidReckon());
            const { created } = await generateReckons();
            expect(created, 1); // can mock bc create already tested?
        });
    });
});

describe('**funcionário** pode ser **matrícula** no lugar de **id**.', () => {

    describe('gerar uma apuração com matrícula do funcionário e', () => {

        it('com apuração válida no banco => carrega a apuração', async () => {
            await db(a.validReckon({ register: 1 }));
            const { loaded } = await generateReckons(query({ register: 1 }));
            expect(loaded, 1);
        });

        it('com apuração inválida no banco => cria a apuração', async () => {
            await db(a.invalidReckon({ register: 1 }));
            const { created } = await generateReckons({ register: 1 });
            expect(created, 1);
        });
    });
});

/******************************************** */
describe('gerar uma apuração', () => {

    it('com apuração válida no banco => carrega a apuração', async () => {
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
    });

    it('com apuração inválida no banco => cria a apuração', async () => {
        await db(a.invalidReckon());
        const { created } = await generateReckons();
        expect(created, 1); // can mock bc create already tested?
    });
});


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
});

