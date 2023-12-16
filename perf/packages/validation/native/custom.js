const _ = function pipe() {
    let e = arguments[0];
    for (let t = 1, p = arguments.length; t < p; t++) {
        e = arguments[t](e);
    }
    return e;
};

const number = value => typeof value === 'number';
const string = value => typeof value === 'string';
const boolean = value => typeof value === 'boolean';
const length = o => Object.keys(o).length;
const entries = Object.entries;

const vArray = [
    'number', number, // -
    'negNumber', number,
    'maxNumber', number,
    'string', string,
    'longString', string,
    'boolean', boolean,
    // 'deeplyNested', {
    //     foo: string,
    //     num: number,
    //     bool: boolean,
    // },
];

const vObject = {
    number: number,
    negNumber: number,
    maxNumber: number,
    string: string,
    longString: string,
    boolean: boolean,
    deeplyNested: {
      foo: string,
      num: number,
      bool: boolean,
    },
  };

  // same speed
// const array = data => {
//     if (!vArray[1](data['number'])) throw Error('wrong');
//     if (!vArray[3](data['negNumber'])) throw Error('wrong');
//     if (!vArray[5](data['maxNumber'])) throw Error('wrong');
//     if (!vArray[7](data['string'])) throw Error('wrong');
//     if (!vArray[9](data['longString'])) throw Error('wrong');
//     if (!vArray[11](data['boolean'])) throw Error('wrong');
//     return true;
// };

//   // same speed
// const array = data => {
//     if (!vArray[1](data.number)) throw Error('wrong');
//     if (!vArray[3](data.negNumber)) throw Error('wrong');
//     if (!vArray[5](data.maxNumber)) throw Error('wrong');
//     if (!vArray[7](data.string)) throw Error('wrong');
//     if (!vArray[9](data.longString)) throw Error('wrong');
//     if (!vArray[11](data.boolean)) throw Error('wrong');
//     return true;
// };

// //   // same speed
// const array = data => {
//     const a = vArray[0];
//     const b = vArray[2];
//     const c = vArray[4];
//     const d = vArray[6];
//     const e = vArray[8];
//     const f = vArray[10];
//     return () => {
//     if (!vArray[1](data[a])) throw Error('wrong');
//     if (!vArray[3](data[b])) throw Error('wrong');
//     if (!vArray[5](data[c])) throw Error('wrong');
//     if (!vArray[7](data[d])) throw Error('wrong');
//     if (!vArray[9](data[e])) throw Error('wrong');
//     if (!vArray[11](data[f])) throw Error('wrong');
//     return true;
// }};

// 3x slower
const array = data => {
    const vArray2 = [
        'number', number, // -
        'negNumber', number,
        'maxNumber', number,
        'string', string,
        'longString', string,
        'boolean', boolean,
        // 'deeplyNested', {
        //     foo: string,
        //     num: number,
        //     bool: boolean,
        // },
    ];

    return () => {
        if (!vArray2[1](data[vArray2[0]])) throw Error('wrong');
        if (!vArray2[3](data[vArray2[2]])) throw Error('wrong');
        if (!vArray2[5](data[vArray2[4]])) throw Error('wrong');
        if (!vArray2[7](data[vArray2[6]])) throw Error('wrong');
        if (!vArray2[9](data[vArray2[8]])) throw Error('wrong');
        if (!vArray2[11](data[vArray2[10]])) throw Error('wrong');
        return true;
    }
};

// 3x slower
// const array = data => {
//     if (!vArray[1](data[vArray[0]])) throw Error('wrong');
//     if (!vArray[3](data[vArray[2]])) throw Error('wrong');
//     if (!vArray[5](data[vArray[4]])) throw Error('wrong');
//     if (!vArray[7](data[vArray[6]])) throw Error('wrong');
//     if (!vArray[9](data[vArray[8]])) throw Error('wrong');
//     if (!vArray[11](data[vArray[10]])) throw Error('wrong');
//     return true;
// };

const compile = v => {
    const vs = {
        number: x => `value => typeof value === 'number'`
    }
    let fn = '';
    for (const [key, value] of entries(v)) {
        fn += `if (typeof data.${key} !== '${value}' ) throw Error('wrong');`

    }
}

const base = data => {
    if (!number(data.number)) throw Error('wrong');
    if (!number(data.negNumber)) throw Error('wrong');
    if (!number(data.maxNumber)) throw Error('wrong');
    if (!string(data.string)) throw Error('wrong');
    if (!string(data.longString)) throw Error('wrong');
    if (!boolean(data.boolean)) throw Error('wrong');
    // if (!string(data.deeplyNested.foo)) throw Error('wrong');
    // if (!number(data.deeplyNested.num)) throw Error('wrong');
    // if (!boolean(data.deeplyNested.bool)) throw Error('wrong');
    // if (length(data) !== 7 || length(data.deeplyNested) !== 3) throw new Error("Extra keys");
    return true;
};

export default { base, array };

const validateData = Object.freeze({
    number: 1,
    negNumber: -1,
    maxNumber: Number.MAX_VALUE,
    string: 'string',
    longString:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Vivendum intellegat et qui, ei denique consequuntur vix. Semper aeterno percipit ut his, sea ex utinam referrentur repudiandae. No epicuri hendrerit consetetur sit, sit dicta adipiscing ex, in facete detracto deterruisset duo. Quot populo ad qui. Sit fugit nostrum et. Ad per diam dicant interesset, lorem iusto sensibus ut sed. No dicam aperiam vis. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Ex nam agam veri, dicunt efficiantur ad qui, ad legere adversarium sit. Commune platonem mel id, brute adipiscing duo an. Vivendum intellegat et qui, ei denique consequuntur vix. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    boolean: true,
    // deeplyNested: {
    //   foo: 'bar',
    //   num: 1,
    //   bool: false,
    // },
  });

//  map(validateData)
