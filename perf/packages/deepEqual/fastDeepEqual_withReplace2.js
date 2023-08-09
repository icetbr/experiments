'use strict';

const isArray = Array.isArray;
const keys = Object.keys;

module.exports = function equal(actual, expected) {
    if (expected === actual) return true;

    if (!(expected && actual && typeof expected == 'object' && typeof actual == 'object'))
        return expected !== expected && actual !== actual;

    if (isArray(expected)) {
        if (expected.length != actual.length) return false;
        for (let i = expected.length; i-- !== 0;)
            if (!equal(expected[i], actual[i])) return false;
        return true;
    }

    const expectedKeys = keys(expected);
    if (expectedKeys.length !== keys(actual).length) return false;

    for (let i = expectedKeys.length; i-- !== 0;) if (!actual.hasOwnProperty(expectedKeys[i])) return false;

    for (let i = expectedKeys.length; i-- !== 0;) {
        const key = expectedKeys[i];

        if (typeof expected[key] === 'function') {
            const matcherResult = expected[key](actual[key]);
            if (matcherResult.isTransformation) {
                actual[key] = matcherResult.actual;
                expected[key] = matcherResult.expected;
            } else {
                expected[key] = matcherResult.isMatch ? actual[key] : matcherResult.whenNotMatch;
            }
        }

        if (!equal(expected[key], actual[key])) return false;
    }

    return true;
};
