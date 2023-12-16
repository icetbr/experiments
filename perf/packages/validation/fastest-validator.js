import Validator from 'fastest-validator';

// const v = new Validator({ debug: true });
const v = new Validator();
const dataType = {
  number: { type: 'number' },
  negNumber: { type: 'number' },
  maxNumber: { type: 'number' },
  string: { type: 'string' },
  longString: { type: 'string' },
  boolean: { type: 'string' },
  deeplyNested: { type: "object", strict: true, props: {
    foo: { type: 'string' },
    num: { type: 'number' },
    bool: { type: 'boolean' },
  }},
};
const check = v.compile(dataType);

// console.log(check.toString())

export default {
    ['icebob-fastest-validator']: (value) => {
        return check(value);
    },
};

