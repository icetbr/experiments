import Benchmark from 'benchmark';
import _ from 'lodash';

Benchmark.options.maxTime = 1;
const suite = new Benchmark.Suite;

const numbers = [...Array(100).keys()];

suite
    .add('lodash 1', function () {
        return _.filter(numbers, x => x % 2 !== 0);
    })

    .add('lodash 2', function () {
        return _.filter(numbers, x => x % 2 !== 0);
    })

    .on('cycle', function (event) {
        console.log(String(event.target));
    })

    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })

    .run();
