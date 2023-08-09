// @ts-check


// NORMAL: WORKS
/**
 * Function comments
 *
 * @param {string} aString DDV1
 * @param {number} aNumber DDV2
 */
function getPerson1(aString, aNumber = 2) {}
getPerson1('aaaa', 12)


// INLINE: DOESN'T WORK, only type, and just the type, not the description
/**
 * Function comments
 */
function getPerson2(/** @type {string} aString some description*/ aString, /** @param {number} aNumber some description*/ aNumber) {}
getPerson2('aaaa', 12)

// DESTRUCTURED: WORKS* (the main function doesn't show the params)
/**
* @param {object} o
* @param o.aString some description 1
* @param o.aNumber some description 2
*/
function getPerson3({aString, aNumber = 2}) {}
getPerson3({aString: 'a', aNumber: 2})

// MARKDOWN
/**
* - **aString**   some description 1a
* - **aNumber**   some description 2a
*/
function getPerson3a({aString, aNumber}) {}
getPerson3a({aString: 'a', aNumber: 2})

function getPerson3b({aString, aNumber} = { aString: 'a', aNumber: 2 }) {}
function getPerson3c({aString, aNumber} = { aString: 'a', aNumber: 2 }) {}
getPerson3({aString: 'a', aNumber: 2})
getPerson3b({aString: 'a', aNumber: 2})

// DESTRUCTURED TYPEDEF: WORKS
/**
 * @typedef {object} x
 * @property {string} aString some description 1
 * @property {number} aNumber some description 2
 */
/** @param {x} some description 3 */
function getPerson4({aString, aNumber}) {}
getPerson4({aString: 'a', aNumber: 2})


// DESTRUCTURED INLINE: DOESN'T WORK
function getPerson5({
    /** @type {string} some description 1 */
    aString,

    /** @param {number} some description 2 */
    aNumber
}) {}
getPerson5({aString: 'a', aNumber: 2})


// DEFAULT OBJECT COMMENTED WORKS
function getPerson6({
    aString,
    aNumber
} = {
    /** @type {string} some description 1 */
    aString: 'a',

    /** @param {number} some description 2 */
    aNumber: 1
}) {}
getPerson6({aString: 'a', aNumber: 2})


// DEFAULT VALUES WORKS for types
function getPerson7({
    /** @type {string} some description 1 */
    aString = 'a',

    /** @param {number} some description 2 */
    aNumber = 1
}) {}
getPerson7({aString: 'a', aNumber: 2})


// DOC REUSE in function, properties, return
/**
* @param {object} o desc 0
* @param {string} o.aString some description 1
* @param {number} o.aNumber some description 2
* @returns {object} o desc 4
*/
const getPerson8 = ({aString, aNumber}) => ({ aString, aNumber })
const n = getPerson8({aString: 'a', aNumber: 2})

// @EXAMPLE TAG
/**
* @param {string} aString DDV1 @example const aString = 1
* @param {number} aNumber DDV2 @example const aNumber = 2
*/
function getPerson9(aString, aNumber) {}
getPerson9('aaa', 2)

/**
* @param {string} aString DDV1
```js
const aString = 2
```
* @param {number} aNumber DDV2 `const aNumber = 2`
*/
function getPerson10(aString, aNumber) {}
getPerson10('aaa', 2)


// default parameters vs Destructured defaults
// https://betterprogramming.pub/type-checking-in-vscode-without-typescript-eba92161cd08
const defaultProps = {
    prop1: 'd',
    prop2: 'e',
  }
  const cCard = ({ prop1 = 'a', prop2 = 'b', prop3 = 'c' } = defaultProps ) => ({}
//   const cCard = (prop3 = '', { prop1, prop4 = 'a' } ) => ({}
//   const cCard = (prop3, prop4 ) => ({}

  );

//   const c =cCard('a', { prop: 1, prop4: 2, prop2: 3 })
  const c =cCard({prop1: 'a', prop2: 'b' })




function getPerson99({ aString, aNumber, aBoolean = true }) {}
// getPerson99({ aString: 'aaaa',  });


function getPerson100({aString, aNumber, aBoolean = true}) {}
getPerson100({aString: 'a', aNumber: 2, })

// DESTRUCTURED 2: WORKS
/**
* @param {{
    aString: string
    aNumber: number
}} o
*/
function getPerson91({aString, aNumber}) {}
getPerson91({aString: 'a', aNumber: 2})



/**
 * A function
 *
 * @param foo A param
 * @param { bar } Another param
 * @param bar Another param
 */
 function foo(foo, { bar }) {
    bar;
    foo;
}

// MARKDOWN

/**
  - name     must be a noun and plural
  - schema   the resource's fields and their validations
  - uri      the resource's fields and their validations
*/
const createRoutes = ({
  name,
  schema,
  uri = `/companies/{company}/${name}`,
}) => ({ name, schema })


/**
 * @param {number} arg.id - This param description won't show up
 */
 function foo2({ id }) {}
 foo2()

 /**
 * @param {Object.<string, any>} arg
 * @param {number} arg.id - This param description will show up
 */
function foo3({ id }) {}
foo3()


/**
 * Entries Object.
 * @typedef {Object.<string, any>} requiredArguments
 * @property {string} timeSince
 * @property {string} timeUntil
 */
/**
 *
 * @param {requiredArguments} param
 */
 async function getEntries({timeSince, timeUntil}) {}
//  getEntries({timeS})

/**
 * This function syncs the player configuration available in the server with the one sent by the player.
 * @param {object} argument
 * @param {string} playerID - ID of the player which configuration is going to be synced.
 * @param {Object} playerStatus - Object representing the status of the player.
 * @param {boolean} isTest - Indicate if this action is a test or not.
 * @param {Object} playerUpdates - Object representing the updates sent by the player.
 * @returns Resolves if the configs have been synced succesfully. Rejects otherwise.
 */
 function getConfig({playerID, playerStatus, isTest, playerUpdates}) {}
//  getConfig({pla})



/**
 * Entries Object.
 * @typedef {Object.<string, any>} requiredArguments
 * @property {string} timeSince
 * @property {string} timeUntil
 */
/**
 *
 * @param {requiredArguments} param
 */
 async function getEntries({timeSince = '2', timeUntil}) {}


 /**
  * It's a function declaration.
  *
  * @function
  * @name x1
  * @kind variable
  * @param {string} name?
  * @param {{ name: string age: number }} schema?
  * @param {string} uri?
  * @returns {void}
  */
 const x1 = (
  name = 'employees',                           /** must be a noun and plural */
  schema = { name: 'Joe', age: 25 },            // the resource's fields and their validations
  uri = `/companies/{company}/${name}`,
) => {}
x1()



function getPerson113({aString, aNumber = 2}) {}
getPerson113({aString: 'a', aNumber: 2})



/**
 * A number, or a string containing a number.
 * @typedef {(Object)} NumberLike
 * @property {string} name The name of the person.
 */

/**
 * Set the magic number.
 * @param {NumberLike} x
 */
 function setMagicNumber({a = 1, name = 2}) {
  return a
}
setMagicNumber()

/** {@link Person2} */

/** @param {Person2} o */
function p2n({ a, b = '2' }) {}

p2n({a: 2, b: 3})


/** @param {Person2} o */
/**
 * @type {Person2} person
 */
 const person2 = {
  name: 'Joe',
  age: 32,
}
/**
 * A person object with a name and age.
 * @typedef {Object} Person2
 */


/**
 * description 0
 * @typedef {object} DestructuredUser
 * @property {string} userName description 1
 * @property {number} age description 2
 * @property {number} age2 description 3
 */
/** @param {DestructuredUser} param */
function logUser({userName, age}){
	console.log(`User ${userName} is ${age} years old.`);
}

/**
 * @callback sendEmail
 * @param {string} to
 * @param {string} body
 * @returns {boolean} to indicate success or failure
 */

/**
 * @param {sendEmail} sender - function to send the email
 */
 function createEmailService(sender) {  }




/**
 * Set the magic number.
 * @param {NumberLike} x
 */
 function setMagicNumber3({a = 1, name = 2}) {
  return a
}

/** {@link Person23 */

// function p3n({ a, b = '2' }) {}
/** @param {Person3} p3 */
function p3n(p3) { return p3}

p3n({a: 2, b: 3})



/** @param {Person3} o */
/**
 * @type {Person3} person
 */
 const person3 = {
  name: 'Joe',
  age: 32,
}

/**
 * A person object with a name and age.
 * @typedef {Object} Person3
 * @property {string} userName description 1
 * @property {number} age description 2
 */

















