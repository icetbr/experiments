{
// DOC REUSE in function, properties, return

// DOESN'T WORK
/**
* @param {object} o desc 0
* @param {string} o.aString some description 1
* @param {number} o.aNumber some description 2
* @returns {object} o desc 4
*/
const getPerson8 = ({aString, aNumber}) => ({ aString, aNumber })
const n1 = getPerson8({aString: 'a', aNumber: 2})


// DOESN'T WORK
/**
 * @typedef {object} x
 * @property {string} aString some description 1
 * @property {number} aNumber some description 2
 *
 * @typedef {object} y
 * @property {string} aString
 * @property {number} aNumber
 */
/**
 * @param {x} some description 3
 * @returns {y} some description 4
 */
const getPerson4 = ({aString, aNumber}) => ({aString, aNumber})
const n2 = getPerson4({aString: 'a', aNumber: 2})

}



