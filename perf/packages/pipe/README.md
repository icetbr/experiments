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

runtime: node v20.3.1 (x64-linux)

benchmark            time (avg)             (min … max)       p75       p99      p995
------------------------------------------------------- -----------------------------
• Pipe
------------------------------------------------------- -----------------------------
imperative       213.62 ns/iter (180.48 ns … 912.46 ns) 206.33 ns 422.69 ns 564.64 ns
declarative       460.2 ns/iter      (426 ns … 1.94 µs)  442.5 ns  956.2 ns   1.94 µs
nativePipe       393.22 ns/iter (377.74 ns … 493.98 ns) 396.31 ns 477.85 ns 493.98 ns
nativePipeFirst  388.67 ns/iter (366.59 ns … 574.71 ns) 386.68 ns 572.17 ns 574.71 ns
belt             383.12 ns/iter (364.29 ns … 655.38 ns) 383.99 ns 466.15 ns 655.38 ns
iterOps            5.05 µs/iter     (3.65 µs … 2.29 ms)      4 µs  10.78 µs  18.23 µs
lazy               7.56 µs/iter     (5.94 µs … 2.49 ms)   6.93 µs  17.55 µs  23.68 µs
transducersJs      1.78 µs/iter     (1.74 µs … 2.36 µs)   1.78 µs   2.36 µs   2.36 µs
ppipe              1.09 µs/iter     (1.05 µs … 1.28 µs)   1.09 µs   1.28 µs   1.28 µs
ramda             389.6 ns/iter (376.27 ns … 492.32 ns) 391.41 ns 460.93 ns 492.32 ns
@arrows          382.53 ns/iter (366.58 ns … 553.89 ns) 383.29 ns  488.4 ns 553.89 ns
lodash/fp        392.32 ns/iter  (369.1 ns … 593.25 ns) 394.77 ns 539.98 ns 593.25 ns

runtime: bun 0.7.3 (x64-linux)

benchmark            time (avg)             (min … max)       p75       p99      p995
------------------------------------------------------- -----------------------------
imperative       179.21 ns/iter (169.91 ns … 398.38 ns) 178.06 ns 341.43 ns 374.05 ns
declarative       847.2 ns/iter   (716.67 ns … 2.39 µs) 870.82 ns   2.39 µs   2.39 µs
nativePipe       525.51 ns/iter  (480.32 ns … 959.2 ns) 541.63 ns 770.48 ns  959.2 ns
nativePipeFirst  532.78 ns/iter (499.66 ns … 653.93 ns) 551.98 ns 647.23 ns 653.93 ns
belt             467.45 ns/iter (434.81 ns … 643.78 ns)  484.3 ns 579.63 ns 643.78 ns
iterOps            3.51 µs/iter     (3.35 µs … 5.07 µs)   3.49 µs   5.07 µs   5.07 µs
lazy               2.92 µs/iter     (2.67 µs … 4.12 µs)   2.98 µs   4.12 µs   4.12 µs
transducersJs      2.78 µs/iter     (2.63 µs … 3.55 µs)   2.75 µs   3.55 µs   3.55 µs
ppipe              2.07 µs/iter     (1.99 µs … 2.44 µs)   2.08 µs   2.44 µs   2.44 µs
ramda            509.81 ns/iter (470.19 ns … 697.89 ns) 531.55 ns 659.68 ns 697.89 ns
@arrows          519.75 ns/iter (488.92 ns … 659.51 ns) 540.15 ns 590.87 ns 659.51 ns
lodash/fp        585.16 ns/iter (543.82 ns … 683.93 ns)  609.6 ns 683.93 ns 683.93 ns

• map → filter → reduce ..
BUN 0.8
    ✔  @mobily/ts-belt  174,858.42  ops/sec  ±1.03%  (92 runs)  fastest
    ✔  native           105,006.72  ops/sec  ±0.64%  (96 runs)  -39.95%
NODE 20
    ✔  @mobily/ts-belt  190,929.42  ops/sec  ±2.00%  (91 runs)  fastest
    ✔  native            40,979.54  ops/sec  ±0.71%  (96 runs)  -78.54%


node
-------------------------------------------------------------------
    name       mean(ns)   median(ns)     op/s      slower   slower
------------- ---------- ------------ ----------- -------- --------
 imperative      174.51       173.73   5,730,439    1.00x    0.00%
 declarative     470.21       470.00   2,126,721    2.69x   62.89%
 belt            405.45       378.76   2,466,383    2.32x   56.96%

bun
-------------------------------------------------------------------
    name       mean(ns)   median(ns)     op/s      slower   slower
------------- ---------- ------------ ----------- -------- --------
 imperative      181.49       181.20   5,509,970    1.00x    0.00%
 declarative     889.57       886.78   1,124,133    4.90x   79.60%
 belt            474.98       472.84   2,105,361    2.62x   61.79%

## runtime: node v20.3.1 (x64-linux)
benchmark        time (avg)             (min … max)       p75       p99      p995
--------------------------------------------------- -----------------------------
• Pipe
--------------------------------------------------- -----------------------------
imperative   175.12 ns/iter (171.87 ns … 249.72 ns) 173.39 ns 221.77 ns  241.7 ns
declarative  453.99 ns/iter (434.99 ns … 882.49 ns)  450.9 ns 657.66 ns 882.49 ns
belt         384.75 ns/iter (372.81 ns … 506.02 ns) 384.25 ns 493.53 ns 506.02 ns

## runtime: bun 0.8.0 (x64-linux)
benchmark        time (avg)             (min … max)       p75       p99      p995
--------------------------------------------------- -----------------------------
• Pipe
--------------------------------------------------- -----------------------------
imperative   189.38 ns/iter (177.42 ns … 269.99 ns) 193.29 ns 245.84 ns 268.68 ns
declarative  718.12 ns/iter   (643.46 ns … 1.94 µs) 715.33 ns   1.94 µs   1.94 µs
belt         507.11 ns/iter (459.76 ns … 807.37 ns) 534.44 ns 605.26 ns 807.37 ns
