const isObject = value => typeof value === 'object' && value !== null;
const isNumber = value => typeof value === 'number';
const isString = value => typeof value === 'string';
const isBoolean = value => typeof value === 'boolean';
const keys = Object.keys;
const length = o => Object.keys(o).length;

// const validateData = Object.freeze({
//     number: 1,
//     negNumber: -1,
//     maxNumber: Number.MAX_VALUE,
//     string: 'string',
//     longString:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Vivendum intellegat et qui, ei denique consequuntur vix. Semper aeterno percipit ut his, sea ex utinam referrentur repudiandae. No epicuri hendrerit consetetur sit, sit dicta adipiscing ex, in facete detracto deterruisset duo. Quot populo ad qui. Sit fugit nostrum et. Ad per diam dicant interesset, lorem iusto sensibus ut sed. No dicam aperiam vis. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Ex nam agam veri, dicunt efficiantur ad qui, ad legere adversarium sit. Commune platonem mel id, brute adipiscing duo an. Vivendum intellegat et qui, ei denique consequuntur vix. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
//     boolean: true,
//     deeplyNested: {
//       foo: 'bar',
//       num: 1,
//       bool: false,
//     },
//   });

export default {
    ['native']: data => {
        if (typeof data                   !== 'object' || data === null ) throw Error('wrong');
        if (typeof data.number            !== 'number' ) throw Error('wrong');
        if (typeof data.negNumber         !== 'number' ) throw Error('wrong');
        if (typeof data.maxNumber         !== 'number' ) throw Error('wrong');
        if (typeof data.longString        !== 'string' ) throw Error('wrong');
        if (typeof data.string            !== 'string' ) throw Error('wrong');
        if (typeof data.boolean           !== 'boolean') throw Error('wrong');
        if (typeof data.deeplyNested      !== 'object' || data === null ) throw Error('wrong');
        if (typeof data.deeplyNested.foo  !== 'string' ) throw Error('wrong');
        if (typeof data.deeplyNested.num  !== 'number' ) throw Error('wrong');
        if (typeof data.deeplyNested.bool !== 'boolean') throw Error('wrong');
        if(keys(data).length !== 7 || keys(data.deeplyNested).length !== 3) throw new Error("Extra keys");

        return true;
    },

    ['native optional chaining']: data => {
        if (typeof data?.number            !== 'number' ) throw Error('wrong');
        if (typeof data?.negNumber         !== 'number' ) throw Error('wrong');
        if (typeof data?.maxNumber         !== 'number' ) throw Error('wrong');
        if (typeof data?.longString        !== 'string' ) throw Error('wrong');
        if (typeof data?.string            !== 'string' ) throw Error('wrong');
        if (typeof data?.boolean           !== 'boolean') throw Error('wrong');
        if (typeof data?.deeplyNested?.foo  !== 'string' ) throw Error('wrong');
        if (typeof data?.deeplyNested?.num  !== 'number' ) throw Error('wrong');
        if (typeof data?.deeplyNested?.bool !== 'boolean') throw Error('wrong');
        if(keys(data).length !== 7 || keys(data?.deeplyNested).length !== 3) throw new Error("Extra keys");

        return true;
    },

    ['native skip string']: data => {
        if (typeof data                   !== 'object' || data === null ) throw Error('wrong');
        if (typeof data.number            !== 'number' ) throw Error('wrong');
        if (typeof data.negNumber         !== 'number' ) throw Error('wrong');
        if (typeof data.maxNumber         !== 'number' ) throw Error('wrong');
        if (typeof data.boolean           !== 'boolean') throw Error('wrong');
        if (typeof data.deeplyNested      !== 'object' || data === null ) throw Error('wrong');
        if (typeof data.deeplyNested.num  !== 'number' ) throw Error('wrong');
        if (typeof data.deeplyNested.bool !== 'boolean') throw Error('wrong');
        if(keys(data).length !== 7 || keys(data.deeplyNested).length !== 3) throw new Error("Extra keys");

        return true;
    },

    ['native fn']: data => {
        if (!isObject (data                  )) throw Error('wrong');
        if (!isNumber (data.number           )) throw Error('wrong');
        if (!isNumber (data.negNumber        )) throw Error('wrong');
        if (!isNumber (data.maxNumber        )) throw Error('wrong');
        if (!isString (data.string           )) throw Error('wrong');
        if (!isString (data.longString       )) throw Error('wrong');
        if (!isBoolean(data.boolean          )) throw Error('wrong');
        if (!isObject (data.deeplyNested     )) throw Error('wrong');
        if (!isString (data.deeplyNested.foo )) throw Error('wrong');
        if (!isNumber (data.deeplyNested.num )) throw Error('wrong');
        if (!isBoolean(data.deeplyNested.bool)) throw Error('wrong');
        // if(keys(data).length !== 7 || keys(data.deeplyNested).length !== 3) throw new Error("Extra keys");
        if(length(data) !== 7 || length(data.deeplyNested) !== 3) throw new Error("Extra keys");

        return true;
    },
};
