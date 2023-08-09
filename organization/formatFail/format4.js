import { green, dim } from './colors.js';
import { diff } from './diff.js';

getAncestorsTitle = o => o.title ? [...getAncestorsTitle(o.parent), o.title] : [],

export const
    buildTitle = test => getAncestorsTitle(test).join(' > '),

    formateMessage = error =>
        error.matcherResult             ? diff(error.matcherResult.actual.keys, error.matcherResult.expected.keys) :         // jest expect
        error.name === 'AssertionError' ? diff(error.actual, error.expected) :                                               // normal expect
        error.cause                     ? `${error.name}: ${error.message} => ${error.cause.name}: ${error.cause.message}` : // nested error
                                          `${error.name}: ${error.message}`,                                                 // regular error

    cleanStack = (cwd, error) =>
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
        .trim(),

    createFail = (cwd, test, error) => dedent`

        ${buildTitle(test}

        ${formatMessage(error)}

        ${dim(cleanStack(cwd, error))}


    `
 '
