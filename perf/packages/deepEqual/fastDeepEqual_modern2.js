'use strict';

const isArray = Array.isArray;
const keys = Object.keys;

module.exports = function equal(a, b) {
    if (a === b) return true;

    // true if both NaN, false otherwise
    if (!(a && b && typeof a == 'object' && typeof b == 'object')) return a !== a && b !== b;

    if (isArray(a)) {
        if (a.length != b.length) return false;
        for (let i = 0; i < a.length; i++)
            if (!equal(a[i], b[i])) return false;
        return true;
    }

    const aKeys = keys(a);
    if (aKeys.length !== keys(b).length) return false;

    for (let i = 0; i < aKeys.length; i++) if (!b.hasOwnProperty(aKeys[i])) return false;

    for (let i = 0; i < aKeys.length; i++) {
        const key = aKeys[i];
        if (!equal(a[key], b[key])) return false;
    }

    return true;
};
