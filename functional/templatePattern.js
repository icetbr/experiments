// template pattern

// IMPERATIVE
const a = {
  b() {
    this.do1();
    this.do2();
    this.do3();
  },

  do2() {
    console.log('2');
  },
};

const a1 = {
  ...a,

  do1() {
    console.log('1');
  },
  do3() {
    console.log('3');
  }
};

a1.b();

// OOP
const a = {
  b() {
    this.do1();
    this.do2();
    this.do3();
  },

  do2() {
    console.log('2');
  },
};

const a1 = {
  ...a,

  do1() {
    console.log('1');
  },
  do3() {
    console.log('3');
  }
};

a1.b();

// functional?
const a = {
  b(s) {
    s.do1();
    s.do2();
    s.do3();
  },

  do2() {
    console.log('2');
  },
}

const a1 = {
  ...a,

  b() {
    a.b(a1);
  },

  do1() {
    console.log('1');
  },
  do3() {
    console.log('3');
  }
};

a1.b();