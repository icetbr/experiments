// const other1 = (s: string) => s.length ? true : false; // WORKS
// const other2 = (a, b) => a + b; // rescript infers this, TS don't
// const string = (...stringValidators) => string =>
//     stringValidators.map(v => v(string));
// // const other = (s:string) => s.length ? true : false;
// // type Brand<K, T> = K & { __brand: T }
// // type V = Brand<boolean, "V">
// // const other = (s:string) => s.length ? true : false;
// // const email = (s:string):V => s.includes('@') as V;
// // const min5 = (s:string):V => s.length > 5 as V;
// // const size = (min: number, max:number) => (s:string) => s.length >= min && s.length <= max;
// // const string = (...args:((s: string) => V)[]) => (s: string) => args.every(x => x);
// // string()
// // const v = 'v';
// // const x = ():number => 1;
// // const y = ():string => 'y';
// // const z = (a:string) => a;
// // const aString = 'v';
// // const aNumberFn = ():number => 1;
// // const aStringFn = ():string => 'y';
// // const myFn = (a:string) => a;
// // myFn
