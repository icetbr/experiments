import { describe, it, eq } from './setup.js';
import { AssertionError } from 'assert';
import { JestAssertionError  } from 'expect';
import { diff, fail } from '../src/format.js'
import dedent from 'dedent-js';
import { uncolor } from './utils.js';

// rename describe to 'a'
describe('format', () => {

    describe('fail', () => {
        const
            cwd = process.cwd(),
            test = { title: 'a test name'},
            error = new AssertionError({ actual: 'word1', expected: 'word2' });

        describe('a failed test run message', () => {

            it('has a title, an error message and a stack trace', () => eq({
                actual: uncolor(createFail(cwd, test, error)),

                expected: dedent`

                    *a test name*

                    [word1]{word2}

                    _at Context.<anonymous> (test/formatTest.js:31:51)_


                `
            }));
        });

        describe('a title', () => {

            it('is the title of the failed test', () => eqLinesUncolor(1, 1, {
                actual: createFail(cwd, test, error),
                expected: '*a test name*',
            }));

            it('includes its parents when available', () => eqLinesUncolor(1, 1, {
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
            }));
        });

        describe('an error message', () => {

            describe('when an assertion error', () => {

                it('is the diff of the actual and expected results', () => eqLinesUncolor(3, 3, {
                    actual: createFail(cwd, test, error),
                    expected: '[word1]{word2}',
                }));

                // error.matcherResult.actual.keys, error.matcherResult.expected.keys
                it('works with jest expect', () => eqLinesUncolor(3, 3, {
                    actual: createFail(cwd, test, new JestAssertionError({
                        matcherResult: {
                            actual: 'word1',
                            expected: 'word2',
                        },
                    })),

                    expected: '[word1]{word2}',
                }));
            });

            describe('when a regular error', () => {

                it('is the error name and message', () => eqLinesUncolor(3, 3, {
                    actual: createFail(cwd, test, new Error('Crash!')),
                    expected: 'Error: Crash!'
                }));

                it('includes nested error', ()  => eqLinesUncolor(3, 3, {
                    actual: createFail(cwd, test, new Error('Crash!', { cause: new TypeError('Burn!') })),
                    expected: 'Error: Crash! => TypeError: Burn!',
                }));
            });

            describe('a stack trace', () => {

                it('has no useless "prefixes"', () => eqLinesUncolor(5, 5, {
                    actual: createFail(cwd, test, assign(new Error('Crash!'), { stack: dedent`
                        'at Context.<anonymous> (test/formatTest.js:31:51)'
                        'at Context.<anonymous> (test/formatTest.js:31:51)'
                        'at Context.<anonymous> (test/formatTest.js:31:51)'
                    `})),

                    expected: '_at Context.<anonymous> (test/formatTest.js:31:51)_',
                }));

                it('has no stack frames from internals', () => eqLinesUncolor(5, 5, {
                    actual: createFail(cwd, test, assign(new Error('Crash!'), stack = dedent`
                        'at Context.<anonymous> (test/formatTest.js:31:51)'
                        'at Context.<anonymous> (test/formatTest.js:31:51)'
                        'at Context.<anonymous> (test/formatTest.js:31:51)'
                    `)),

                    expected: '_at Context.<anonymous> (test/formatTest.js:31:51)_',
                }));
            });
        });
    });
});

// A **failed test run** message has a title, an error message and a stack trace

// - a title
//     is the title of the failed test
//     includes its parents when available

// - an error message
//   - when an assertion error
//     - is the diff of the actual and expected results
//     - works with jest's expect
//   - when a regular error
//     - is the error name and message
//     - includes nested error

// - a stack trace
//   - has no stack frames from internals
//   - has no useless "prefixes"

