// acummulator to avoid repetition
describe('POST /comments with valid data', () => {

    it('adds default fields', async () => {
        expected._id = 'aa'
        expected.date = new Date
        expect(actual).to.containSubset(expected);
    });

    it('transforms the fields', async () => {
        expected.email = 'srfrdsf24aa'
        expect(actual).to.containSubset(expected);
    });

    it('saves it to to the database', async () => {
        expect(actual).to.equal(expected);
    });
});

// accumulator and property as test description
describe('POST /comments with valid data', () => {
    let msg = 'adds default fields'
    expected._id = 'aa'
    expected.date = new Date
    expect(actual, msg).to.containSubset(expected);

    let msg = 'transforms the fields'
    expected.email = 'srfrdsf24aa'
    expect(actual, msg).to.containSubset(expected);

    let msg = 'saves it to to the database'
    expect(actual, msg).to.equal(expected);
});

// accumulator and inline test description
describe('POST /comments with valid data', () => {
    expected._id = 'aa'
    expected.date = new Date
    expect(actual, 'adds default fields').to.containSubset(expected);

    expected.email = 'srfrdsf24aa'
    expect(actual, 'transforms fields').to.containSubset(expected);

    expect(actual, 'saves it to to the database').to.equal(expected);
});



assert.deepEqual(
    api(true),
    [1, 2, 3],
    chalk.red('api with magic enabled provides all items')
)

describe('POST /comments', async assert => {
    const given = 'valid data';
    const response = await post('/api/comments', comment);
    const saved = await db.find();

    assert({
        given,
        should: 'save it to the database',
        actual: saved,
        expected: 0
    });

    assert({
        given: 'zero',
        should,
        actual: sum(2, 0),
        expected: 2
    });

    assert({
        given: 'negative numbers',
        should,
        actual: sum(1, -4),
        expected: -3
    });

    assert({
        given: 'NaN',
        should: 'throw',
        actual: Try(sum, 1, NaN).toString(),
        expected: 'TypeError: NaN'
    });
});