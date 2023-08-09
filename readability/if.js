// curry
const insert = curry(findExistent, save, saveHistory) => toDbFormat => ppipe();  //ERRADO

const insert                          = insert(findExistent, save);
const insertAlways                    = insert(noop, save);
const insertWithSoftDeleted           = insert(findSoftDeleted, either(update, save))
const insertWithHistory               = insert(saveHistory);
const insertAlwaysWithHistory         = insertAlways(saveHistory);
const insertWithSoftDeletedAndHistory = insertWithSoftDeleted(saveHistory)

// imperative
const insert = (usesHistory, usesSoftDeleted, isUnique) => toDbFormat => ppipe(
    toDbFormat,
    usesSoftDeleted
      ? pipe(findSoftDeleted, either(update, save))
      : isUnique
      ? pipe(findExistent, save)
      : save,
    usesHistory
      ? saveHistory
      : noop,
    emitEvent,
    transform,
)

const insert = (usesHistory, usesSoftDeleted, isUnique) => toDbFormat => ppipe(
    toDbFormat,
        usesSoftDeleted ? pipe(findSoftDeleted, either(update, save)) :
        isUnique        ? pipe(findExistent, save)                    :
                          save,
    usesHistory
      ? saveHistory
      : noop,
    emitEvent,
    transform,
)

const insert = (usesHistory, usesSoftDeleted, isUnique) => toDbFormat => {
    $ = toDbFormat($);
    if (usesSoftDeleted) {
        $ = findSoftDeleted($);
        $ = $ ? update($) : save($);
    } else if (isUnique) {
        $ = findExistent($);
        $ = save($);
    } else {
        $ = save($);
    }
    if (usesHistory) {
        $ = saveHistory($);
    }
    $ = emitEvent($);
    $ = transform($);
}

// matchy style
// DESTROY ALL IFS: yopu're picking the logic based on a flag, why not just pass in the logic?
const insert = (usesHistory, usesSoftDeleted, isUnique) => toDbFormat => ppipe(
    toDbFormat,
    match
       usesSoftDeleted: pipe(findSoftDeleted, either(update, save))
       isUnique:        pipe(findExistent, save)
       otherwise:       save
    match
      usesHistory: saveHistory
    emitEvent,
    transform,
)

const insert = (usesHistory, usesSoftDeleted, isUnique) => toDbFormat => ppipe(
    toDbFormat,
    if(usesSoftDeleted)  pipe(findSoftDeleted, either(update, save))
    else if(isUnique)    pipe(findExistent, save)
    else                 save
    match
      usesHistory: saveHistory
    emitEvent,
    transform,
)

const insert = ppipe( toDbFormat, findSoftDeleted, either(save, update), saveHistory, emitEvent, transform);
const insert = ppipe( toDbFormat, findExistent   , save                , saveHistory, emitEvent, transform);
const insert = ppipe( toDbFormat                 , save                , saveHistory, emitEvent, transform);




- what if another if? this is not scalable!!

const insert = (findExistent, save, saveHistory) => toDbFormat => ppipe(
    toDbFormat,
    // findExistent,
    ensureDoesntExist,
    save,
    saveHistory,
    emitEvent,
    transform,
);


const insert = insert({ toDbFormat, findExistent: findSoftDeleted } )
const insert = insert(toDbFormat, findExistent: findSoftDeleted, save: )






const insert                          = ({ toDbFormat, findExistent })              => ppipe();
const insertWithHistory               = ({ toDbFormat, findExistent, saveHistory }) => ppipe();
const insertAlways                    = ({ toDbFormat, noop })                      => ppipe();
const insertAlwaysWithHistory         = ({ toDbFormat, noop, saveHistory })         => ppipe();
const insertWithSoftDeleted           = ({ toDbFormat })                            => ppipe();
const insertWithSoftDeletedAndHistory = ({ toDbFormat, saveHistory })               => ppipe();


// usage
leave
  usesHistory: true
  isUnique: true
  usesSoftDeleted: true

leave
  saveHistory,
  findExistant: findSoftDeleted
  save: either(update, save)

leave
  insert: insertWithSoftDeletedAndHistory

// softDeleted
pipe(
    findSoftDeleted
    either({
        found: update(toDbFormat(doc)), // something
        notFound: save(doc),            // nothing
        foundNotDeleted: error          // left
    })
)

const insert = doc => ppipe(
    findSoftDeleted,
    assert(or(isEmpty, isSoftDeleted), 'already exist'),
    merge(toDbFormat(doc)),
    upsert,
    saveHistory,
    emitEvent,
    transform,
)(doc);

doc => {
    $ = findSoftDeleted(doc);
    // return $ ? update(merge(doc, $)) : save(doc)
    return
        $ && !isSoftDeleted($) ? error('error') :
        !$ ? save($) :
        update(merge(doc, $))

    return
        $ ?
            isSoftDeleted($) ? update(merge(doc, $)) : error('error')
        : save($)

    return match({
        isEmpty: save($),
        isSoftDeleted: update(merge(doc, $)),
        otherwise: error('error'),
    })
}
mergeWithSoftDeleted
const insert = doc => ppipe(
    toDbFormat,
    upsertSoftDeleted,
    // pipeAlso(findSoftDeleted, either(save, update)),
    // upsert,
    saveHistory,
    emitEvent,
    transform,
)(doc);
