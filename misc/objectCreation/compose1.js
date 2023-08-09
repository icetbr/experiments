// https://medium.com/javascript-scene/the-hidden-treasures-of-object-composition-60cd89480381
// @ts-nocheck

const foo = {
  a() {
    return this.b;
  }
}

// Concatenative
const bar = {
  ...foo,
  b: 'b'
}

const bar = Object.assign({}, foo, {
  b: 'b'
})

// Prototypical
const bar = Object.assign(Object.create(foo), {
  b: 'b'
})

// Functional
const foo = () => ({
  a() {
    return this.b;
  }
})

const foo = (state) => ({
  a() {
    return state.b;
  }
})

let bar = {
  b: 'b'
}
foo(bar)

// Functional 2
const foo = o => ({
  a() {
    return this.b;
  },
  ...o
})

let bar = {
  b: 'b'
}
bar = foo(bar)


/**********************************************************************/
/**
 * 1) need to be in a function because it augments its properties
 * alternative: never direct access to property
 */

const base = (a) => {
  b: a.c
};

// alternative

const base = (a) => {
  b: () => this.c
};



const base = {
  a: 1,
  get b() {
    return this.a;
  }
}

const child = {
  ...base,
  a: 2
}

console.log(child.b)