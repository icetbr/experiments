import { green, dim } from './colors.js';
import { diff } from './diff.js';

const getAncestorsTitle = o => o.title ? [...getAncestorsTitle(o.parent), o.title] : [];

const buildTitle = test => getAncestorsTitle(test).join(' > ');

const formatMessage = error =>
    error.matcherResult             ? diff(error.matcherResult.actual.keys, error.matcherResult.expected.keys) :         // jest expect
    error.name === 'AssertionError' ? diff(error.actual, error.expected) :                                               // normal expect
    error.cause                     ? `${error.name}: ${error.message} => ${error.cause.name}: ${error.cause.message}` : // nested error
                                      `${error.name}: ${error.message}`,                                                 // regular error

const cleanStack = (cwd, error) =>
    error.stack
    .split('\n')
    .filter(o => o.includes(cwd))
    .map(o => o
        .replace(`file://${cwd}/`, '')
        .replace(`${cwd}/`, '')
        .replace('at Arguments.', 'at ')
        .replace('at Context.', 'at ')
    )
    .join('\n')
    .trim();

export const
    complete = (duration, testsCount) => green(testsCount + ' tests') + dim(` (${duration} ms) \n\n`),

    createFail = (cwd, test, error) => dedent`

        ${buildTitle(test)}

        ${formatMessage(error)}

        ${dim(cleanStack(cwd, error))}


    `
