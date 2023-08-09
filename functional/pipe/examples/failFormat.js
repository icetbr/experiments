/*
   - avoid get: build, format, clean, etc
*/
const

/** $ = testError */
fail = $ => (
// fail = (testError, $ = testError) => (
    $ = addTitle($),
    $ = addErrorMessage($),
    $ = addErrorStack($),
    $ = format($)
)

fail = (cwd, test, error) => {
    const testTitle = getAncestors('title', test).join(' > ');
    const errorMessage = formatErrorMessage(error);
    const errorStack = dim(cleanErrorStack(cwd, error));

    return dedent`

        ${testTitle}

        ${errorMessage}

        ${errorStack}
    `
}

fail = (cwd, test, error) => dedent`

    ${getTestTitle(test)}

    ${getErrorMessage(error)}

    ${getErrorStack(cwd, error)}
`

fail = (cwd, test, error) => dedent`

    ${test.title()}

    ${error.message()}

    ${error.stack()}
`

fail = (cwd, test, error) => dedent`

    ${getTitle(test)}

    ${getMessage(error)}

    ${getStack(error)}
`

fail = (cwd, test, error) => dedent`

    ${title(test)}

    ${message(error)}

    ${stack(error)}
`
