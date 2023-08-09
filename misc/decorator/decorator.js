const w = fn => (...args) => {
    console.log(fn.name)
    fn(...args)
    console.log(2)
}

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

const x = {};
const a = (t) => {
    console.log(t)
};
x.a = w(a)
x.a(1)
// exports.run = measure(populateDb);

// exports.: mais facil transformar funcao como publica, sem precisar mexer na assinatura