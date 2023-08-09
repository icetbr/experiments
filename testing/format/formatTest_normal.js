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

            it('has a title, an error message and a stack trace', () => {
                const expected = dedent`

                    *a test name*

                    [word1]{word2}

                    _at Context.<anonymous> (test/formatTest.js:31:51)_


                `;
                eq(uncolor(createFail(cwd, test, error)), expected)
            });
        });

        describe('a title', () => {

            it('is the title of the failed test', () => {
                eqLines(1, 1, uncolor(createFail(cwd, test, error)), '*a test name*');
            });

            it('includes its parents when available', () => {
                const test = {
                    title: 'a test name',
                    parent: {
                        title: 'p1',
                        parent: {
                            title: 'p2'
                        }
                    }
                };
                eqLines(1, 1, uncolor(createFail(cwd, test, error)), '*p2 > p1 > The title*')
            });
        });

        describe('an error message', () => {

            describe('when an assertion error', () => {

                it('is the diff of the actual and expected results', () => {
                    eqLines(3, 3, uncolor(createFail(cwd, test, error)), '[word1]{word2}');
                });

                // error.matcherResult.actual.keys, error.matcherResult.expected.keys
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
            });

            describe('when a regular error', () => {

                it('is the error name and message', () => {
                    const error = new Error('Crash!');
                    eqLines(3, 3, uncolor(createFail(cwd, test, error)), 'Error: Crash!');
                });

                it('includes nested error', () => {
                    const error = new Error('Crash!', { cause: new TypeError('Burn!') });
                    eqLines(3, 3, uncolor(createFail(cwd, test, error)), 'Error: Crash! => TypeError: Burn!');
                });
            });

            describe('a stack trace', () => {

                it('has no useless "prefixes"', () => {
                    const error = new Error('Crash!');
                    error.stack = dedent`
                        'at Context.<anonymous> (test/formatTest.js:31:51)'
                        'at Context.<anonymous> (test/formatTest.js:31:51)'
                        'at Context.<anonymous> (test/formatTest.js:31:51)'
                    `
                    eqLines(5, 5, uncolor(createFail(cwd, test, error)), '_at Context.<anonymous> (test/formatTest.js:31:51)_');
                });

                it('has no stack frames from internals', () => {
                    const error = new Error('Crash!');
                    error.stack = dedent`
                        'at Context.<anonymous> (test/formatTest.js:31:51)'
                        'at Context.<anonymous> (test/formatTest.js:31:51)'
                        'at Context.<anonymous> (test/formatTest.js:31:51)'
                    `
                    eqLines(5, 5, uncolor(createFail(cwd, test, error)), '_at Context.<anonymous> (test/formatTest.js:31:51)_');
                });
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

