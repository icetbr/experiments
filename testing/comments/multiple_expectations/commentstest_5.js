describe('POST /comments with valid data', () => {
    let comment;
    let defaultFields;
    let transformedFields;
    let response;
    let saved;

    before(() => {
        comment = {
            name: 'John',
            email: 'john@test.com',
            content: 'my comment',
            postId: '2019-10-05-blockchain-platforms'
        };
        defaultFields = {
            _id: 'aa',
            date: new Date,
        };
        transformedFields = {
            email: 'srfrdsf24aa',
        };

        response = await post('/api/comments', comment);
        saved = await db.find();
    });

    it('saves to the database', async () => {
        expect(saved).to.have.lenght(1);
    });

    it('adds default fields', async () => {
        expect(saved).to.containSubset(defaultFields);
    });

    it('transforms the fields', async () => {
        expect(saved).to.containSubset(transformedFields);
    });

    it('saves all fields to the database', async () => {
        expect(saved).to.equal({ ...comment, ...defaultFields, ...transformedFields });
    });

    it('responds with 200', async () => {
        expect(response).to.equal({ statusCode: 200, body: undefined });
    });

});

// - one test per expectation
// - explicit expectations
// - broad steps