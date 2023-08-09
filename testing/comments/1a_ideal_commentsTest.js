const it = (msg, obj) => expect(obj, msg);

const alternatives = () => {
    // tape
    it('saves to the database',             () => expect(saved).to.have.lenght(1));
    it('adds default fields',               () => expect(saved).to.containSubset(defaultFields));
    it('transforms the fields',             () => expect(saved).to.containSubset(transformedFields));
    it('saves all fields to the database',  () => expect(saved).to.equal(allFields));
    it('responds with 200',                 () => expect(response).to.equal(http200));

    // mocha 1
    expect(saved,    'saves it to to the database'      ).to.have.lenght(1);
    expect(saved,    'adds default fields'              ).to.containSubset(defaultFields);
    expect(saved,    'transforms fields'                ).to.containSubset(transformedFields);
    expect(saved,    'saves all fields to the database' ).to.equal(allFields);
    expect(response, 'responds with 200'                ).to.equal(http200);

    // mocha 2
    expect(saved).to.have.lenght(1,                     'saves it to to the database');
    expect(saved).to.containSubset(defaultFields,       'adds default fields');
    expect(saved).to.containSubset(transformedFields,   'transforms fields');
    expect(saved).to.equal(allFields,                   'saves all fields to the database');
    expect(response).to.equal(http200,                  'responds with 200');

    // custom mocha 1
    it('saves to the database',             saved).to.have.lenght(1);
    it('adds default fields',               saved).to.containSubset(defaultFields);
    it('transforms the fields',             saved).to.containSubset(transformedFields);
    it('saves all fields to the database',  saved).to.deep.equal(allFields);
    it('responds with 200',                 response).to.deep.equal(http200);

    // custom mocha 2
    expect(saved).to.have.lenght(1)                    .as('saves it to to the database');
    expect(saved).to.containSubset(defaultFields)      .as('adds default fields');
    expect(saved).to.containSubset(transformedFields)  .as('transforms fields');
    expect(saved).to.equal(allFields)                  .as('saves all fields to the database');
    expect(response).to.equal(http200)                 .as('responds with 200');

    // should syntax
    saved.should.have.lenght(1,                     'saves it to to the database');
    saved.should.containSubset(defaultFields,       'adds default fields');
    saved.should.containSubset(transformedFields,   'transforms fields');
    saved.should.deep.equal(allFields,              'saves all fields to the database');
    response.should.deep.equal(http200,             'responds with 200');

    // assert syntax
    assert.lengthOf(saved, 1,                            'saves it to to the database');
    assert.includeDeepMembers(saved, defaultFields,      'adds default fields');
    assert.includeDeepMembers(saved, transformedFields,  'transforms fields');
    assert.deepEqual(saved, allFields,                   'saves all fields to the database');
    assert.deepEqual(response, http200,                  'responds with 200');

    // comparing approaches for noise
    it('saves to the database', saved).to.have.lenght(1);
    it('saves to the database', () => expect(saved).to.have.lenght(1));
    expect(saved).to.have.lenght(1).as('saves it to to the database');
    assert.lengthOf(saved, 1, 'saves it to to the database');
    it('saving to the database').then(saved).has.lenght(1);

};