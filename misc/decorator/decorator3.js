// var PrettyError = require('pretty-error');
// var pe = new PrettyError();
const esp = require('error-stack-parser');
const StackTraceGPS = require('stacktrace-gps');
const StackTracey = require('stacktracey');
var callback = function myCallback(foundFunctionName) { console.log(foundFunctionName); };

// Such meta. Wow
var errback = function myErrback(error) { console.log(StackTrace.fromError(error)); };

const w = fn => (...args) => {
    console.log(fn.name)
    fn(...args)
    console.log(2)
}
// add f name to erro stack?
// @measure                            // 1
// a = measure(a)                      // 2
// let a = (t) => {                    // 3
// const a = measure(function a (t) {  // 4
// const a = measure(t =>              // 5


// let a = () => async (t) => {
//     throw Error('ddd')
//     console.log(t)
// };

let a = (t )=> {
    throw Error('ddd')
    console.log(t)
};
var gps = new StackTraceGPS();
a = w(a)


// (async () => {
    try {
        a(3)
    } catch (e) {
        let stack = new StackTracey(e)
        stack = stack.withSources()
        console.log(stack)
        // const s = esp.parse(e);
        // // console.log(s[1])
        // console.log('x')
        // const x = await gps.pinpoint(s[1])//.then(callback, errback);
        // console.log(x)
        // var renderedError = pe.render(e);
        // console.log(esp.parse(e))
    }
// })();

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