// alternative styles for service.js/insert

const insert = (company, user) => doc => ppipe(
    doc,
    toDbFormat,
    docDb => ppipe(
        docDb,
        findExistent,
        assertNullOrSoftDeleted,
        merge(docDb),
        merge(createMetadata(dscField)),
        upsert,
        saveHistory,
        emitEvent, // DOC REST?
    )
);

const insert7 = (company, user) => doc => ppipe(
    toDbFormat,
    docDb => ppipe(
        findExistent,
        assertNullOrSoftDeleted,
        merge(docDb),
        merge(createMetadata(dscField)),
        upsert,
        saveHistory,
        emitEvent, // DOC REST?
    )
)(doc);

const insert4 = (company, user) => doc => ppipe(
    toDbFormat,
    merge(ppipe(findExistent(company), assertNullOrSoftDeleted)),
    merge(createMetadata(dscField, user)),
    tap(upsert),
    tap(saveHistory),
    emitEvent, // DOC REST? se sim pegas do param? ou pega o transform?
)(doc);



const insert8 = (company, user) => doc => ppipe(
    toDbFormat,
    docDb => ppipe(
        findExistent,
        assertNullOrSoftDeleted,
        merge(docDb),
        merged => ppipe(
            createMetadata(dscField),
            merge(merged),
            upsert,
            saveHistory,
            emitEvent, // DOC REST?
        ),
    )
)(doc);



const insert6 = ppipe(
    toDbFormat,
    docDb => ppipe(
        findExistent,
        assertNullOrSoftDeleted,
        merge(docDb),
        merge(createMetadata(dscField)),
        upsert,
        saveHistory,
        emitEvent, // DOC REST?
    )(docDb)
);

const insert1 = ppipe(
    toDbFormat,
    chain(merge, ppipe(findExistent, assertNullOrSoftDeleted)),
    chain(merge, createMetadata(dscField)),
    upsert,
    saveHistory,
    emitEvent, // DOC REST?
);

const insert3 = ppipe(
    toDbFormat,
    merge(ppipe(findExistent, assertNullOrSoftDeleted)),
    merge(createMetadata(dscField)),
    tap(upsert),
    tap(saveHistory),
    emitEvent, // DOC REST? se sim pega do param? ou pega o transform?
);

const insert5 = (company, user) => doc => ppipe(
    toDbFormat,
    merge(
        ppipe(findExistent(company), assertNullOrSoftDeleted)
    ),
    merge(createMetadata(dscField, user)),
    tap(upsert),
    tap(saveHistory),
    emitEvent, // DOC REST? se sim pegas do param? ou pega o transform?
)(doc);
