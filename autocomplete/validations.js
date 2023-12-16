/**
 * My namespace.
 * @namespace Validations
 */
export const v = {
    /**
     *  @memberof Validations#
     */
    a: 1,
    b: 2
};

export const min = n => s => s > n;
export const max = n => s => s < n;
export const email = s => s.includes('@');
export const string = (...stringValidators) => string => stringValidators.map(v => v(string));
