// no its
'POST /comments with valid data', () => {
    const response = await post('/api/comments', comment());
    const saved = await db.find();

    'saves to the database', () =>
        expect(saved).to.have.lenght(1)

    'adds default fields', () =>
        expect(saved).to.containSubset({
            _id: UID,
            date: NOW,
        })

    'transforms the fields', () =>
        expect(saved).to.containSubset({
            email: '5634ff13f953ebcb374ac8c349bcfcfe',
        })

    'saves all fields to the database', () =>
        expect(saved).to.equal([savedComment()])

    'responds with 200', () =>
        expect(response).to.equal({
            statusCode: 200, body: undefined
        })
};


// compact
describe('POST /comments with valid data', () => {
    const response = await post('/api/comments', comment());
    const saved = await db.find();

    it('saves to the database'              , () => expect(saved).to.have.lenght(1));
    it('adds default fields'                , () => expect(saved).to.containSubset({
        _id: UID,
        date: NOW,
    }));
    it('transforms the fields'              , () => expect(saved).to.containSubset({
        email: '5634ff13f953ebcb374ac8c349bcfcfe',
    }));
    it('saves all fields to the database'   , () => expect(saved).to.equal([savedComment()]));
    it('responds with 200'                  , () => expect(response).to.equal({ statusCode: 200, body: undefined }));
});

// compact as expects
describe('POST /comments with valid data', () => {
    const response = await post('/api/comments', comment());
    const saved = await db.find();

    expect(saved,    'saves it to to the database'      ).to.have.lenght(1);
    expect(saved,    'adds default fields'              ).to.containSubset({
        _id: UID,
        date: NOW,
    });
    expect(saved,    'transforms fields'                ).to.containSubset({
        email: '5634ff13f953ebcb374ac8c349bcfcfe',
    });
    expect(saved,    'saves all fields to the database' ).to.equal([savedComment()]);
    expect(response, 'responds with 200'                ).to.equal({ statusCode: 200, body: undefined });
});

// compact as its
describe('POST /comments with valid data', () => {
    const response = await post('/api/comments', comment());
    const saved = await db.find();

    it('saves it to to the database', saved).to.have.lenght(1);
    it('adds default fields', saved).to.containSubset({
        _id: UID,
        date: NOW,
    });
    it('transforms fields', saved).to.containSubset({
        email: '5634ff13f953ebcb374ac8c349bcfcfe',
    });
    it('saves all fields to the database', saved).to.equal([savedComment()]);
    it('responds with 200', response).to.equal({ statusCode: 200, body: undefined });
});

// compact as its 2
describe('POST /comments with valid data', () => {
    const response = await post('/api/comments', comment());
    const saved = await db.find();

    it('saves it to to the database',      saved).to.have.lenght(1);
    it('adds default fields',              saved).to.containSubset({
        _id: UID,
        date: NOW,
    });
    it('transforms fields',                saved).to.containSubset({
        email: '5634ff13f953ebcb374ac8c349bcfcfe',
    });
    it('saves all fields to the database', saved).to.equal([savedComment()]);
    it('responds with 200',                response).to.equal({ statusCode: 200, body: undefined });
});

// grouped asserts (for comparison)
describe('POST /comments with valid data', () => {
    const defaultFields = {
        _id: UID,
        date: NOW,
    };
    const transformedFields = {
        email: '5634ff13f953ebcb374ac8c349bcfcfe',
    };
    const http200 = { statusCode: 200, body: undefined };

    const response = await post('/api/comments', comment());
    const saved = await db.find();

    it('saves to the database',             () => expect(saved).to.have.lenght(1));
    it('adds default fields',               () => expect(saved).to.containSubset(defaultFields));
    it('transforms the fields',             () => expect(saved).to.containSubset(transformedFields));
    it('saves all fields to the database',  () => expect(saved).to.equal([savedComment()]));
    it('responds with 200',                 () => expect(response).to.equal(http200));
});

// grouped asserts with hoisting
describe('POST /comments with valid data', () => {
    it('saves to the database',             () => expect(saved).to.have.lenght(1));
    it('adds default fields',               () => expect(saved).to.containSubset(defaultFields));
    it('transforms the fields',             () => expect(saved).to.containSubset(transformedFields));
    it('saves all fields to the database',  () => expect(saved).to.equal([savedComment()]));
    it('responds with 200',                 () => expect(response).to.equal(http200));

    var response = await post('/api/comments', comment());
    var saved = await db.find();

    var defaultFields = {
        _id: UID,
        date: NOW,
    };
    var transformedFields = {
        email: '5634ff13f953ebcb374ac8c349bcfcfe',
    };
    var http200 = { statusCode: 200, body: undefined };
});



// variation: object start on new line
describe('POST /comments with valid data', () => {
    const response = await post('/api/comments', {
        name: 'John',
        email: 'john@test.com',
        content: 'my comment',
        postId: '2019-10-05-blockchain-platforms'
    });
    const saved = await db.find();

    it('saves to the database', () =>
        expect(saved).to.have.lenght(1));

    it('adds default fields', () =>
        expect(saved).to.containSubset(
        {
            _id: UID,
            date: NOW,
        }
    ));

    it('transforms the fields', () =>
        expect(saved).to.containSubset(
        {
            email: '5634ff13f953ebcb374ac8c349bcfcfe',
        }
    ));

    it('saves all fields to the database', () =>
        expect(saved).to.equal(
        {
            name: 'John',
            content: 'my comment',
            postId: '2019-10-05-blockchain-platforms',
            email: '5634ff13f953ebcb374ac8c349bcfcfe',
            _id: UID,
            date: NOW,
            moderation: 'pending',
        }
    ));

    it('responds with 200', () =>
        expect(response).to.equal(
        {
            statusCode: 200, body: undefined
        }
    ));
});

// variation: expect on same line
describe('POST /comments with valid data', () => {
    const response = await post('/api/comments', {
        name: 'John',
        email: 'john@test.com',
        content: 'my comment',
        postId: '2019-10-05-blockchain-platforms'
    });
    const saved = await db.find();

    it('saves to the database', () => expect(saved).to.have.lenght(1));

    it('adds default fields', () => expect(saved).to.containSubset({
        _id: UID,
        date: NOW,
    }));

    it('transforms the fields', () => expect(saved).to.containSubset({
        email: '5634ff13f953ebcb374ac8c349bcfcfe',
    }));

    it('saves all fields to the database', () => expect(saved).to.equal({
        name: 'John',
        content: 'my comment',
        postId: '2019-10-05-blockchain-platforms',
        email: '5634ff13f953ebcb374ac8c349bcfcfe',
        _id: UID,
        date: NOW,
        moderation: 'pending',
    }));

    it('responds with 200', () => expect(response).to.equal({
        statusCode: 200, body: undefined
    }));
});


// - one test per action
// - broad steps
// - multiples asserts with description


