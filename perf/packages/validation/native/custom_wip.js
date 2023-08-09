const _ = function pipe() {
    let e = arguments[0];
    for (let t = 1, p = arguments.length; t < p; t++) {
      e = arguments[t](e);
    }
    return e;
  };

const isNumber = value => typeof value === 'number';
const isString = value => typeof value === 'string';
const isBoolean = value => typeof value === 'boolean';

const validator = {
    number: isNumber,
    negNumber: isNumber,
    maxNumber: isNumber,
    string: isString,
    longString: isString,
    boolean: isBoolean,
    deeplyNested: {
      foo: isString,
      num: isNumber,
      bool: isBoolean,
    },
  };

export default {
    ['custom']: data => {
        if (!isNumber (data.number           )) throw Error('wrong');
        if (!isNumber (data.negNumber        )) throw Error('wrong');
        if (!isNumber (data.maxNumber        )) throw Error('wrong');
        if (!isString (data.string           )) throw Error('wrong');
        if (!isString (data.longString       )) throw Error('wrong');
        if (!isBoolean(data.boolean          )) throw Error('wrong');
        if (!isString (data.deeplyNested.foo )) throw Error('wrong');
        if (!isNumber (data.deeplyNested.num )) throw Error('wrong');
        if (!isBoolean(data.deeplyNested.bool)) throw Error('wrong');
        if(!(3 === Object.keys(data.deeplyNested).length && 7 === Object.keys(data).length)) throw Error('wrong')
        return true;
    },


};
