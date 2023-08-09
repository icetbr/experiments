Object vs Array Representation

Array
- needs toSpliced() and isFlag()

Array to Object
- needs toObject()
- must have a header first row
  - or o() and f() functions

Pure object
- needs nothing
- too much horizontal space

Thoughts
- 2 small functions are worth it

export const toJoiSchema = pipe(
    mapValues(row => {
        if (row.length === 3) row = row.toSpliced(1, 0, true, Joi.boolean);
        if (isString(row[example])) row[example].replace('[x]', 5);

        let schema = a[validation].example(a[example]);
        if (a[description]) schema = schema.description(a[description]);
        if (a[devNotes]) schema = schema.note(a[devNotes]);

        return schema;
    }),
    Joi.object,
));

// as object
export const toJoiSchema = pipe(
    mapValues(({ validation, example, description, devNotes }) => {
        if (isString(example)) example = example.replace('[x]', 5);

        let schema = (validation || boolean).example(example || true);
        if (description) schema = schema.description(description);
        if (devNotes) schema = schema.note(devNotes);

        return schema;
    }),
    Joi.object,
));
// a => a[example]
export const toJoiSchema = (x = 5) => pipe(
    mapValues(pipe(
        when(lengthEq(3), toSpliced(1, 0, true, Joi.boolean)),
        when(isString(prop('example')), adjust(example, replace('[x]', x), a)),

        $ => a[validation].example(a[example]),
        $ => when(a[description], $.description(a[description])),
        $ => when(a[devNotes]), $.note(a[devNotes]),
    )),
    Joi.object,
);

const buildSchema = a => pipe(
    $ => a[validation].example(a[example]),
    $ => when(a[description], $.description(a[description])),
    $ => when(a[devNotes]), $.note(a[devNotes]),
)(a),

export const toJoiSchema = _ => Joi.object(
    map(_, a =>
        a[validation].example(a[example].replace?.('[x]', 5) || a[example])
        .description(a[description] || EMPTY)
        .note(a[devNotes] || EMPTY)
    )
);
