
const x = 0;

const y = 2;

/** A module. Its name is.
 * @module bar
 */
export const jsdoc1 = () => {
    console.log('a')
}


/** # isValid */
export const isValid = () => {
    console.log('a')
}

/**
 * @see isValid3
 */
export const isValid2 = () => {
    console.log('a')
}

/**
 * Generates a table head
 * @param {HTMLTableElement} table - The target HTML table
 * @param {Array} data - The array of cell header names
 */
export const isValid3 = () => {
    console.log('a')
}

/**
 * @typedef {function} module:bar.isValid4
 */
export const isValid4 = () => {
    console.log('a')
}

/**
 * const x = { aba: 1, b: 2 }
 * @typeDef {x} Point1
 *
 * @returns {Point1}
 */
export const isValid5a = () => {
    return ''
}

isValid5a().