The use of the arguments object seems detrimental to performance.

> The difference between using arguments vs. not using it could be anywhere between 1.5 times to 4 times slower, depending on the browser
> -- <cite>[stackoverflow][1]</cite>

## Usage
`node nameOfFile.js`

## Ts-belt: affected
```
arguments 1 x 4,193,813 ops/sec ±0.83% (23 runs sampled)
arguments 2 x 1,021,724 ops/sec ±2.65% (22 runs sampled)
direct 1    x 4,188,578 ops/sec ±0.77% (21 runs sampled)
direct 2    x 4,137,680 ops/sec ±0.87% (18 runs sampled)
```

## Lodash: not affected
```
lodash 1 x 891,995 ops/sec ±0.89% (23 runs sampled)
lodash 2 x 889,890 ops/sec ±0.99% (22 runs sampled)
```

## Ramda: affected
```
ramda 1 x 2,988,212 ops/sec ±1.41% (23 runs sampled)
ramda 2 x 964,727 ops/sec ±1.70% (20 runs sampled)
 ```

[1]: https://stackoverflow.com/questions/5325554/javascript-functions-and-arguments-object-is-there-a-cost-involved
