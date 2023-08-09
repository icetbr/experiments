/*
    observations
    - if inside function scope, can never test
    - the composing function never has logic to test
    - testing one part still needs to pass data to the other parts
      - if they fail, results in a false positive
    - needs all parts to work at the same time, can't test them in isolation
    - in the fail example, formatting is an agregator, you're actually doing 3 separate things
    - don't want to have related functions far away
    - do I want to proliferate the ammount of public classes that no one will ever use?
    thinking
    - if composing is in a separate file, still will need to open 2 files to understand the logic
    - private: used just here, public: used anywhere
    decision
    - because there is no value having separate functions, keeping them local
*/

/*
    SEPARATION BY LEVEL
    . all functions used by other functions need to be in another module
      . a module can be inside the same file
    + favors unit testing
    - loss of locality
    . can be in the same file, but if you have +1 function on the same level
      - their dependencies intermingle
      - get further appart from where their used!
*/
// ordered by the order they are used
const formatDuration = duration => `(${duration} ms) \n\n)`;
const getAncestorsTitle = o => o.title ? [...getAncestors(o.parent), o.title] : [];
const buildTitle = test => getAncestorsTitle(test).join(' > ');
const formatMessage = error => {}
const cleanStack = (cwd, error) => {};

export const
    complete = (duration, testsCount) => dedent`
        ${green(testsCount + ' tests')} + ${dim(formatDuration(duration))}),
    `,

    fail = (cwd, test, error) => dedent`
        ${buildTitle(test)}
        ${formatMessage(error)}
        ${dim(cleanStack(cwd, error))}
    `

// MODULE

export const
    complete = (duration, testsCount) => {
        const formatDuration = duration => `(${duration} ms) \n\n)`;

        return dedent`
            ${green(testsCount + ' tests')} + ${dim(formatDuration(duration))}),
        `;
    },

    fail = (cwd, test, error) => {
        const getAncestorsTitle = o => o.title ? [...getAncestors(o.parent), o.title] : [];
        const buildTitle = test => getAncestorsTitle(test).join(' > ');
        const formatMessage = error => {}
        const cleanStack = (cwd, error) => {};

        return dedent`
            ${buildTitle(test)}
            ${formatMessage(error)}
            ${dim(cleanStack(cwd, error))}
        `;
    }

// export 2 functions to facilitate testing: create + format
// still needs a lot of test preparation to test just one thing
export const
    createFail = (cwd, test, error) => ({
        title: buildTitle(test),
        message: formatMessage(error),
        stack: cleanStack(cwd, error),
    })

    formatFail = ({ title, message, stack }) => dedent`
        ${title}
        ${message}
        ${dim(stack)}
    `

// export all
// - increases the API surface
const getAncestorsTitles = o => o.title ? [...getAncestorsTitles(o.parent), o.title] : [];

export const
    buildTitle = test => getAncestorsTitle(test).join(' > '),       // belongs to format, but ONLY used by createFail
    formatMessage = error => {},                                    // belongs to format, but ONLY used by createFail
    cleanStack = (cwd, error) => {);                                // belongs to format, but ONLY used by createFail
    fail = (cwd, test, error) => dedent``;                          // formatFail + createFail ?





// pipe
export const
    createFail = () => {},
    formatFail = pipe(
        createFail,
        ({ title, message, stack }) => ` `
    )

// create + fail alt1
export const fail = {
    // create = (cwd, test, error) => pipe(buildTitle, formatMessage, cleanStack),
    create = (cwd, test, error) => {},
}

// create + fail alt2
export const fail = {
    create = (cwd, test, error) => {},
    format = (cwd, test, error) => {
        const { title, message, stack } = createFail();
        return {

        }
    },
    format = ({ title, message, stack }) => ``
}
