import Benchmark from 'benchmark';

Benchmark.options.maxTime = 1;
const suite = new Benchmark.Suite;

const numbers = [...Array(100).keys()];

const filter = function (n, t) {
    var r = 0;
    var e = [];
    while (r < n.length) {
        var u = n[r];
        if (t(u)) {
            e.push(u);
        }
        r = r + 1 | 0;
    }
    return e;
}

const filterArgs = function () {
    var n = arguments[0];
    var t = arguments[1];
    var r = 0;
    var e = [];
    while (r < n.length) {
        var u = n[r];
        if (t(u)) {
            e.push(u);
        }
        r = r + 1 | 0;
    }
    return e;
}

suite
    .add('arguments 1', function () {
        return filterArgs(numbers, x => x % 2 !== 0);
    })

    .add('arguments 2', function () {
        return filterArgs(numbers, x => x % 2 !== 0);
    })

    .add('direct 1', function () {
        return filter(numbers, x => x % 2 !== 0);
    })

    .add('direct 2', function () {
        return filter(numbers, x => x % 2 !== 0);
    })

    .on('cycle', function (event) {
        console.log(String(event.target));
    })

    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })

    .run();
