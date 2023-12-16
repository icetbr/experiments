const can = (permission, route) => req =>
    (req && !req.permissions.include(permission))
    ? 'not authorized'
    : route(req)

const get = (path, handler) => req => route(path, handler)

const can = (permission, route) => req => route()(permission)
    (req && !req.permissions.include(permission))
    ? 'not authorized'
    : route(req)

findById: can('readSchedules', get('/:id', (id, fields) => ))

get('/:id', findById, can: 'readSchedules')
findById: (id, fields) => )) // validations stay elsewhere

findById: _(get('/:id')can('readSchedules'), , (id, fields) => ))
