export const
    createFail = (cwd, test, error) => {
        title: getAncestorsTitles(test).join(' > '),

        formatedErrorMessage:
            error.matcherResult             ? diff(error.matcherResult.actual.keys, error.matcherResult.expected.keys) :         // jest expect
            error.name === 'AssertionError' ? diff(error.actual, error.expected) :                                               // normal expect
            error.cause                     ? `${error.name}: ${error.message} => ${error.cause.name}: ${error.cause.message}` : // nested error
                                              `${error.name}: ${error.message}`,                                                 // regular error

        cleanedErrorStack: error.stack
            .split('\n')
            .filter(o => o.includes(cwd))
            .map(o => o
                .replace(`file://${cwd}/`, '')
                .replace(`${cwd}/`, '')
                .replace('at Arguments.', 'at ')
                .replace('at Context.', 'at ')
            )
            .join('\n')
            .trim()
    };




    formatedErrorMessage:
        /* jest expect   */  error.matcherResult             ? diff(error.matcherResult.actual.keys, error.matcherResult.expected.keys) :
        /* normal expect */  error.name === 'AssertionError' ? diff(error.actual, error.expected) :
        /* nested error  */  error.cause                     ? `${error.name}: ${error.message} => ${error.cause.name}: ${error.cause.message}` :
        /* normal error  */                                    `${error.name}: ${error.message}`,
