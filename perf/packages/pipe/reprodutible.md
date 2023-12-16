https://opensource.salesforce.com/best/#/
https://github.com/moltar/typescript-runtime-type-benchmarks/pull/866/files

https://domwil.co.uk/posts/benchmarking-typescript/
  https://easyperf.net/blog/2019/08/02/Perf-measurement-environment-on-Linux#5-set-process-priority

## benny max1

## benny default
 imperative      173.91       173.46   5,750,256    1.00x    0.00%
 reduceFn        177.70       176.70   5,627,420    1.02x    2.14%
 declarative     490.68       480.57   2,037,981    2.82x   64.56%
 belt            418.04       400.18   2,392,131    2.40x   58.40%
 nativePipe      417.25       418.26   2,396,628    2.40x   58.32%

 imperative      174.16       173.30   5,741,857    1.00x    0.47%
 reduceFn        173.34       172.97   5,768,983    1.00x    0.00%
 declarative     495.19       489.13   2,019,429    2.86x   65.00%
 belt            411.93       412.31   2,427,626    2.38x   57.92%
 nativePipe      419.53       407.32   2,383,601    2.42x   58.68%

 imperative      444.91       422.07   2,247,646    1.03x    2.82%
 reduceFn        432.36       426.32   2,312,876    1.00x    0.00%
 declarative    1189.99      1183.47     840,346    2.75x   63.67%
 belt            954.49       944.46   1,047,685    2.21x   54.70%
 nativePipe      946.66       918.43   1,056,348    2.19x   54.33%

## mitata
imperative   177.05  177.24  175.72
reduceFn     179.06   180.3  190.34
declarative  456.47  457.96  462.61
belt          388.4  389.65  393.54
nativePipe   384.02  394.19  385.64

## mitata run.sh
imperative   401.41  403.39  441.35
reduceFn     415.44  429.23  459.71
declarative    1.27    1.26    1.13
belt           1.08    1.08  895.83
nativePipe   868.44  861.18  889.94

 imperative      427.16       422.51   2,341,027    1.00x    0.08%
 reduceFn        426.82       424.90   2,342,897    1.00x    0.00%
 declarative    1194.94      1186.19     836,860    2.80x   64.28%
 belt            984.10       955.76   1,016,161    2.31x   56.63%
 nativePipe      956.26       914.70   1,045,742    2.24x   55.37%

## mitata run.sh 2
imperative     1.13 µs/iter
reduceFn       1.23 µs/iter
declarative    2.44 µs/iter
belt           1.57 µs/iter
nativePipe     1.34 µs/iter

imperative      623 ns/iter
reduceFn        565 ns/iter
declarative    1.39 µs/iter
belt           1.17 µs/iter
nativePipe     1.07 µs/iter
