/**
 * A dummy type module
 * @module MyType
 */

/**
 * Dummy type
 */
 export class MyType {
    /**
     * Creates a MyType
     * @param {Number} foo Some var
     * @param {Number} bar Some other var
     */
    constructor(foo, bar) {
        // this.foo = foo;
        // this.bar = bar;
    }

    navigate() {}

    /**  @typedef {function} module:MyType.navigate3 */
    navigate2() {}
}
