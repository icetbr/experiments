// - one test per action
// - broad steps
// - multiples asserts with description

// TRYING: multiples its
describe('POST /comments with valid data', () => {
    const fixture = () => {
        const comment = {
            name: 'John',
            email: 'john@test.com',
            content: 'my comment',
            postId: '2019-10-05-blockchain-platforms'
        };
        const response = await post('/api/comments', comment);
        const saved = await db.find();
        return { response, saved };
    };

    it('saves it to the database', async () => {
        const { saved } = await fixture();
        expect(saved).to.have.lenght(1);
    });

    it('adds default fields', async () => {
        const { saved } = await fixture();
        expect(saved).to.containSubset({
            _id: UID,
            date: NOW,
        });
    });

    expect(saved, 'transforms fields').to.containSubset(transformedFields);
    expect(saved, 'saves all fields to the database').to.equal({ ...comment, ...defaultFields, ...transformedFields });
    expect(response, 'responds with 200').to.equal({ statusCode: 200, body: undefined });
});