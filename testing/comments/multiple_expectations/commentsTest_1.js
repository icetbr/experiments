describe('POST /comments with a valid data adds generated fields, transforms it, saves the result and responds with 200', async () => {
    const comment = {
        name: 'John',
        email: 'john@test.com',
        content: 'my comment',
        postId: '2019-10-05-blockchain-platforms'
    };
    const response = await post('/api/comments', comment);
    const saved = await db.find();

    expect(saved).to.deep.equal([{
        name: 'John',
        content: 'my comment',
        postId: '2019-10-05-blockchain-platforms',

        // transformed fields
        email: '5634ff13f953ebcb374ac8c349bcfcfe',

        // generated fields
        _id: UID,
        date: NOW,
        moderation: 'pending',
    }]);
    expect(response).to.deep.equal({ statusCode: 200, body: undefined });
});

// - one test per action
// - broad steps
// - comments for organization
/**
 * concise
 * no progra and "don't make me think" style
 * - no variable declarations
 */