const createJoiSchemaObject = object.keys;

const toJoiSchema = ({ field, example, validation, description, devNotes }) => [
        field,
        eval(
            `${validation}.example(${example})`
            + (description ? `.description('${description}')` : '')
            + (devNotes    ? `.note('${devNotes}')` : '')
        )
    ];

export const
    parseJoiSchema = (mdTable, $ = mdTable) => (
        $ = parseMdTable($),
        $ = map(toJoiSchema)($),
        $ = object.keys(fromEntries($))
    ),

    parseJoiSchema = mdTable => {
        const toJoiSchema = ({ field, example, validation, description, devNotes }) => [
            field,
            eval(
                `${validation}.example(${example})`
                + (description ? `.description('${description}')` : '')
                + (devNotes    ? `.note('${devNotes}')` : '')
            )
        ];

        const parsed = parseMdTable(mdTable);
        const schemas = map(parsed, toJoiSchema);
        return createJoiSchemaObject(fromEntries(schemas));
    },

    parseJoiSchema5 = (mdTable, $ = mdTable) => (
        const toJoiSchema = ({ field, example, validation, description, devNotes }) => [
            field,
            eval(
                `${validation}.example(${example})`
                + (description ? `.description('${description}')` : '')
                + (devNotes    ? `.note('${devNotes}')` : '')
            )
        ];

        return (
            $ = parseMdTable($),
            $ = map(toJoiSchema)($),
            $ = object.keys(fromEntries($))
        )
    }

    // parseSchema = mdTable =>
    //     toObject(__.map(parseMdTable(mdTable), toSchema))


    // parseSchema = pipe(
    //     parseMdTable, map(toSchema), toObject
    // )

    // parseSchema = pipe(
    //     parseMdTable,
    //     map(toSchema),
    //     toObject,
    // )

    // mdTable => object

    // )
    //     const objects = parseTable(mdTable.replaceAll('**', ''));
    //     const joiSchema =
    //     const schema = {};
    //     lines.slice(3).forEach(line => {
    //         const cells = line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|');
    //         schema[cells[0].trim()] = eval(`${cells[2].trim()}.example(${cells[1].trim()}).description('${cells[3].trim()}').note('${cells[4].trim()}')`).describe();
    //     })
    //     return object.keys(schema);
    // },
    // toSchema = tableMd => {
    //     // const lines = tableMd.replaceAll(/^|/, '').replaceAll(/|$/, '').split('\n');
    //     const lines = tableMd.split('\n');
    //     // const headers = lines[0].replace(/^|/, '').replace(/|$/, '').split('|');
    //     const schema = {};
    //     lines.slice(3).forEach(line => {
    //         const cells = line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|');
    //         schema[cells[0].trim()] = eval(`${cells[2].trim()}.example(${cells[1].trim()}).description('${cells[3].trim()}').note('${cells[4].trim()}')`).describe();
    //     })
    //     return object.keys(schema);
    // },

    toExample = schemaMd => {
    };



    export const parseJoiSchema1 = (mdTable, $ = mdTable) => (
        $ = fork(split(NEWLINE), parseMdTable, pipe(parseMdTable, map(fillInFlag)))($),
        $ = map(toJoiSchema)($),
        $ = createJoiSchemaObject(fromEntries($))
    );

    export const parseJoiSchema2 = pipe(
        fork(split(NEWLINE), parseMdTable, pipe(parseMdTable, map(fillInFlag))),
        map(toJoiSchema),
        createJoiSchemaObject(fromEntries),
    );

    export const parseJoiSchema3 = (mdTable, $ = mdTable) => (
        $ = fork(
                split(NEWLINE),
                parseMdTable,
                pipe(parseMdTable, map(fillInFlag))
            )($),
        $ = map(toJoiSchema)($),
        $ = createJoiSchemaObject(fromEntries($))
    );


    const toJoiSchema1 = ({ field, example, validation, description, devNotes }) => [
        field,
        eval(
            `${validation}.example(${example})`
            + (description ? `.description('${description}')` : '')
            + (devNotes    ? `.note('${devNotes}')` : '')
        )
    ];
