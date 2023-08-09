// https://stackoverflow.com/questions/4616202/self-references-in-object-literals-initializers

// GOAL: cleanner syntax for a consistent declaration of dependent properties

// IDEAL SOLUTION (doesn't work)
const foo = {
  a: 5,
  b: 6,
  c: a + b
};

// ALT 1: duplicate
const foo = {
  a: 5,
  b: 6,
  c: 5 + 6
};

// ALT 2: declare before
const a = 5;
const b = 6;
const foo = {
  a,
  b,
  c: a + b
};

// ALT 3: declare after
const foo = {
  a: 5,
  b: 6
};
foo.c = foo.a + foo.b;

/*******************************************************/
// ALT 4: declare after, more consistent

const foo = {};
foo.a = 5;
foo.b = 6;
foo.c = foo.a + foo.b;

// DIRECT USE OF THIS: DOESN'T WORK
const foo = {
  a: 5,
  b: 6,
  c: this.a + this.b
};

// DECLARE OUTSIDE
let a, b;
const foo = {
  a: a = 5,
  b: b = 6,
  c: a + b
};

// GETTER
const foo = {
  a: 5,
  b: 6,
  get c() {
    return this.a + this.b;
  }
};

// FUNCTION: foo.c()
const foo = {
  a: 5,
  b: 6,
  c() {
    return this.a + this.b;
  },
};

// ARROW FUNCTION: foo.c() (can't override!)
const foo = {
  a: 5,
  b: 6,
  c: () => foo.a + foo.b
};

// FUNCTION WRAPPER
const foo = function () {
  const a = 5;
  const b = 6;
  const c = a + b;

  return {
    a,
    b,
    c
  }
}();

// MIXIN LIKE: foo({}).c
const foo = o => {
  o.a = 5;
  o.b = 6;
  o.c = o.a + o.b;
  return o;
};

// ANONYMOUS FUNCTION
const foo = new function () {
  this.a = 5;
  this.b = 6;
  this.c = this.a + this.b;
};

// CLASS: new Foo().c
class Foo {
  constructor() {
    this.a = 5;
    this.b = 6;
    this.c = this.a + this.b;
  }
}

// motivation for single source of thurth: http://fredkschott.com/post/2013/12/node-js-cookbook---designing-singletons/
// see periodTestUtil for why not use revealingPattern

/********************* EXPORTS ******************/
// properties needs to be pre-declared. Funcions doesn't, they can use this.

// 1) Declare First

// + to make public, just add one line
//   + doesn't need to refactor invocations
//   + doens't need to move blocks of code
//   + better for git
// + easy to use pre-declared vars/functions
//   + doesn't need to break the pattern (like declaring after or before the export)
// + no use of this
// + forces to use private scope by nature
// - no concise object literal notation
// - repetitive
//   - bad when too many public functions
// - needs to jump around code to see whats public

var a = 5;
var b = 6; // private
var c = a + b;
var d = 7;

module.exports = {
  a,
  c,
  d
};

// 2) Declare when needed
// + gives the opportunity to duplicate code if desired to keep it simple
// - inconsistent

var a = 5;
var b = 6; // private

var foo = {
  a,
  c: a + b,
  d: 7
};

// 3) Declare after
var b = 6; // private

var foo = {
  a: 5,
  d: 7
};

foo.c = foo.a + b;

/********************************************/
// 2a) First with var

var b = 6; // private

var foo = {
    a: 5,
};

module.exports = {
    ...foo,
    c: foo.a + b,
    d: 7
}

