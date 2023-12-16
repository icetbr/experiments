import { run, bench, group, baseline } from 'mitata';
// import { run, bench, group, baseline } from 'https://esm.sh/mitata';
import { deepStrictEqual as eq } from 'node:assert/strict';
const entries = Object.entries;
// import { heapStats } from "bun:jsc";
// MIMALLOC_SHOW_STATS=1 bun pipe.js


export const addSuite = async (name, cases, { params, expected }) => {
    if (expected) entries(cases).map(([name, fn]) => eq(fn(params), expected, name));

    bench('noop', () => {});
    group({name, summary: false }, () => {
        entries(cases).map(([name, fn]) => bench(name, () => fn(params)));
    });

    await run({ min_max: false, percentiles: false, colors: false });
    // console.log(heapStats());
    // const used = process.memoryUsage().heapUsed / 1024 / 1024;
    // console.log(`\nThe script uses approximately ${Math.round(used * 100) / 100} MB\n\n`);
}
