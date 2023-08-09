const w = fn => (...args) => {
    console.log(fn.name)
    fn(...args)
    console.log(2)
}

const _createReckons = employeeIds => {
    const reckons = [];
}
const createReckons = time(_createReckons)

let createReckons = employeeIds => {
    const reckons = [];
}
createReckons = time(createReckons)

const createReckons = time(function createReckons() {
    const reckons = [];
})

const createReckons = time(createReckons)
function createReckons() {
    const reckons = [];
}

// add f name to erro stack?
// @measure                            // 1
// a = measure(a)                      // 2
// let a = (t) => {                    // 3
// const a = measure(function a (t) {  // 4
// const a = measure(t =>              // 5
let a = (t) => {
    throw Error('ddd')
    console.log(t)
};
a = w(a)
try {
    a(3)
} catch(e) {
    console.log(e)
}
// exports.a = a
// module.exports = { a }

// exports.a(1)

// const a = w(t => {
//     console.log(t)
// });



// function a(t) {
//     console.log(t)
// }
// a = w(a)
// a(1)

// let a = (t) => {
//     console.log(t)
// }
// a = w(a)
// a(1)

// let a = w(() => {
//     console.log(1)
// })
// a(1)

// const x = {
//     a: w((t) => {
//         console.log(t)
//     })
// }
// x.a(1)

// const x = {
//     a: (t) => {
//         console.log(t)
//     },
//     am: (t) => w(x.a)(t)
// }
// x.am(1)


// exports.run = measure(populateDb);

// exports.: mais facil transformar funcao como publica, sem precisar mexer na assinatura