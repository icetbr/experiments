type Brand<K, T> = K & { __brand: T }

type V = Brand<boolean, "V">
const other = (s:string) => s.length ? true : false;
const email = (s:string):V => s.includes('@') as V;
const min5 = (s:string):V => s.length > 5 as V;
const size = (min: number, max:number) => (s:string) => s.length >= min && s.length <= max;
const string = (...args:((s: string) => V)[]) => (s: string) => args.every(x => x);
string()

const v = 'v';
const x = ():number => 1;
const y = ():string => 'y';
const z = (a:string) => a;

const aString = 'v';
const aNumberFn = ():number => 1;
const aStringFn = ():string => 'y';
const myFn = (a:string) => a;
// myFn()


// type ATypeName = () => string;
// class TimePeriod {
//     name: string | ATypeName;
// }

enum a1 {
    aa = 1,
    bb = 2,
    cc = 3,
}

type a2 = 'A' | 'B' | 'C'

type LocalAddresses = {
    home: string,
    work: string,
    grocery: string
  }

const string1 = (a: a2, b: a2, c: a2) => 'a';

string1("A",
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
