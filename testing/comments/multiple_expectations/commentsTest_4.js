describe('POST /comments with valid data saves it to the database, adds an uniqueId, adds current date, transforms email to its md5, saves all fields, responds with 200', () => {
    const comment = {
        name: 'John',
        email: 'john@test.com',
        content: 'my comment',
        postId: '2019-10-05-blockchain-platforms'
    };
    const response = await post('/api/comments', comment);
    const saved = await db.find();

    const emailAsMd5 = '5634ff13f953ebcb374ac8c349bcfcfe';
    expect(saved).to.equal([{
        name: 'John',
        content: 'my comment',
        postId: '2019-10-05-blockchain-platforms',
        _id: UID,
        date: NOW,
        email: emailAsMd5,
    }]);

    expect(response).to.equal({ statusCode: 200, body: undefined });
});
// - one test per action
// - implied expectations
// - detailed steps