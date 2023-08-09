// CONCLUSIONS
// - you can be verbose, but consider how much that helps

// if vs ternary

const formatMessage = error => {
    if (error.matcherResult)             return diff(error.matcherResult.actual.keys, error.matcherResult.expected.keys);
    if (error.name === 'AssertionError') return diff(error.actual, error.expected);
    if (error.cause)                     return diff(error.actual, error.expected);
                                         return `${error.name}: ${error.message}`;
}

const formatMessage = error =>
    error.matcherResult             ? diff(error.matcherResult.actual.keys, error.matcherResult.expected.keys) :
    error.name === 'AssertionError' ? diff(error.actual, error.expected) :
    error.cause                     ? `${error.name}: ${error.message} => ${error.cause.name}: ${error.cause.message}` :
                                      `${error.name}: ${error.message}`;

// labeled
// - "forces" me to read the conditions unless I use them as a functions and put ouside
const formatMessage = error => {
    const isJestExpect    = error.matcherResult;
    const isRegularExpect = error.name === 'AssertionError'
    const isNestedError   = error.cause
    // const isRegularError  = !error.cause // if used, would need to return ull otherwise

    return
        isJestExpect    ? diff(error.matcherResult.actual.keys, error.matcherResult.expected.keys) :
        isRegularExpect ? diff(error.actual, error.expected) :
        isNestedError   ? `${error.name}: ${error.message} => ${error.cause.name}: ${error.cause.message}` :
                          `${error.name}: ${error.message}`;
}










// MISC
const formatMessage = {
    jestExpect  : error => diff(error.matcherResult.actual.keys, error.matcherResult.expected.keys),
    normalExpect: error => diff(error.actual, error.expected),
    nestedError : error => `${error.name}: ${error.message} => ${error.cause.name}: ${error.cause.message}`,
    regularError: error => `${error.name}: ${error.message}`,
}

const classifyError = error =>
    error.matcherResult             ? 'jestExpect' :
    error.name === 'AssertionError' ? 'regularExpect' :
    error.cause                     ? 'nestedError' :
                                      'regularError'


const isJestExpect    = error => error.matcherResult;
const isRegularExpect = error => error.name === 'AssertionError'
const isNestedError   = error => error.cause
const isRegularError  = error => !error.cause

const formatRegularMessage = error => error.cause
    ? `${error.name}: ${error.message} => ${error.cause.name}: ${error.cause.message}`
    : `${error.name}: ${error.message}`;

const formatMessage = error => isAssertionError(error)
    ? formatAssertionMessage(error)
    : formatRegularMessage(error)


const formatMessage = error =>
    error.matcherResult             ? diff(error.matcherResult.actual.keys, error.matcherResult.expected.keys) :         // jest expect
    error.name === 'AssertionError' ? diff(error.actual, error.expected) :                                               // normal expect
    error.cause                     ? `${error.name}: ${error.message} => ${error.cause.name}: ${error.cause.message}` : // nested error
                                      `${error.name}: ${error.message}`;                                                 // regular error



jestExpect () => error.matcherResult
error.matcherResult ? jestExpect () =>
const formatMessage = error =>
    jestExpect() => error.matcherResult ? diff(error.matcherResult.actual.keys, error.matcherResult.expected.keys) :         // jest expect
    error.name === 'AssertionError' ? diff(error.actual, error.expected) :                                               // normal expect
    error.cause                     ? `${error.name}: ${error.message} => ${error.cause.name}: ${error.cause.message}` : // nested error
                                      `${error.name}: ${error.message}`;                                                 // regular error

// overkill, bottom up flow hard to read
const formatJestExpect       = error => error.matcherResult && diff(error.matcherResult.actual.keys, error.matcherResult.expected.keys);
const formatRegular          = error => error.name === 'AssertionError' && diff(error.actual, error.expected);
const formatAssertionMessage = error => formatJestExpect(error) || formatRegularMessage(error)
const formatMessage          = error => formatAssertionMessage(error) || formatRegularMessage(error)

const formatMessage = error => {
    const isJestExpect = error.matcherResult;
    if (isJestExpect) return diff(error.matcherResult.actual.keys, error.matcherResult.expected.keys);

    const isRegularExpect = error.name === 'AssertionError';
    if (isRegularExpect) return diff(error.actual, error.expected);
}```
