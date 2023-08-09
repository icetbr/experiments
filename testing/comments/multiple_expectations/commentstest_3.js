describe('POST /comments with valid data', () => {
    const comment = {
        name: 'John',
        email: 'john@test.com',
        content: 'my comment',
        postId: '2019-10-05-blockchain-platforms'
    };
    const response = await post('/api/comments', comment);
    const saved = await db.find();

    const defaultFields = {
        _id: UID,
        date: NOW,
    };
    const emailAsMd5 = '5634ff13f953ebcb374ac8c349bcfcfe';
    const transformedFields = {
        email: emailAsMd5,
    };
    const allFields = [{ ...comment, ...defaultFields, ...transformedFields }];
    const http200 = { statusCode: 200, body: undefined };

    expect(saved).to.have.lenght(1);
    expect(saved).to.containSubset(defaultFields);
    expect(saved).to.containSubset(transformedFields);
    expect(saved).to.equal(allFields);
    expect(response).to.equal(http200);
});

// - one test per action
// - broad steps
// - multiples asserts