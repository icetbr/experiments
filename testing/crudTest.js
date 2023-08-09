            // const expectAdded1 = (returned, db, historyDb) => {
            //     expectEquals(db.length, 3,                           'salva no banco');
            //     expectNotEquals(db[2].usu, undefined,                'adiciona metadados'); // contains é melhor, erro diz: experado ter 'usu'
            //     expectNotEquals(db[2].ops.inicio.time, undefined,    'desnormaliza');
            //     expectNotEquals(returned.result.data._id, undefined, 'retorna documento salvo');
            //     expectEquals(returned.result.data.ops, undefined,    'retorna documento normalizado');
            //     expectEquals(historyDb.length, 3,                    'salva no histórico');
            //     expectNotEquals(historyDb[2]._id, db[2]._id,         'copia do historico tem id unico');
            // };

            // const expectAdded2 = (returned, db, historyDb, savedId, expected, dbBefore) => {
            //     expectEquals(returned.result, { data: responseExample(...expected) });
            //     expectDb(db, [...dbBefore[dbName], legacyExample(...expected)]);
            //     expectDb(historyDb, [...dbBefore[historyDbName], legacyExample(...expected)]);
            //     expectNotEquals(historyDb[2]._id, savedId);
            // };

const expectAdded = (added) => {
    expectEqual(db, [...dbBefore[dbName], added]);
    expect(historyDb[2]._id).to.not.equal(added._id);
    historyDb[2]._id = added._id; // não quero comparar ids
    expectEqual(historyDb, [...dbBefore[historyDbName], added]);
};

const expectAdded = (addedDocs) => {
    const lastHistoryDbIds = historyDb.slice(historyDb.length - addedDocs.length, addedDocs.length).map(doc => doc._id);

    expectEquals(db, [...dbBefore[dbName], ...addeds]);
    expectNotEqual(lastHistoryDbIds, addeds.map(doc => doc._id));
    expectDbEqual(historyDb, [...dbBefore[historyDbName], added]);
};

test('POST adiciona metadados, desnormaliza, salva, salva no histórico e retorna o documento salvo e normalizado', async () => {
    const { returned, dbBefore, saved, historySaved } = await fb.fetch('POST', baseUrl, newDoc('3'));
    const savedId = saved[0]._id.toString();

    expectEquals(saved.length, 1, 'salva no banco');
    expectContains(saved[0], metadata(savedId, '3'), 'adiciona metadados');
    expectContains(saved[0], unormalizedField(), 'desnormaliza');
    expectResult(returned, normalizedDoc(savedId, '3'), 'retorna documento salvo e normalizado');
    expectEquals(historySaved.length, 1, 'salva no histórico');
    expectNotEquals(historySaved[2]._id, savedId, 'copia do historico tem id unico');

    // expectContains(saved[0], legacyExample(savedId, '3'), 'salva todos os campos');
    // this expects or expectAdded?
    expectEquals(returned.result, { data: { ...responseExample(savedId, '3'), dti } });
    expectDb(db, [...dbBefore[dbName], { ...legacyExample(savedId, '3'), dti }]);
    expectHistoryDb(db, historyDb, [...dbBefore[historyDbName], { ...legacyExample('3'), dti }]);

    //  I preffer this because its basically the same, extra asserts are kept in the custom function
    expectAdded({ ...legacyExample(savedId, '3'), dti });

    expect({
        added: { ...legacyExample(savedId, '3'), dti },
        to: [dbName, historyDbName],
    });

    expectDb(db, [...dbBefore[dbName], legacyExample(dti)('3')]);


    expect(db).to.have.length(1);
    // prepare
    await prepareDb();
    MockDate.set(dti);

    // run
    const returned = await fb.fetch('POST', baseUrl, newDoc('3'));
    if (returned.result.errors) throw new Error(returned.result.errors[0].message);
    if (returned.result.error) throw new Error(returned.result.error);
    // TODO expect statusCode

    // check
    const actuals = await db.find().toArray();
    const actualsHistory = await historyDb.find().toArray();

    const savedId = actuals[2]._id.toString();//index!!!
    const expectedReturned = responseExample(savedId, '3');
    expectedReturned.dti = dti;
    const expected = legacyExample(savedId, '3');
    expected.dti = dti;

    expect(returned.result).to.equal({ data: expectedReturned });
    expect(actuals).to.equal([...dbData[dbName], expected]);
    expect(actualsHistory[2]._id).to.not.equal(savedId);
    actualsHistory[2]._id = expected._id; // não quero comparar ids
    expect(actualsHistory).to.equal([...dbData[historyDbName], expected]);

    MockDate.reset();




    expectEquals(returned, responseExample('3'));
    expectDb(db, [legacyExample('3')])
    expectDbHistoryDb(historyDb, [legacyExample('3')]);


    assert.lengthOf(saved, 1, 'saves it to to the database');
    assert.includeDeepMembers(saved, defaultFields, 'adds default fields');
    assert.includeDeepMembers(saved, transformedFields, 'transforms fields');
    assert.deepEqual(saved, allFields, 'saves all fields to the database');
    assert.deepEqual(response, http200, 'responds with 200');
});

test('POST adiciona metadados, desnormaliza, salva, salva no histórico e retorna o documento salvo e normalizado', async () => {
    const dbBefore = await prepareDb();
    const { returned, db, historyDb } = await fetchAndLoad('POST', baseUrl, newDoc('3'));

    const savedId = db[2]._id.toString();
    const expected = [savedId, '3', { dti }];

    expectEquals(returned.result, { data: responseExample(...expected) });
    expectDb(db, [...dbBefore[dbName], legacyExample(...expected)]);
    expectDb(historyDb, [...dbBefore[historyDbName], legacyExample(...expected)]);
    expectNotEquals(historyDb[2]._id, savedId);
});

test('POST adiciona metadados, desnormaliza, salva, salva no histórico e retorna o documento salvo e normalizado', async () => {
    const dbBefore = await prepareDb();
    const { returned, db, historyDb } = await fetchAndLoad('POST', baseUrl, newDoc('3'));

    const savedId = db[2]._id.toString();
    const expected = [savedId, '3', { dti }];

    expectEquals(       returned.result,  { data: responseExample(...expected) });
    expectDb(           db,               [...dbBefore[dbName], legacyExample(...expected)]);
    expectDb(           historyDb,        [...dbBefore[historyDbName], legacyExample(...expected)]);
    expectNotEquals(    historyDb[2]._id, savedId);
});

test('POST adiciona metadados, desnormaliza, salva, salva no histórico e retorna o documento salvo e normalizado', async () => {
    const dbBefore = await prepareDb();
    const { returned, db, historyDb } = await fetchAndLoad('POST', baseUrl, newDoc('3'));

    const savedId = db[2]._id.toString();
    const expected = [savedId, '3', { dti }];

    expectEquals(
        returned.result,
        { data: responseExample(...expected) }
    );
    expectDb(
        db,
        [...dbBefore[dbName], legacyExample(...expected)]
    );
    expectDb(
        historyDb,
        [...dbBefore[historyDbName], legacyExample(...expected)]
    );
    expectNotEquals(historyDb[2]._id, savedId);
});