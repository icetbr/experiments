How much a `pipe` function impacts performance. Using [ts-belt](1) `filter`, `map` and `reduce` to keep the results focused on the `pipe`` implementation;

## Usage
`node nameOfFile.js`

- [baseline.js](./baseline.js) tests some details like inline vs reference functions.

```
-----------------------------------------------------------------------
      name         mean(ns)   median(ns)     op/s      slower   slower
----------------- ---------- ------------ ----------- -------- --------
 imperative          154.96       154.39   6,453,263    1.00x    0.00% FASTEST
 declarative         456.21       456.00   2,191,972    2.94x   66.03%
 nativePipe          398.10       397.58   2,511,902    2.57x   61.08%
 nativePipeFirst     401.39       399.13   2,491,362    2.59x   61.39%
 belt                365.36       361.59   2,737,035    2.36x   57.59%
 iterOps            6536.78      6440.12     152,981   42.18x   97.63%
 lazy               7584.46      7394.84     131,849   48.94x   97.96% SLOWEST
 transducersJs      1770.48      1757.49     564,819   11.43x   91.25%
 ppipe              1139.07      1140.20     877,906    7.35x   86.40%
 ramda               403.58       399.30   2,477,799    2.60x   61.60%
 @arrows             426.57       427.96   2,344,283    2.75x   63.67%
 lodash/fp           402.54       400.84   2,484,224    2.60x   61.50%
```
[1]: https://github.com/mobily/ts-belt
