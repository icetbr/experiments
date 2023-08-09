describe('POST /comments with valid data', () => {
    const response = await post('/api/comments', {
        name: 'John',
        email: 'john@test.com',
        content: 'my comment',
        postId: '2019-10-05-blockchain-platforms'
    });
    const saved = await db.find();

    it('saves to the database', () =>
        expect(saved).to.have.lenght(1)
    );

    it('adds default fields', () =>
        expect(saved).to.containSubset({
            _id: UID,
            date: NOW,
        })
    );

    it('transforms the fields', () =>
        expect(saved).to.containSubset({
            email: '5634ff13f953ebcb374ac8c349bcfcfe',
        })
    );

    it('saves all fields to the database', () =>
        expect(saved).to.equal([{
            name: 'John',
            content: 'my comment',
            postId: '2019-10-05-blockchain-platforms',
            email: '5634ff13f953ebcb374ac8c349bcfcfe',
            _id: UID,
            date: NOW,
            moderation: 'pending',
        }])
    );

    it('responds with 200', () =>
        expect(response).to.equal({
            statusCode: 200, body: undefined
        })
    );
});

// comment() is a buidler
describe('POST /comments with valid data', () => {
    const response = await post('/api/comments', comment());
    const saved = await db.find();

    it('saves to the database', () =>
        expect(saved).to.have.lenght(1)
    );

    it('adds default fields', () =>
        expect(saved).to.containSubset({
            _id: UID,
            date: NOW,
        })
    );

    it('transforms the fields', () =>
        expect(saved).to.containSubset({
            email: '5634ff13f953ebcb374ac8c349bcfcfe',
        })
    );

    it('saves all fields to the database', () =>
        expect(saved).to.equal([savedComment()])
    );

    it('responds with 200', () =>
        expect(response).to.equal({
            statusCode: 200, body: undefined
        })
    );
});