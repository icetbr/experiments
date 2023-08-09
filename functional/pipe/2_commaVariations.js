import { map, filter, uniq } from './utils.js';

const calculate = pipe(
const calculate = $ => (

const calculate = input => pipe(input,
// const calculate = input => ($ = input,
const calculate = input => (($ = input) => (
const calculate = (input, $ = input) => (
const calculate = input => { let $ = input; return (

// flow
const calculate = $ => (
    $ = filter(x => x >= 0)($),
    $ = map(x => x * 2)($),
    $ = uniq($)
)

// pipe
const calculate = input => (($ = input) => (
    $ = filter(x => x >= 0)($),
    $ = map(x => x * 2)($),
    $ = uniq($)
))()

const calculate = (input, $ = input) => (
    $ = filter(x => x >= 0)($),
    $ = map(x => x * 2)($),
    $ = uniq($))

const calculate = input => { let $ = input; return (
    $ = filter(x => x >= 0)($),
    $ = map(x => x * 2)($),
    $ = uniq($)
)}

const calculate = input => {              let $ = input;
    $ = filter(x => x >= 0)($);
    $ = map(x => x * 2)($);
    $ = uniq($);                          return $; }

const calculate = input => { let $ = input;
    $ = filter(x => x >= 0)($),
    $ = map(x => x * 2)($),
    $ = uniq($)
    return $;
}



// no curry data last
const calculate2 = $ => (
    $ = filter(x => x >= 0, $),
    $ = map(x => x * 2, $),
    $ = uniq($)
)

// no curry data first
const calculate2 = $ => (
    $ = filter($, x => x >= 0),
    $ = map($, x => x * 2),
    $ = uniq($)
)

// no curry data last _
const calculate2 = _ => (
    _ = filter(x => x >= 0, _),
    _ = map(x => x * 2, _),
    _ = uniq(_)
)

// no curry data first _
const calculate2 = _ => (
    _ = filter(_, x => x >= 0),
    _ = map(_, x => x * 2),
    _ = uniq(_)
)

// underscore style
const calculate3 = _ => (
    _ = filter(x => x >= 0)(_),
    _ = map(x => x * 2)(_),
    _ = uniq(_)
)

// underscore style left aligned
const calculate5 = _ => (
    _ = filter(x => x >= 0)     (_),
    _ = map(x => x * 2)         (_),
    _ = uniq                    (_)
)

// left aligned style
const calculate4 = $ => (
    $ = filter(x => x >= 0)     ($),
    $ = map(x => x * 2)         ($),
    $ = uniq                    ($)
)

console.log(calculate([-1, 2, 2, 3]))
