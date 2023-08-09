describe('POST /comments with valid data', () => {
    const comment = {
        name: 'John',
        email: 'john@test.com',
        content: 'my comment',
        postId: '2019-10-05-blockchain-platforms'
    };
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

    const response = await post('/api/comments', comment);
    const saved = await db.find();

    it('saves to the database',             () => expect(saved).to.have.lenght(1));
    it('adds default fields',               () => expect(saved).to.containSubset(defaultFields));
    it('transforms the fields',             () => expect(saved).to.containSubset(transformedFields));
    it('saves all fields to the database',  () => expect(saved).to.equal(allFields));
    it('responds with 200',                 () => expect(response).to.equal(http200));
});

/**
 * To make this work I'd need either
 * - tape
 * - let (custom lib)
 * - before + mutable variables
 * - helperFuncons
 */

// builder version
describe('POST /comments with valid data', () => {
    const defaultFields = {
        _id: UID,
        date: NOW,
    };
    const emailAsMd5 = '5634ff13f953ebcb374ac8c349bcfcfe';
    const transformedFields = {
        email: emailAsMd5,
    };
    const http200 = { statusCode: 200, body: undefined };

    const response = await post('/api/comments', comment());
    const saved = await db.find();

    it('saves to the database',             () => expect(saved).to.have.lenght(1));
    it('adds default fields',               () => expect(saved).to.containSubset(defaultFields));
    it('transforms the fields',             () => expect(saved).to.containSubset(transformedFields));
    it('saves all fields to the database',  () => expect(saved).to.equal(allFields));
    it('responds with 200',                 () => expect(response).to.equal(http200));
});