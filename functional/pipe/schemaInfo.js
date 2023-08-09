const replaceX = x => example => typeof example === 'string' ? example.replace?.('[x]', x) : example;
const isRequired = a => a[validation].includes('required');
const fillInFlag = row => row.length === 3 ? row.toSpliced(1, 0, true, Joi.boolean) : row;
// const fillInFlag = mapValues(row => row.length === 3 ? row.toSpliced(1, 0, true, Joi.boolean) : row);

// imperative
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

// named
export const toJoiSchema = (x = 5) => Joi.object(
    mapValues(pipe(
        fillInFlag  = a => a.length === 3 ? a.toSpliced(1, 0, true, Joi.boolean) : a,
        replaceX    = a => typeof a[example] === 'string' ? adjust(example, replace('[x]', x), a) : a,
        buildSchema = a => {
                        let schema = a[validation].example(a[example]);
                        if (a[description]) schema = schema.description(a[description]);
                        if (a[devNotes]) schema = schema.note(a[devNotes]);

                        return schema;
                      },
    ))
);

// mutable vs immutable
splice(1, true, boolean)                          // pipe
splice(x, 1, true, boolean)                       // point pipe
row.splice(1, 0, true, boolean)

// insert type
insert(a, true, boolean).at(1)
insert({ at: 1 }, true, boolean)   // google swift like?
insertAt(1)(true, boolean)         // google swift like?
insert({ at: 1, values: [true, boolean] }))   // google swift like?
insert(a, [example, true], [validation, boolean])
insert(a, [1, true], [2, boolean])

// array vs object
if(isFlag(a)) insert(a, [example, true], [validation, boolean])
if(a.flag) { ...a, example: true, validation: boolean }

// functional vs imperative
when(isFlag, insert([example, true], [validation, boolean]))

when(isString(prop('example')), adjust(example, replace('[x]', 5)))
if (isString(prop('example')) a[example].replace('[x]', 5);
if (isString(a[example])) a[example] = a[example].replace('[x]', 5);
if (isString(a[example])) adjust(row, example, replace('[x]', 5)))

a[example] = isString(a[example]) ? a[example].replace('[x]', 5) : a[example];
a = isString(a[example]) ? adjust(row, example, replace('[x]', 5))) : a;
a = when(isString(prop('example')), adjust(example, replace('[x]', 5)));
a[example] = a[example].replace?.('[x]', x) || a[example]

if (row.length === 3) row.splice(1, 0, true, Joi.boolean);
row => row.length === 3 ? row.toSpliced(1, 0, true, Joi.boolean) : row; // insertAt

// export const toJoiSchema = schemaInfo => toJoiObject(mapValues(schemaInfo, buildSchema))
// VR CURRY ALTERNATIVE NO MEU MD E DISCUSSAO NO SITE DO RAMDA sobre )(

motivo                 : o('reason', 'Quebrou o pé', string.required(), 'Motivo', '' , 'chave estrangeira')
FL_SEM_HORARIO_NOTURNO : f('hasNoNightlyHour', 'Período não trabalhado sem horário noturno', ''),

/*************************************************************** */

export const toJoiSchema2 = _ => (_ = map(_ => (_ = fillInFlag(_), _ = replaceX(_, 5), _ = buildSchema(__)), _ = toJoiObject(_))

export const toJoiSchema2 = _(map(_(fillInFlag, replaceX(5), buildSchema)), toJoiObject)
export const toJoiSchema3 = map(fillInFlag |> replaceX(5) |> buildSchema) |> toJoiObject

export const toJoiSchema1 = toJoiObject(map(pipe(fillInFlag, replaceX(5), buildSchema)))
export const toJoiSchema2 = pipe(map(pipe(fillInFlag, replaceX(5), buildSchema)), toJoiObject)
export const toJoiSchema2 = pipe(mapPipe(fillInFlag, replaceX(5), buildSchema), toJoiObject)
export const toJoiSchema3 = toJoiObject(map(buildSchema(replaceX(5, fillInFlag(x)))))


let schema = a[validation].example(a[example]);
let schema = a[validation].example(_(a[example], replaceX(5)));
let schema = a[validation].example(replaceX(5, a[example])));

// data first vs last
a[validation].example(replaceX (5) (example)) //replaceX(example).for(5) replaceX (5) (example) VR CURRY ALTERNATIVE NO MEU MD E DISCUSSAO NO SITE DO RAMDA sobre )(
a[validation].example(replaceX(5)(example))
a[validation].example(replaceX(5, example))
a[validation].example(replaceX(example, 5))
a[validation].example(_(example, replaceX(5)))
