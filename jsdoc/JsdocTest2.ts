/**
 * @module foo1
 */

import { isValid2 } from './JsdocTest1';
// import { isValid } from './JsdocTest1';

// see the method [named of the method](JsdocTest1.ts)
/** {@link isValid} */
/** @see module:foo */
/** {@link [Link](JsdocTest1.ts)} */
/** {@link ./JsdocTest1.js} */
/** {@link [Link](./JsdocTest1.js#isValid)} */
const a = () => {
    // jsdoc1()
}
console.log(a)

/**
 * @see {module:bar.isValid4}
 */
const b = () => {

}



/**
 * someotherplace
 * @typedef {function} foo1.example_type/;
 * @param argument The victim
 * @since forever
 */
 const a1 = () => {}


/**
 * Used when making an example of the argument.
 * {@link foo1.example_type}
 */
 function example(argument) {
    //...
}


type x = {
    /** DDV4 */
    aString: string,
    aNumber: number
}

/** @param { aNumber } DDV2 */
function getPerson3({/** @type {string} DDV 1*/ aString, aNumber}:x = { /** @param DDV 1*/ aString: 'a', aNumber: 1 }) {
}

function getPerson3({/** @type {string} DDV 1*/ aString, aNumber}:x = { /** @param DDV 1*/ aString: 'a', aNumber: 1 }) {
}


getPerson3({aString: 'a', aNumber: 2})

