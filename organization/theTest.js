const base = {
    cwd: process.cwd(),
    test: { title: 'a test name'},
    error: new AssertionError({ actual: 'word1', expected: 'word2' }),
}

describe('creates with', () => {
    it('creates', () => );
    describe('title', () => {
        it('the test title', eqLines(1, 1, fail(base), 'The title'))

        it('with parents', eqLines(1, 1, fail(base), 'The title'))

        it('with parents', () => {
            const test = {
                title: 'a test name',
                parent: {
                    title: 'p1',
                    parent: {
                        title: 'p2'
                    }
                }
            }
            eqLines(1, 1, createFail(cwd, test, error), 'p2 > p1 > The title')
        )

        it('with parents', () => {
            const test = {
                title: 'a test name',
                parent: {
                    title: 'p1',
                    parent: {
                        title: 'p2'
                    }
                }
            }
            eq(buildTitle(test), 'p2 > p1 > The title')
        )
    });
})

const { cwd, test, error } = base;
base.title = { title: 'a test name', parent: { title: 'a test name'} },

expect(fail()).to.equal(dedent``))

const base = {
    cwd: process.cwd(),
    test: { title: 'a test name'},
    error: new AssertionError({ actual: 'word1', expected: 'word2' }),
}
const { cwd, test, error } = base;
base.title = { title: 'a test name', parent: { title: 'a test name'} },

expect(fail()).to.equal(dedent``))
/******************************************************/

const test = { title: 'a test name'};
const error = new AssertionError({ actual: 'word1', expected: 'word2' });

expect(fail(process.cwd(), test, error)).to.equal(dedent``))

/******************************************************/
expect(fail({
    cwd: process.cwd(),
    test: { title: 'a test name'},
    error: new AssertionError({ actual: 'word1', expected: 'word2' }),
})).to.equal(dedent``))
