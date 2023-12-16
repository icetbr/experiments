// export default {
//     /** @alias bar */
//     min: n => s => s > n,
//     max: n => s => s < n,
//     email: s => s.includes('@'),
//     string: (...stringValidators) => string => stringValidators.map(v => v(string)),
// };

/** namespace validation */
export const min = n => s => s > n;
export const max = n => s => s < n;
export const email = s => s.includes('@');
export const string = (...stringValidators) => string => stringValidators.map(v => v(string));

