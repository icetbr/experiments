it('existir mas for velha', async () => {
    const savedReckon = anEmptySavedReckon();
    savedReckon.dti = new Date("2017-02-01T10:04");
    const populated = bareMinimum();
    populated.reckons = [savedReckon];
    await populate(populated);

    const query = b.aReckonQuery();
    query.createdAfter = '2017-02-01T10:05';
    const response = await generateReckons(query);

    // e.expectReckon(response.result, b.anEmptyReckon());
    expect(response).to.equal(b.anEmptyReckon());
});

test('cria apuração se mais velha que createdAfter', async () => {
    f.dummyReckons = getDummyReckons();
    f.dummyReckons[1].dti = new Date("2017-02-01T10:04");

    f.callback = prepareDummyReckons;
    f.urlParams = "&createdAfter=2017-02-01T10:05";
    f.expectedReckons = [`59667b5fbca8131700000005_201702_created`];
    await fb.execute(f, verify);
});

it('existir mas for velha', async () => {
    await populate({
        ...bareMinimum(),

        reckons: [
            {
                ...anEmptySavedReckon(),
                dti: new Date("2017-02-01T10:04"),
            }
        ]
    });
});

it('existir mas for velha', async () => {
    // today: beforeEach + executer pattern
    f.reckons = aReckon();

    // ALT 1
    const bareMinimum = fn => populate(fn({
    }));

    const db = reckon => bareMinimum({ reckons: [reckon] });


    db(aReckon());

    bareMinimum(f => {
        f.reckons = aReckon();
    })

    // ALT 2
    const bareMinimum = () => ({
    });

    const f = bareMinimum();
    f.reckons = aReckon();
    populate(f);


    // ALT 3
    f.reckons = aReckon();
    populate(f).then(() => generateReckons());

    run(f).then(() => generateReckons());
    run(f, () => generateReckons());








    await populate({ ...bareMinimum(), reckons: [{ ...anEmptySavedReckon(), dti: new Date("2017-02-01T10:04") }] });
    await populate().bareMinimum().withAReckon().with({ dti: new Date("2017-02-01T10:04") })
    await db.bareMinimum().withAReckon({ dti: new Date("2017-02-01T10:04") });
    await db.bareMinimum({ ...aReckon(), dti: new Date("2017-02-01T10:04") });
    await db.bareMinimum({ reckon: { dti: new Date("2017-02-01T10:04") } })
    await db.bareMinimum({ reckons: [aReckon({ dti: new Date('2017-02-01T01:00') }) ]});
    await db(aReckon({ dti: new Date('2017-02-01T01:00') }));


    await db({ reckons: [aReckon({ dti: new Date('2017-02-01T01:00') })] });
    await db(aReckon({ dti: new Date('2017-02-01T01:00') }));

    bareMinimum(
        // pensando: como quero customizar isto?
        // company: 1
        // schedule
    )



    const f = bareMinimum();
    f.reckons = aReckon();
    populate(f);

    db(aReckon());


    populate({
      company.dados = 1,
    });

    bareMinimum(f => {
        f.reckons = aReckon();
    })



    const db = reckon => bareMinimum({ reckons: [reckon] });

    bareMinimum({ reckons: aReckon() });
    bareMinimum({ reckons: aReckon() });
    db({ reckons: aReckon() });
    db(aReckon());

    bareMinimum(f)

    const f = bareMinimum({ reckons: aReckon() });
    reckons
    f.company.dados.FREQ_FECHAMENTO_FOLGA = 4;
    f.company.dados.settlement_dayoff = 'Domingo/Fer 100%';
    f.company.modulos.usa_gestor_de_folgas = true;

    f.schedules[0].FL_BHSEMANAL = '0'
    f.shifts[0].FL_TRATAMENTO_CARGA_INFERIOR = 'Banco de Horas 1'
    f.shifts[0].FL_TRATAMENTO_CARGA_SUPERIOR = 'Banco de Horas 1'

    await populate(bareMinimum());
    await populate(aReckon());
    await bareMinimumDb();
    await db(aReckon());

});

await db.bareMinimum().withAReckon({ dti: '2017-02-01T01:00' });
await db.bareMinimum(aReckon({ dti: '2017-02-01T01:00' }));
await db.bareMinimum({ reckons: [aReckon({ dti: '2017-02-01T01:00' })] });
f.reckons = aReckon({ dti: '2017-02-01T01:00' });
f.db = aReckon({ dti: '2017-02-01T01:00' });
await db(aReckon({ dti: '2017-02-01T01:00' }));

x('cria se não encontrar apuração válida', () => asyncPipe(
    db(aReckon({ dti: '2017-02-01T01:00' })),
    generateReckons(aReckonQuery({ createdAfter: '2017-02-01T01:01' })),
    expectDb('reckons', aReckon()),
));