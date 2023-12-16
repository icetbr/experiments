// ideal
find  GET  URI  ?fields=jsonMask&skip=number&limit=number&sort=csv&ids=csv

find: ['GET', `${uri}`, { fields: jsonMask, skip: number, limit: number, sort: csv, ids: csv }]
find: { method: 'GET', path: `${uri}`, query: { fields: jsonMask, skip: number, limit: number, sort: csv, ids: csv } },
find: get(`${uri}`, { fields: jsonMask, skip: number, limit: number, sort: csv, ids: csv }),

findById: get('/:id', (id, fields) => ) // validations stay elsewhere
findById: get('/:id?fields=jsonMask', (id, fields) => )
findById: get({ path: { id: string }}, '/:id?fields=jsonMask', (id, fields) => )
find    : ['GET', `${uri}`     , {fields:jsonMask,skip:number,limit:number,sort:csv,ids:csv}, noSchema, can[`find${name}`]],
findById: ['GET', `${uri}/{id}`, [urlValidators.query, bodyValidators.none]]
findById: get(`${uri}/{id}`, {fields:jsonMask}, can[`find${name}`),
find    : get(`${uri}`     , {fields:jsonMask,skip:number,limit:number,sort:csv,ids:csv}, can[`find${name}`]],

?fields=jsonMask&skip=number&limit=number&sort=csv&ids=csv
{fields:jsonMask,skip:number,limit:number,sort:csv,ids:csv}
{ fields : jsonMask, skip : number, limit : number, sort : csv, ids : csv }
**findById**  GET   ${uri}/{id}?{ fields: jsonMask }

findById: can('readSchedules', get('/:id', (id, fields) => )) // validations stay elsewhere

get('/:id', findById, can: 'readSchedules')
findById: (id, fields) => )) // validations stay elsewhere

routes = {
    findById   : get (`${uri}/{id}`, { fields: jsonMask }),
    find       : get (`${uri}`, { fields: jsonMask, skip: number, limit: number, sort: csv, ids: csv }),
    insert     : post (`${uri}`, schema),
    insertMany : post (`${uri}List`, [schema]),
    update     : put (`${uri}/{id}`, schemaWithId),
    updateMany : put (`${uri}List`, [schemaWithId]),
    remove     : delete(`${uri}/{id}`),
    removeMany : delete(`${uri}`, { ids: csv }),

    findById  : get   (`${uri}/{id}`, { fields: jsonMask }                                                  ),
    find      : get   (`${uri}`     , { fields: jsonMask, skip: number, limit: number, sort: csv, ids: csv }),
    insert    : post  (`${uri}`     , schema                                                                ),
    insertMany: post  (`${uri}List` , [schema]                                                              ),
    update    : put   (`${uri}/{id}`, schemaWithId                                                          ),
    updateMany: put   (`${uri}List` , [schemaWithId]                                                        ),
    remove    : delete(`${uri}/{id}`                                                                        ),
    removeMany: delete(`${uri}`     , { ids: csv }                                                          ),

    findById   : ['GET'    , `${uri}/{id}`, { fields: jsonMask }                                                  ,               ],
    find       : ['GET'    , `${uri}`     , { fields: jsonMask, skip: number, limit: number, sort: csv, ids: csv },               ],
    insert     : ['POST'   , `${uri}`     ,                                                                       , schema        ],
    insertMany : ['POST'   , `${uri}List` ,                                                                       , [schema]      ],
    update     : ['PUT'    , `${uri}/{id}`,                                                                       , schemaWithId  ],
    updateMany : ['PUT'    , `${uri}List` ,                                                                       , [schemaWithId]],
    remove     : ['DELETE' , `${uri}/{id}`,                                                                       ,               ],
    removeMany : ['DELETE' , `${uri}`     , { ids: csv }                                                          ,               ],

    findById  : { method: 'GET'   , path: `${uri}/{id}` , query: { fields: jsonMask } },
    find      : { method: 'GET'   , path: `${uri}`      , query: { fields: jsonMask, skip: number, limit: number, sort: csv, ids: csv } },
    insert    : { method: 'POST'  , path: `${uri}`      , body: schema },
    insertMany: { method: 'POST'  , path: `${uri}List`  , body: [schema] },
    update    : { method: 'PUT'   , path: `${uri}/{id}` , body: schemaWithId },
    updateMany: { method: 'PUT'   , path: `${uri}List`  , body: [schemaWithId] },
    remove    : { method: 'DEL\ETE', path: `${uri}/{id}`},
    removeMany: { method: 'DELETE', path: `${uri}`      , query: { ids: csv } },

    findById   : { method: 'GET'    , path: `${uri}/{id}` , query: { fields: jsonMask                                                   }, body:{}              },
    find       : { method: 'GET'    , path: `${uri}`      , query: { fields: jsonMask, skip: number, limit: number, sort: csv, ids: csv }, body:{}              },
    insert     : { method: 'POST'   , path: `${uri}`      , query: {                                                                    }, body: schema         },
    insertMany : { method: 'POST'   , path: `${uri}List`  , query: {                                                                    }, body: [schema]       },
    update     : { method: 'PUT'    , path: `${uri}/{id}` , query: {                                                                    }, body: schemaWithId   },
    updateMany : { method: 'PUT'    , path: `${uri}List`  , query: {                                                                    }, body: [schemaWithId] },
    remove     : { method: 'DELETE' , path: `${uri}/{id}` , query: {                                                                    }, body:{}              },
    removeMany : { method: 'DELETE' , path: `${uri}`      , query: { ids: csv                                                           }, body:{}              },

    findById  : { service: findById  , method: 'GET'   , path: `${uri}/{id}` , query: { fields: jsonMask } },
    find      : { service: find      , method: 'GET'   , path: `${uri}`      , query: { fields: jsonMask, skip: number, limit: number, sort: csv, ids: csv } },
    insert    : { service: insert    , method: 'POST'  , path: `${uri}`      , body: schema },
    insertMany: { service: insertMany, method: 'POST'  , path: `${uri}List`  , body: [schema] },
    update    : { service: update    , method: 'PUT'   , path: `${uri}/{id}` , body: schemaWithId },
    updateMany: { service: updateMany, method: 'PUT'   , path: `${uri}List`  , body: [schemaWithId] },
    remove    : { service: remove    , method: 'DELETE', path: `${uri}/{id}`},
    removeMany: { service: removeMany, method: 'DELETE', path: `${uri}`      , query: { ids: csv } },

    // allows easy overite
    findById  : { method: 'GET'   , path: `${uri}/{id}` , query: v.fields },
    find      : { method: 'GET'   , path: `${uri}`      , query: v.many },
    insert    : { method: 'POST'  , path: `${uri}`      , body: schema },
    insertMany: { method: 'POST'  , path: `${uri}List`  , body: [schema] },
    update    : { method: 'PUT'   , path: `${uri}/{id}` , body: schemaWithId },
    updateMany: { method: 'PUT'   , path: `${uri}List`  , body: [schemaWithId] },
    remove    : { method: 'DELETE', path: `${uri}/{id}`},
    removeMany: { method: 'DELETE', path: `${uri}`      , query: v.ids },
};

```
find.query +=
<!-- /v1/companies/{company}/leaves -->


- override needs to change all instances
  urlValidators.params = { ...urlValidators.params,  }
