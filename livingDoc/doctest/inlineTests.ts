// const { assertStrictEqual:eq } = require('node:assert');
import { deepStrictEqual as eq } from 'node:assert';
const { log } = console;

// - 1000 => 10.00
export const ensureHasDecimal = s = s;

/**
 * ```js
 * a => b
 * b => c
 * var x = { a: 1 }
 * ```
 */
var x = { a: 1 }
export const ensureHasDecimal1 = string =>
    string.charAt(-2) === ',' ? string.replace(',', '.') :
                                string.slice(0, -2) + '.' + string.slice(-2);

if (import.meta.vitest) {
    eq(ensureHasDecimal(2), 10)
}
export const ensureHasDecimal2 = string =>
    string.charAt(-2) === ',' ? string.replace(',', '.') :
                                string.slice(0, -2) + '.' + string.slice(-2);

export const ensureHasDecimal3 = s =>
    s.charAt(-2) === ',' ? s.replace(',', '.') :
                           s.slice(0, -2) + '.' + s.slice(-2);

if (import.meta.vitest) {
    eq(ensureHasDecimal(2), 10)
}
/**
 * @example
 * var x = { a: 1 }
 *
 */
export const ensureHasDecimal4 = s =>
    charAt(s, -2) === ',' ? replace(s, ',', '.') :
                            s.slice(0, -2) + '.' + s.slice(-2);
// a => b
// c => d
export const ensureHasDecimal5 = _(
    charAt(-2) === ',' ? replace(',', '.') :
                         slice(0, -2) + '.' + slice(-2);
);

export const ensureHasDecimal6 = _(
    S.charAt(-2) === ',' ? S.replace(',', '.') :
                           S.insert(-2, '.')
);

// PAREI: ver que mconsegue inferir melhor o toPlainObject(,senao, ir p/ rescript pela inferencia?)


// const stringToMoney = {
//     // 10.00 => 10,00
//     toDb: float => String(float.toFixed(2)).replace('.', ','),

//     @t(10.00, 10,00)
//     fromDb: string => parseFloat(ensureHasDecimal(string)) || 0,
// };


// @t(10.00, 10,00)
// log(parseFloat('.10'))
// eq(ensureHasDecimal('100'), '1.00')
// eq(ensureHasDecimal('10'), '.10')
// eq(ensureHasDecimal('1'), '0.01')
// where: {
//     ['a', 'b', 'c'] => Tip 1: a | Tip 2: b | Tip 3: c
// }
