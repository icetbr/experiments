BEST
Parses a markdown table into a joi schema.


parseInt()               // parses a string argument and returns an integer
JSON.parse(params.body)


parse
parseJoiSchema
parseMdTableToJoiSchema


**********************************************************************************************************************************
V1
FROM
`
| **field**              | **example**        | **validation**    | **description**        | **devNotes**      |
|------------------------|--------------------|-------------------|------------------------|-------------------|
| motivo                 | 'Quebrou o pé'     | string.required() | A causa do afastamento | chave estrangeira |
| inicio                 | '2019-01-21T09:01' | date.required()   |                        |                   |
| FL_SEM_HORARIO_NOTURNO | true               | boolean           | Ignora periodo         |                   |
`

TO

object.keys({
    motivo                  : string.required().example('Quebrou o pé').description('A causa do afastamento').note('chave estrangeira'),
    inicio                  : date.required(),
    FL_SEM_HORARIO_NOTURNO  : boolean.description('Ignora periodo'),
})

**********************************************************************************************************************************
V2

const mdTable = `
    | **field**              | **example**        | **validation**    | **description**        | **devNotes**      |
    |------------------------|--------------------|-------------------|------------------------|-------------------|
    | motivo                 | 'Quebrou o pé'     | string.required() | A causa do afastamento | chave estrangeira |
    | inicio                 | '2019-01-21T09:01' | date.required()   |                        |                   |
    | FL_SEM_HORARIO_NOTURNO | true               | boolean           | Ignora periodo         |                   |
`;

const joiSchema =
    object.keys({
        motivo                  : string.required().example('Quebrou o pé').description('A causa do afastamento').note('chave estrangeira'),
        inicio                  : date.required(),
        FL_SEM_HORARIO_NOTURNO  : boolean.description('Ignora periodo'),
    });

expect(toSchema(mdTable).toEqual(joiSchema))


**********************************************************************************************************************************
expect(toSchema(
    `
    | **field**              | **example**        | **validation**    | **description**        | **devNotes**      |
    |------------------------|--------------------|-------------------|------------------------|-------------------|
    | motivo                 | 'Quebrou o pé'     | string.required() | A causa do afastamento | chave estrangeira |
    | inicio                 | '2019-01-21T09:01' | date.required()   |                        |                   |
    | FL_SEM_HORARIO_NOTURNO | true               | boolean           | Ignora periodo         |                   |
    `
)).toEqual(
    object.keys({
        motivo                  : string.required().example('Quebrou o pé').description('A causa do afastamento').note('chave estrangeira'),
        inicio                  : date.required(),
        FL_SEM_HORARIO_NOTURNO  : boolean.description('Ignora periodo'),
    })
)

**************************
NOTES
['a' => 'b']
expect(toSchema('a')).toEqual('b')
'a' => 'b'

This is the table format. No need for the method name

**************************



