import Benchmark from 'benchmark';
import * as R from 'ramda';

Benchmark.options.maxTime = 1;
const suite = new Benchmark.Suite;

const numbers = [...Array(100).keys()];

suite
    .add('ramda 1', function () {
        return R.filter(x => x % 2 !== 0)(numbers);
    })

    .add('ramda 2', function () {
        return R.filter(x => x % 2 !== 0)(numbers);
    })

    .on('cycle', function (event) {
        console.log(String(event.target));
    })

    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })

    .run();
