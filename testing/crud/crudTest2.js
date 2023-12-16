/*
    Testing method its called
    - mock
    - call the method itself
      - ex: expectEquals(saved, addMetadata(input))
    - test results
*/

// check metadata is added

/*
  Things to test
  - no emails or events emitted
  - other collections were not changed
  - other docs in same collection were not changed
  - all fields were saved
  - the doc passed was inserted
  - a doc was inserted

  - don't want to test for all metadata in every test!?
*/
test('POST salva', async () => {
    const { db } = await fetchAndLoad('POST', baseUrl, { name: 'John', age: 25 });

    const savedId = db[2]._id.toString();
    expectEquals(returned.result, { data: {
        _id: savedId,
        name: 'John',
        age: 25,
        dti,
        key: dti,
        cod: dti
    } });

    const dbBefore = await prepareDb();
    const { returned, db, historyDb } = await fetchAndLoad('POST', baseUrl, newDoc('3'));

    const savedId = db[2]._id.toString();
    const expected = [savedId, '3', { dti }];

    expectEquals(returned.result, { data: responseExample(...expected) });
    expectDb(db, [...dbBefore[dbName], legacyExample(...expected)]);
    expectDb(historyDb, [...dbBefore[historyDbName], legacyExample(...expected)]);
    expectNotEquals(historyDb[2]._id, savedId);
});

const expects = () => {
    const expectedReturned = {
        ...doc,
        [dscField]: updatedDscField,
        dsc: updatedDscField,
        cod: 'oldCod',
        key: 'oldKey',
        dti,
        _id: savedId,
    };

    const expectedDb = {
        ...doc,
        dsc: updatedDscField,
        cod: 'oldCod',
        dsc: updatedDscField,
        dti,
        _id: savedId,
    };
    setProp(expectedDb, dscField, updatedDscField);
    setProp(expectedDb, key, 'oldKey');
};

const expects = () => {
    const expectedReturned = persistedExample(doc, {
        _id: savedId,
        cod: 'oldCod',
        dti,
        dsc: updatedDscField,
        [dscField]: updatedDscField,
        key: 'oldKey',
    });

    const expectedDb = !ops ? expectedReturned : legacyExample(doc, {
        _id: savedId,
        cod: 'oldCod',
        dti,
        dsc: updatedDscField,
        ops: {
            key: 'oldKey',
            [dscField]: updatedDscField,
        }
    });
}

/*
    Alternatives
    - test all explicit
    - just test one property
    - use generator, tests that it was called, but not the logic
*/
const expects = () => { // savedId, dsc, cod, key
    const common = {
        _id: savedId,
        company: 'a000001',
        usu: 'system',
        dti,
        cod: savedId.toString(),
        dsc: updatedDscField,
    };

    const expectedReturned = responseExample(doc, {
        ...common,
        [dscField]: updatedDscField,
        key: savedId.toString(),
        vld: true,
        hidden: false,
    });

    const expectedDb = persistedExample(doc, {
        ...common,
        [dscField]: updatedDscField,
        key: savedId.toString(),
        vld: '1',
        vis: true,
    });

    const expectedDbOps = persistedExampleOps(doc, {
        ...common,
        vld: '1',
        ops: {
            [dscField]: updatedDscField,
            key: savedId.toString(),
            vis: true,
        },
    });
}

test('adiciona metadados, mantem cod e key antigos, atualiza, salva no histórico e retorna o documento atualizado e normalizado', async () => {
    const dbBefore = await prepareDb();
    const insertedId = dbBefore[dbName][0]._id;
    const doc = { ...newPutDoc(), [dscField]: updatedDscField };
    const { returned, db, historyDb } = await fetchAndLoad('PUT', `${baseUrl}/${insertedId}`, doc);

    const savedId = db[0]._id.toString();




    expectEquals(returned.result, { data: expectedReturned });

    expectDb(db, [expectedDb, dbBefore[dbName][1]]);
    expectDb(historyDb, [...dbBefore[historyDbName], expectedDb]);
    expectNotEquals(historyDb[2]._id, savedId);
});

test('POST adiciona metadados, desnormaliza, salva, salva no histórico e retorna o documento salvo e normalizado', async () => {
    const { returned, dbBefore, saved, historySaved } = await fb.fetch('POST', baseUrl, newDoc('3'));
    const savedId = saved[0]._id.toString();

    // expectEquals(saved.length, 1, 'salva no banco');
    expectEquals(saved[unique], unique, 'salva no banco');
    expectContains(saved[0], { cod: savedId }, 'adiciona metadados');
    // expectContains(saved[0], { ops: { key: savedId } }, 'adiciona metadados');
    expectContains(saved[0], { ops: { inicio: 10 } }, 'desnormaliza'); // posso usar key
    expectResult(returned, { id: savedId, start: 10 }, 'retorna documento salvo e normalizado');
    expectEquals(historySaved.length, 1, 'salva no histórico');
    expectNotEquals(historySaved[2]._id, savedId, 'copia do historico tem id unico');
});