// VARIATIONS: Hack Imperative

const parseJoiSchema = mdTable => {
       let $ = mdTable;
           $ = parseMdTable($);
           $ = map(toJoiSchema)($);
           $ = toObject($);
           $ = object.keys($);
    return $;
};

const parseJoiSchema = mdTable => {
       let $ = parseMdTable(mdTable);
           $ = map(toJoiSchema)($);
           $ = toObject($);
        return object.keys($);
};

const parseJoiSchema = mdTable => {
    let $ = parseMdTable(mdTable);
    $ = map(toJoiSchema)($);
    $ = toObject($);
    return object.keys($);
};

const parseJoiSchema = mdTable => { let
    $ = parseMdTable(mdTable);
    $ = map(toJoiSchema)($);
    $ = toObject($);

    return object.keys($)
},

// think: white color
const parseSchema = input => { let $ = input;       // const parseSchema = $ => // flow variation
    $ = parseMdTable($);
    $ = map(toJoiSchema)($);
    $ = toObject($);
    $ = object.keys($);        return $;}

const parseSchema = input => { let $ = input;       // const parseSchema = $ => // flow variation
    $ = parseMdTable($);
    $ = map(toJoiSchema)($);
    $ = toObject($);
    $ = object.keys($);
    return $; }

const fn2 = input => { let $ = input;       // const parseSchema = $ => // flow variation


// Hack Imperative (compact)
const parseJoiSchema = input => {
    let $ = filter(input, x => x >= 0);
    $ = map($, x => x * 2);
    return toSet($);
}

/*****************************************/
// VARIATIONS: my pipe (still no debug)
const parseJoiSchema = input => $(input)
    (filter(x => x >= 0))
    (map(x => x * 2))
    (toSet)

