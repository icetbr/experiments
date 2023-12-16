import * as Froebel from "froebel";

const join = (...chars: string[]) => chars.join('')
const x1 = Froebel.pipe(join, parseInt)('1', '2', '3')  // -> 123

const square = (n: number) => n ** 2

// this is equivalent to: square(square(square(2)))
const x2 = Froebel.pipe(square, square, square)(2)  // -> 256

// also works with promises:
// fetchNumber :: async () => Promise<number>
// const x3 = Froebel.pipe(fetchNumber, n => n.toString())  // async () => Promise<string>

interface Pipe {
    <A>(value: A): A;
    <A, B>(value: A, fn1: (input: A) => B): B;
    <A, B, C>(value: A, fn1: (input: A) => B, fn2: (input: B) => C): C;
    <A, B, C, D>(
      value: A,
      fn1: (input: A) => B,
      fn2: (input: B) => C,
      fn3: (input: C) => D
    ): D;
    <A, B, C, D, E>(
      value: A,
      fn1: (input: A) => B,
      fn2: (input: B) => C,
      fn3: (input: C) => D,
      fn4: (input: D) => E
    ): E;
    // ... and so on
  }

  const pipe: Pipe = (value: any, ...fns: Function[]): unknown => {
    return fns.reduce((acc, fn) => fn(acc), value);
  };

// const y1 = pipe(join, parseInt)('1', '2', '3')  // -> 123
