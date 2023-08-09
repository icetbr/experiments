// unit + integration

const validComment = () => ({
    name: 'John',
    email: 'john@test.com',
    content: 'my comment',
    postId: '2019-10-05-blockchain-platforms'
});

const savedComment = () => ({
    name: 'John',
    content: 'my comment',
    postId: '2019-10-05-blockchain-platforms',
    email: '5634ff13f953ebcb374ac8c349bcfcfe',
    _id: UID,
    date: NOW,
    moderation: 'pending',
});

const validCommentWithDefaultFields = () => ({
    ...validComment(),
    _id: UID,
    date: NOW,
});

// integration
describe('POST /comments with a valid comment saves it to the database and returns 200', () => {
    const response = await post('/api/comments', validComment());
    const saved = await db.find();

    expect(saved).to.have.lenght(1);
    expect(response).to.equal({ statusCode: 200, body: undefined });
});

//unit
const db = () => {
    const saved = [];
    return {
        save(data) {
            saved.push(data);
        },
        find() {
            return saved;
        }
    };
};
describe('create comment with a valid comment', () => {

    it('adds default fields', () => {
        const defaultFields = {
            _id: UID,
            date: NOW,
        };
        comment.create(validComment(), db);
        expect(db.find()[0]).to.containSubset(defaultFields);
    });

    it('transforms fields', () => {
        const emailAsMd5 = '5634ff13f953ebcb374ac8c349bcfcfe';
        const transformedFields = {
            email: emailAsMd5,
        };
        comment.create(validComment(), db);
        expect(db.find()[0]).to.containSubset(transformedFields);
    });

    it('saves all fields to the database', () => {
        comment.create(validComment(), db);
        expect(db.find()[0]).to.equal(savedComment());
    });

});


