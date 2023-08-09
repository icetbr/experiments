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

const validator2 = {
  number: 'number',
  negNumber: 'number',
  maxNumber: 'number',
  string: 'string',
  longString: 'string',
  boolean: 'boolean',
  deeplyNested: {
    foo: 'string',
    num: 'number',
    bool: 'boolean',
  },
};

const compile2 = o => {
  let result = '';
    Object.entries(o).forEach(([key, value]) => {
      result += `if (typeof data.${key} !== '${value}') throw Error('wrong')\n`;
    })
    result += 'return true;'
    return new Function('data', result);
  };
// const val = compile2(validator2);

const compile = data => {
  if (typeof data.number !== 'number') throw Error('wrong');
  if (typeof data.negNumber !== 'number') throw Error('wrong');
  if (typeof data.maxNumber !== 'number') throw Error('wrong');
  if (typeof data.longString !== 'string') throw Error('wrong');
  if (typeof data.string !== 'string') throw Error('wrong');
  if (typeof data.boolean !== 'boolean') throw Error('wrong');
  if (typeof data.deeplyNested.foo !== 'string') throw Error('wrong');
  if (typeof data.deeplyNested.num !== 'number') throw Error('wrong');
  if (typeof data.deeplyNested.bool !== 'boolean') throw Error('wrong');
  if(!(3 === Object.keys(data.deeplyNested).length && 7 === Object.keys(data).length)) throw Error('wrong')

  return true;
}

export default {
  ['nativeLoop1']: data => {
    Object.entries(data).forEach(([key, value]) => {
      if (!validator[key](value)) throw Error('error');
    })
    return true;
  },

  ['nativeLoop2']: data => {
    const e = Object.entries(data);
    for (let i = 0; i < e.length; i++) {
      const key = e[i][0];
      const value = e[i][1];
      if (!validator[key](value)) throw Error('error');
    }
    return true;
  },
  ['compile']: data => compile(data),
  ['compile2']: data => val(data)
};

const data = Object.freeze({
  number: 1,
  negNumber: -1,
  maxNumber: Number.MAX_VALUE,
  string: 'string',
  longString:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Vivendum intellegat et qui, ei denique consequuntur vix. Semper aeterno percipit ut his, sea ex utinam referrentur repudiandae. No epicuri hendrerit consetetur sit, sit dicta adipiscing ex, in facete detracto deterruisset duo. Quot populo ad qui. Sit fugit nostrum et. Ad per diam dicant interesset, lorem iusto sensibus ut sed. No dicam aperiam vis. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Ex nam agam veri, dicunt efficiantur ad qui, ad legere adversarium sit. Commune platonem mel id, brute adipiscing duo an. Vivendum intellegat et qui, ei denique consequuntur vix. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  boolean: true,
  deeplyNested: {
    foo: 'bar',
    num: 1,
    bool: false,
  },
});

// console.log(val(data));
