cwd = process.cwd(),
test = { title: 'a test name'},
error = new AssertionError({ actual: 'word1', expected: 'word2' });

createFail(cwd, test, error)

'A test name'
/******************************************************** */
assert({
    it: 'has a title, an error message and a stack trace',

    actual: createFail({
        cwd: process.cwd(),
        test: { title: 'a test name'},
        error: new AssertionError({ actual: 'word1', expected: 'word2' });
    }),

    expected: 'A test name'
})


/******************************************************** */
it('has a title, an error message and a stack trace', () => eq(

    createFail({
        cwd: process.cwd(),
        test: { title: 'a test name'},
        error: new AssertionError({ actual: 'word1', expected: 'word2' });
    }),

    'A test name'
))

/******************************************************** */
it('has a title, an error message and a stack trace', () => eq({

    actual: createFail({
        cwd: process.cwd(),
        test: { title: 'a test name'},
        error: new AssertionError({ actual: 'word1', expected: 'word2' });
    }),

    expected: 'A test name',
}))

/******************************************************** */
const createFail = ({
    cwd: process.cwd(),
    test: { title: 'a test name'},
    error: new AssertionError({ actual: 'word1', expected: 'word2' });
}) => createFail(cwd, test, error)

createFail({test})

/******************************************************** */
/******************************************************** */
it('includes its parents when available', () => {
    const testWithParent = {
        title: 'a test name',
        parent: {
            title: 'p1',
            parent: {
                title: 'p2'
            }
        }
    };
    const expected = '*p2 > p1 > The title*';

    eqLines(1, 1, uncolor(createFail(cwd, testWithParent, error)), expected)
});

/******************************************************** */
it('includes its parents when available', () => eqLinesUncolor(1, 1,
    createFail(cwd, {
        title: 'a test name',
        parent: {
            title: 'p1',
            parent: {
                title: 'p2'
            }
        }
    }, error),

    '*p2 > p1 > The title*'
));


/******************************************************** */
assert({
    it: 'includes its parents when available',

    actual: createFail(cwd, {
        title: 'a test name',
        parent: {
            title: 'p1',
            parent: {
                title: 'p2'
            }
        }
    }, error),

    expected: '*p2 > p1 > The title*',
});

/******************************************************** */
`

    *parent 1 > parent 2 > test name*                         // the test and its ancestor's titles are combined

    [word1]{word2}                                            // the difference between the [actual] and {expected}

    _at Context.<anonymous> (test/formatTest.js:31:51)_       // the stack trace with shorter filenames and without node:internals


`
/******************************************************** */
it('is the title of the failed test', () => {
    eqLines(1, 1, uncolor(createFail(cwd, test, error)), '*a test name*');
});

it('is the title of the failed test', () => {
    eq(buildTitle(test), '*a test name*')
});

it('is the title of the failed test', () => eqLinesUncolor(1, 1,
    createFail(cwd, test, error), '*a test name*'
));

it('is the title of the failed test', () => eqLinesUncolor(1, 1, {
    actual: createFail(cwd, test, error),
    expected: '*a test name*',
}));

assert({
    given: 'a test',
    returns: 'its title'
    actual: createFail(cwd, test, error),
    expected: '*a test name*',
}));

it('is the title of the failed test', () => eq(
    buildTitle(test), '*a test name*'
);

it('is the title of the failed test', () =>
    eq(buildTitle(test), '*a test name*')


it('is the title of the failed test', () => eq({
    actual: buildTitle(test),
    expected: '*a test name*'
});

/******************************************************** */
// minimal
it('is the title of the failed test', () => eq(buildTitle({ title: 'a test name'}), '*a test name*'))
it('is the title of the failed test', () => [{ title: 'a test name'}, '*a test name*']
['is the title of the failed test', { title: 'a test name'}, '*a test name*']

it('is the title of the failed test', () => {
    given: { test: { title: 'a test name'} },
    expected: '*a test name*',
})

it('is the title of the failed test', () => ({
   test: { title: 'a test name'},
   expected: '*a test name*',
}))

it('is the title of the failed test', () =>
    eq(buildTitle({ title: 'a test name'}), '*a test name*'))

it('is the title of the failed test', () => {
    eq(buildTitle(test), '*a test name*')
});
