// https://2ality.com/2022/01/pipe-operator.html

// F# Operator
const parseSchema = input => input
    |> filter(x => x >= 0)
    |> map(x => x * 2)
    |> toSet

// Hack Operator
const parseSchema = input => input
    |> filter(x => x >= 0)(^)
    |> map(x => x * 2)(^)
    |> toSet(^)

// F# Function
const parseSchema = input => pipe(input,
    filter(x => x >= 0)
    map(x => x * 2)
    toSet
)

// Hack Function
const parseSchema = input => pipe(input,
    $ => filter(x => x >= 0)($)
    $ => map(x => x * 2)($)
    $ => toSet($)
)

// Hack Imperative
const parseSchema = input => { let $ = input;      // const parseSchema = $ => // flow variation
    $ = filter($, x => x >= 0);
    $ = map($, x => x * 2);
    $ = toSet($);
    return $;
}

// Comma Pipe
const parseSchema = input => (($ = input) => (     // const parseSchema = $ => ( // flow variation
    $ = filter(x => x >= 0)($)
    $ = map(x => x * 2)($),
    $ = toSet($)
))()

// imperative
const parseSchema = input => {
    const $ = new Set();

    for (let x of input) {
        if (x < 0) continue;

        $.add(x * 2);
    }

    return $;
}

// nested
toSet(
    map(
        filter(
            input, x => x >= 0
        ),
       x => x * 2
       )
)

// nested2
toSet(
map(x => x * 2
filter(input, x => x >= 0
),
)
)

object.keys(toObject(map(parseMdTable(mdTable), toSchema)))
