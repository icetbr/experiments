import { add, suite, cycle, complete, save } from 'benny';
import { AsciiTable3, AlignmentEnum } from 'ascii-table3';
import { deepStrictEqual as eq } from 'node:assert/strict';
const { RIGHT, LEFT } = AlignmentEnum;

const entries = Object.entries;
const green    = msg => `\x1b[32m${msg}\x1b[0m`;
const red      = msg => `\x1b[31m${msg}\x1b[0m`;
const normal   = msg => `\x1b[0m${msg}\x1b[0m`;

const options = {
    // minTime: 15,
    maxTime: 1, // default: 5
    // minSamples: 50, // default: 5
    // initCount: 100,
    // minTime: 10
    // maxTime: 5,
    // minSamples: 5,
    // maxTime: 120, // 5
    // minSamples: 100, // 5
};
// const options = {
//     maxTime: 120, // 5
//     minSamples: 100, // 5
// };

const toNs = n => (n * 1000_000_000).toFixed(2);

export const addSuite = (name, cases, { params, expected }) => {
    if (expected) entries(cases).map(([name, fn]) => eq(fn(params), expected, name));

    suite(name,
        ...entries(cases).map(([name, fn]) => add(name, () => fn(params), options)),
        cycle(),

        complete((summary) => {
            const used = process.memoryUsage().heapUsed / 1024 / 1024;
            const means = summary.results.map(({ name, ops, percentSlower, details: { mean, median } }, i) => {
                const color =
                    i === summary.fastest.index ? green :
                    i === summary.slowest.index ? red :
                    normal;

                const fastest = summary.results[summary.fastest.index];
                const timesSlower = (fastest.ops / ops).toFixed(2);

                return [name, toNs(mean), toNs(median), ops.toLocaleString(), timesSlower + 'x', percentSlower.toFixed(2) + '%'].map(color);
            });

            var table = new AsciiTable3()
                .setHeading('name', 'mean(ns)', 'median(ns)', 'op/s', 'slower', 'slower')
                .setAligns([LEFT, RIGHT, RIGHT, RIGHT, RIGHT, RIGHT])
                .addRowMatrix(means)
                .setStyle('compact');

            console.log(`\nThe script uses approximately ${Math.round(used * 100) / 100} MB\n\n${table.toString()}`);
        }),
    );
}
