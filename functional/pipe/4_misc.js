// WEIRD ONES

const parseJoiSchema = input => p(input, _ =>
    _.$ = filter(x => x >= 0)   (_.$);
    _.$ = map(x => x * 2)       (_.$);
    _.$ = uniq                  (_.$);
)

const parseJoiSchema = p(_ =>
    _.$ = filter(_.$, x => x >= 0);
    _.$ = map(_.$, x => x * 2);
    _.$ = toSet(_.$);
)

const parseJoiSchema = p(_ =>
    _.$ = filter(x => x >= 0, _.$);
    _.$ = map(x => x * 2, _.$);
    _.$ = toSet(_.$);
)

/*****************************************/
// HACK VS PIPE

const gt = a => b => a > b;
const mult = a => b => a * b;

const parseJoiSchema = input => input
    |> filter(gt(0))
    |> map(mult(2))
    |> toSet

const parseJoiSchema = input => input
    |> filter(gt(^, 0))
    |> map(mult(^, 2))
    |> toSet(^)

const parseJoiSchema = input => input
    |> filter(gt0)
    |> map(mult2)
    |> toSet

/*****************************************/
// 2 STEPS
parseJoiSchema = parseMdTable |> map(toJoiSchema)                      // F# Operator

parseJoiSchema = parseMdTable(^) |> map(toJoiSchema)(^)                // Hack Operator

parseJoiSchema = pipe(parseMdTable, map(toJoiSchema))                  // F# Function

parseJoiSchema = pipe($ => parseMdTable($), $ => map(toJoiSchema)($))  // Hack Function

parseJoiSchema = $ => ($ = parseMdTable($), $ = map(toJoiSchema)($))   // Comma

parseJoiSchema = $ => map(toJoiSchema)(parseMdTable($))                // Nested: data last

parseJoiSchema = $ => map(parseMdTable($), toJoiSchema);               // Nested: data first

parseJoiSchema = $ => map (toJoiSchema) (parseMdTable ($))                // Nested: spaced

parseJoiSchema = $(parseMdTable)(map(toJoiSchema))                     // simple


// WHERE TO LOOK FOR SIGNATURE

// name: already has the return
// param: a hint of the expected type
// comments: the typings

// return not on first line because `return fetch` is different from return type:User

// original: first and last lines
parseJoiSchema = mdTable => pipe(mdTable,
    parseMdTable,
    map(toJoiSchema),
    toObject,
    object.keys
)

// flow: comment with first and last lines (param and return)
parseJoiSchema = pipe(
    parseMdTable,
    map(toJoiSchema),
    toObject,
    object.keys
)

// first line
parseJoiSchema = mdTable => object.keys(
    pipe(mdTable,
        parseMdTable,
        map(toJoiSchema),
        toObject
    )
)

// first line "no pipe"
parseJoiSchema = mdTable => object.keys(
    ($ = mdTable) => {
        $ = parseMdTable(mdTable);
        $ = map($, toJoiSchema);
        $ = toObject($)
    }
)

// pipe operator
parseJoiSchema = $ => object.keys(
    parseMdTable($)
    |> map(toJoiSchema)($)
    |> fromEntries($)
)


/*****************************************/
// DISCARDED

// chaining (native)
const parseJoiSchema = input => input
    .filter(x => x >= 0)
    .map(x => x * 2)
    .reduce((x, y) => x.add(y), new Set());

// chaining (lodash)
const parseJoiSchema = input => _(input)
    .filter((x) => x >= 0)
    .map((x) => x * 2)
    .thru(toSet)
    .value()

// weird one
const parseJoiSchema = input => input
    [o] (filter(x => x > 0))
    [o] (map(x => x * 2))
    [o] (toSet)
