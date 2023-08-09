global._x = '';

function mapU(a, f) {
    var l = a.length;
    var r = new Array(l);
    for (var i = 0; i < l; ++i) {
        r[i] = f(a[i]);
    }
    return r;
}

function map() {
    if (arguments.length === 1) {
        const args = arguments;
        return function fn(data) {
            return mapU(data, args[0]);
        };
    }
    return mapU(arguments[0], arguments[1]);
}

function _filter(xs, predicateFn) {
    var index = 0;
    var arr = [];
    while (index < xs.length) {
      var value = xs[index];
      if (predicateFn(value)) {
        arr.push(value);
      }
      index = index + 1 | 0;
    }
    ;
    return arr;
  }
  function filter() {
    if (arguments.length === 1) {
      const args = arguments;
      return function fn(data) {
        return _filter(data, args[0]);
      };
    }
    return _filter(arguments[0], arguments[1]);
  }

const uniq = x => new Set(x);

// module.exports = { map, filter, uniq };

// const numPiped = pipeFn(15, add, subtract, multiply)
const pipeFn = (...args) => args.reduce((acc, fn) => fn(acc));

// const numPiped = pipeFn(add, subtract, multiply)(15)
const pipeFn2 = (...args) => val => args.reduce((acc, fn) => fn(acc), val);

// simplePipe ("hello") (doubleSay) (capitalize) (exclaim) (console.log)
const simplePipe = x => f => simplePipe (f (x))

function pipe() {
  global._x = arguments[0];
  for (let i = 1, l = arguments.length; i < l; i++) {
    global._x = arguments[i](global._x);
  }
  return global._x;
}

const trace = (data) => {
  console.log(data)
  return data
}
const debug = item => {
  debugger // <-- break here
  return item
}


export { map, filter, uniq, simplePipe, pipe };
