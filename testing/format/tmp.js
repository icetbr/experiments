it('works with jest expect', 1, 5, 6);              // ideal but repeats it
it('works with jest expect', fn(1, 5, 6));          // no need to repeat it
it('works with jest expect', eq(sum(1, 5), 6));
it('works with jest expect', () => eq(sum(1, 5), 6));

const it = (s, fn, e) => it(s, () => eq(fn(), e));
it('works with jest expect', fn(1, 5), 6);

const eq = () => (a, b, e) => eq(sum(a, b), e);
it('works with jest expect', eq(1, 5, 6));

const eq = () => (a, e) => eq(a, e));
it('works with jest expect', eq(sum(1, 5), 6));

it('works with jest expect', () => eq(sum(1, 5), 6));


const is = (error, actual) => eqLines(3, 3, uncolor(createFail(cwd, test, error)), actual);

it('works with jest expect', new JestAssertionError({
    matcherResult: {
        actual: 'word1',
        expected: 'word2',
    },
}), '[word1]{word2}');

it('works with jest expect', eq(sum(
    new JestAssertionError({
        matcherResult: {
            actual: 'word1',
            expected: 'word2',
        },
    })),

    '[word1]{word2}'));

const it = (error, actual) => eqLines(3, 3, uncolor(createFail(cwd, test, error)), actual);
const it = (scenario, expected, error) => it(scenario, () => eq(createFail(cwd, test, error)), expected);
const it = (s, error, e) => it(s, () => eq(createFail(cwd, test, error)), e);
const fn = (error, e) => eq(createFail(cwd, test, error), e);
const it = (scenario, fn) => it(scenario, fn);
const fn = () => error => createFail(cwd, test, error);
const it = s => (error, e) => it(s, () => eq(createFail(cwd, test, error)), e);

() => eq(createFail(cwd, test, error)), expected)


it('works with jest expect', new JestAssertionError({ matcherResult: { actual: 'word1', expected: 'word2' } }), '[word1]{word2}');

it('works with jest expect', fn(new JestAssertionError({ matcherResult: { actual: 'word1', expected: 'word2' } }), '[word1]{word2}'));

it('works with jest expect', () => fn(new JestAssertionError({ matcherResult: { actual: 'word1', expected: 'word2' } }), '[word1]{word2}'));

it('works with jest expect')(new JestAssertionError({ matcherResult: { actual: 'word1', expected: 'word2' } }), '[word1]{word2}');

it('works with jest expect', () => eqLinesUncolor(3, 3, {
    actual: createFail(cwd, test, new JestAssertionError({
        matcherResult: {
            actual: 'word1',
            expected: 'word2',
        },
    })),

    expected: '[word1]{word2}',
}));

it('works with jest expect', () => {
    const error = new JestAssertionError({
        matcherResult: {
            actual: 'word1',
            expected: 'word2',
        },
    });

    const actual = '[word1]{word2}';

    eqLines(3, 3, uncolor(createFail(cwd, test, error)), actual);
});

it('works with jest expect', () => eqLinesUncolor(3, 3, {
    actual: createFail(cwd, test, new JestAssertionError({ matcherResult: { actual: 'word1', expected: 'word2' }})),
    expected: '[word1]{word2}',
}));

it('works with jest expect', () => eqLinesUncolor(3, 3, {
    actual: createFail({ error: new JestAssertionError({ matcherResult: { actual: 'word1', expected: 'word2' }})}),
    expected: '[word1]{word2}',
}));

'works with jest expect' () => eq(createFail(new JestAssertionError({ matcherResult: { actual: 'word1', expected: 'word2' }}})), '[word1]{word2}')



assert('works with jest expect', createFail(new JestAssertionError({ matcherResult: { actual: 'word1', expected: 'word2' }}})), '[word1]{word2}');

const cf = error => _createFail(cwd, test, error);

//avoid deferendes: populate should occor in the function itself
