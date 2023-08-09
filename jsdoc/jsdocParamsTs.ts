{
/** some description 0 */
type x = {
    /** some description 1 */
    aString: string,

    /** some description 2 */
    aNumber: number
}

function getPerson20({ aString: string = 'A', aNumber }:x) {}
getPerson20({aString: 'a', aNumber: 2})

}
{
/**
 * A person object with a name and age.
 *
 * @typedef {Object} Person3
 * @property {string} name The name of the person.
 * @property {number} age The age of the person.
 */


/**
 * @type {Person3} person3
 */
 const person3 = {
    name: 'Joe',
    age: 32
  }
}

/**
 * {@link x}
 */
function getPerson21(k:x) {}
getPerson21({aString: 'a', aNumber: 2})