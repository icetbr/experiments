const is = (error, actual) => eqLines(3, 3, uncolor(createFail(cwd, test, error)), actual);

it('works with jest expect', new JestAssertionError({
    matcherResult: {
        actual: 'word1',
        expected: 'word2',
    },
}), '[word1]{word2}');

it('works with jest expect',
    new JestAssertionError({
        matcherResult: {
            actual: 'word1',
            expected: 'word2',
        },
    }), '[word1]{word2}');

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
