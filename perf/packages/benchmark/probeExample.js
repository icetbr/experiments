import {Bench} from '@probe.gl/bench';

const bench = new Bench({id: 'tmp'})
  .group('Utility tests')
  .add('Math.sqrt', () => Math.sqrt(100))
  ;

bench.run();
