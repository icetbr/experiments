/*
    https://github.com/microsoft/vscode/issues/86564       Support local paths in hover MarkdownString
    https://github.com/microsoft/TypeScript/issues/47718   Provide way to link to other files from JSDoc comments
    https://github.com/microsoft/vscode/issues/139983      Despite disabling JSDoc autocompletion, VSCode still completes doc comments
    https://github.com/microsoft/vscode/issues/98143       completeJSDocs: false does not fully disable autocompletion
    https://github.com/jsdoc/jsdoc/issues/1645             Improve module ergonomics
    https://mtsknn.fi/blog/how-to-remember-markdowns-link-syntax/
    https://daringfireball.net/projects/markdown/syntax
*/

const jsdocLinkTarget = '';

/**
    | ____________ | ______________________ | ______________________                        |
    | ------------ | ---------------------- | --------------------------------------------- |
    | FAILS        | no special syntax      | ./jsdocLinkTarget.js                          |
    | WORKS*       | proper markdown        | [jsdocLinkTarget](./jsdocLinkTarget.js)       |
    | FAILS        | symbol as target       | [jsdocLinkTarget](./jsdocLinkTarget.js#a1)    |
    | FAILS        | line as target         | [jsdocLinkTarget](./jsdocLinkTarget.js#L3)    |
    | FAILS        | self link              | [./jsdocLinkTarget.js]()                      |
    | FAILS        | reference              | [jsdocLinkTarget][1]                          |
    | FAILS        | jsdoc link             | {@link ./jsdocLinkTarget.js}                  |
    | WORKS**      | known symbol           | {@link jsdocLinkTarget}                       |
    | FAILS        | jsdoc import           | {@link import('./jsdocLinkTarget.js') t}      |
    | FAILS        | file protocol          | file://./jsdocLinkTarget.js                   |
    | WORKS        | http protocol          | https://www.google.com                        |
    | FAILS        | ts reference style     | /// <reference path="./jsdocLinkTarget.js" /> |
    | FAILS        | module syntax          | {@link module:api.jsdocLinkTarget}            |

    * doens't work for relative links
    ** known symbols can be local, imported or global. For global, the symbol must be defined in a file without any exports
 */
const a = () => {};


// @filename: main.js
/**
 * {@link import("./types").Pet}
 *
 * @param { import("./types").Pet } p
 */
 function walk(p) {
    console.log(`Walking ${p.name}...`);
  }