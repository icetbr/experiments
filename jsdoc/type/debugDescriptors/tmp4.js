const util = require('util');
const a = {
    b: 1,
    c() { return 1 },
    d: {
        e: 3,
        f: 4,
    },
    g: new Date(),
    h() { return 2 }
    // customPropertiesGenerator() {
    //     const properties = Object.create(this.__proto__);
    //     // return Object.assign(properties, this, { customProp1: 'aa1', customProp2: 'bb2' });
    //     return Object.assign(this, { customProp1: 'aa1', customProp2: 'bb2' });
    // }
}
// a.__proto__.customPropertiesGenerator = function () {
//     const methods = Object.getOwnPropertyNames(this).filter(item => typeof this[item] === 'function')
//     const fields = Object.getOwnPropertyNames(this).filter(item => typeof this[item] !== 'function')

//     return Object.assign({}, this, methods, fields);
//     // return { ddv: '1'}
// }

class Foo { get getter() { } }
class Bar {
    constructor() {
        this.realProp = 'cc3';
    }
    customPropertiesGenerator() {
        const properties = Object.create(this.__proto__);
        return Object.assign(properties, { ['customProp1']: 'aa1', ['\u200bcustomProp2']: 'bb2' });
        // return { ddv: '1'}
    }
    toString() {
        const properties = Object.create(this.__proto__);
        return Object.assign(properties, { ['customProp1']: 'aa1', ['\u200bcustomProp2']: 'bb2' });
    }
}
const x2 = new Bar();
const x = 10;

console.log(x2)

const x1 = new Date();
// const util = require('util')
        // toString: () => 'ddv1',
        // valueOf: () => 'ddv2',
        // [util.inspect.custom]: () => 'ddv3',