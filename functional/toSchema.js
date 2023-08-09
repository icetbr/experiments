// imperative
const toSchema = ({ field, example, validation, description, devNotes }) => {
    let schema = `${validation}.example(${example})`;
    if (description) schema += `.description(${description})`;
    if (devNotes)    schema += `.note('${devNotes}')`;

    return { [field]: eval(schema) };
}

// pipe
const toSchema = ({ field, example, validation, description, devNotes }) =>
    `${validation}.example(${example})`
      + description ? `.description(${description})` : ''
      + devNotes    ? `.note('${devNotes}')` : ''

    |> { [field]: eval(^) }

// ternary                                                                        // ternary: { on same line
const toSchema = ({ field, example, validation, description, devNotes }) =>       const toSchema = ({ field, example, validation, description, devNotes }) => ({
    ({                                                                                [field]: eval(
        [field]: eval(                                                                    `${validation}.example(${example})`
            `${validation}.example(${example})`                                           + description ? `.description(${description})` : ''
            + description ? `.description(${description})` : ''                           + devNotes    ? `.note('${devNotes}')` : ''
            + devNotes    ? `.note('${devNotes}')` : ''                               )
        )                                                                         });
    });

// cond
const toSchema = ({ field, example, validation, description, devNotes }) =>
    ({
        [field]: eval(
            `${validation}.example(${example})`
            + cond(description, x => `.description(${x})`)
            + cond(devNotes,    x => `.note('${x}')`)
        )
    });

// need to destructure or order arguments around
const toSchema = ({ field, example, validation, description, note:devNotes }) =>
    `${validation}.example(${example})` + description ? `.description(${description})` : ''  + devNotes    ? `.note('${devNotes}')` : ''    // singleLine

    i(`${validation}.example(${example})[.description(${description})][.note(${note})]`)    // special function v1: can't use the optional [] syntax

    i(`$validation.example($example)[.description($description)][.note($note)]`)            // special function v3

    i(`$.example($)[.description($)][.note($)]`, validation, example, description, note)    // special function v2: bad for piping, needs special ordering when passing parameters







    // `${validation}.example(${example})${description ? `.description(${description})` : ''}  + devNotes    ? `.note('${devNotes}')` : ''

    [validation, `.example(${example})`, description && `.description(${description})`, devNotes && `.note('${devNotes}')`].filter(Boolean).join('');



    |> { [field]: eval(^) }

    i(`$validation.example($example)[.description($description)][.note($note)]`)
    x => { [field]: eval(x) }

    const x = i(`$validation.example($example)[.description($description)][.note($note)]`)
    return { [field]: eval(x) }

    i(`{ $field: $validation.example($example)[.description($description)][.note($note)] }`)


    (`${0}.example(${1}).description(${2}).note(${3})`, example, validation, description, note)

    (`$0.example($1).description($2).note($3)`, example, validation, description, note)

    (`$0.example($1)[.description($2)][.note($3)]`, example, validation, description, note)

    (`$validation.example($example)[.description($description)][.note($note)]`)

    (`$validation.example($example)[.description($description)][.note($note)] }`)

    (`${validation}.example(${example})[.description(${description})][.note(${note})] }`)

    // (`{ ${1}: ${0}.example(${1}).description(${2}).note(${3})`, example, validation, description, note)

    // (`{ $1: $0.example($1).description($2).note($3)`, example, validation, description, note)

    // (`{ $1: $0.example($1)[.description($2)][.note($3)]`, example, validation, description, note)

    // (`{ ${field}: $validation.example($example)[.description($description)][.note($note)]`)

    // (`{ $field: $validation.example($example)[.description($description)][.note($note)] }`)

    // (`{ ${field}: ${validation}.example(${example})[.description(${description})][.note(${note})] }`)
];

`$validation.example($example)[.description($description)][.note($note)]`
|> ({ field, eval(^) })


