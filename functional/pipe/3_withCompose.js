// pipe + compose?

// this reveals implementation details
parseJoiSchema = flow(
    parseMdTable,
    keyBy('field'),
    mapValues(toJoiSchema)
    createJoiSchemaObject,
)

parseJoiSchema = pipe(
    parseMdTable,
    map(toJoiSchema),
    fromEntries,
    createJoiSchemaObject,
)

parseJoiSchema = flow(
    parseMdTable,
    mapEntries('field', toJoiSchema),
    createJoiSchemaObject,
)

parseJoiSchema = pipe(
    parseMdTable,
    map(toJoiSchema),
    compose(createJoiSchemaObject, fromEntries)
)

parseJoiSchema = pipe(
    parseMdTable,
    map(toJoiSchema),
    c(createJoiSchemaObject, fromEntries)
)

parseJoiSchema = pipe(
    parseMdTable,
    map(toJoiSchema),
    x => createJoiSchemaObject(fromEntries(x)),
)

compose(createJoiSchemaObject, fromEntries)
c(createJoiSchemaObject, fromEntries)
x => createJoiSchemaObject(fromEntries(x)),
