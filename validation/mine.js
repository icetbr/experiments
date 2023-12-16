"use strict";
var other = function (s) { return s.length ? true : false; };
var email = function (s) { return s.includes('@'); };
var min5 = function (s) { return s.length > 5; };
var size = function (min, max) { return function (s) { return s.length >= min && s.length <= max; }; };
var string = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (s) { return args.every(function (x) { return x; }); };
};
string();
var v = 'v';
var x = function () { return 1; };
var y = function () { return 'y'; };
var z = function (a) { return a; };
var aString = 'v';
var aNumberFn = function () { return 1; };
var aStringFn = function () { return 'y'; };
var myFn = function (a) { return a; };
// myFn()
// type ATypeName = () => string;
// class TimePeriod {
//     name: string | ATypeName;
// }
// string("email", "min5","size()" )
// function femail():V {
//     return '1' as V;
// }
// EXAMPLE 1 from discord
// const other = (s:string) => s.length ? true : false;
// const email = (s:string) => s.includes('@');
// const min5 = (s:string) => s.length > 5;
// const size = (min: number, max:number) => (s:string) => s.length >= min && s.length <= max;
// const string = (...args:(typeof email | typeof min5 | ReturnType<typeof size>)[]) => (s: string) => args.every(x => x(s));
// string(email, min5, size(5, 15))
// string(email, min5, size(5, 15), other)
// EXAMPLE 2 from discord
// const other = (s:string) => s.length ? true : false;
// const email = (s:string) => s.includes('@');
// const min5 = (s:string) => s.length > 5;
// // const size = (min: number, max:number) => (s:string) => s.length >= min && s.length <= max;
// const stringFuncs = { email, min5 }
// const string = (...args:(keyof typeof stringFuncs)[]) => (s: string) => args.every(x => stringFuncs[x](s));
// string("email", "min5")
// string("email", "min5", "other")
