import transpile from "ts-to-jsdoc";

const code1 = `
/**
 * Does stuff.
 * @param param It's a parameter.
 */
function doStuff(param: string): number {}
`;

const code = `
declare namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }

}

`;

const transpiledCode = transpile(code);
console.log(transpiledCode);
