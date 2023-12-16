// goals
// - framework agnostic
// - auto complete


const
    routes1 = {
        getById: ['GET', `${baseUrl}/{id}`, validators.paramsId, validators.query, schemas.none ],
        getById: ['GET', `/companies/{company}/employee/{id}?fields&format`, {company, id}, {fields, format}, schemas.none ],
        getById: ['GET', `/companies/{company}/employee/{id}?fields&format` ], // global registered validators
        getById: ['GET', `/companies/${company}/employee/${id}?${fields}&${format}` ], // global registered validators
        getById: ['GET', `/companies/{company}/employee/{id}?fields&format`, { schema: none, permission: ['save'] } ],
        getById: ['GET', `/companies/{company}/employee/{id}?fields&format`, noSchema, ['canSave'] ],

        getById: ['GET', `${uri}/{id}`, [urlValidators.paramsId , urlValidators.query, bodyValidators.none]],
        getById: ['GET /companies/{company}/employee/{id}?fields&format', noSchema, canSave ],
        getById: [GET, '/companies/{company}/employee/{id}', { company, id }, { fields, format }, noSchema, canSave ],
    },
    x = [getById, GET, `/companies/{company}/employee/{id}?fields&format`, noSchema, canSave];
    y = { service: getById, http: GET, url: '/companies/{company}/employee/{id}', params: { fields, format }, schema: noSchema, guard: canSave };

    // @get("/companies/{company}/employee/{id}", guards=[is_authorized])

return {
    getById     : ['GET'    , `${uri}/{id}`       , [urlValidators.paramsId , urlValidators.query     , bodyValidators.none      ]], // GET /companies/a000001/leaves/24893hufhsdkjfhkjf7834
    getAll      : ['GET'    , `${uri}`            , [urlValidators.params   , urlValidators.queryMany , bodyValidators.none      ]], // GET /companies/a000001/leaves
    insert      : ['POST'   , `${uri}`            , [urlValidators.params   , urlValidators.query     , bodyValidators.schema    ]], // POST /companies/a000001/leaves body { motivo: 'Quebour o pe', codigo_moptivo }
    insertMany  : ['POST'   , `${uri}List`        , [urlValidators.params   , urlValidators.query     , bodyValidators.insertMany]],
    update      : ['PUT'    , `${uri}/{id}`       , [urlValidators.paramsId , urlValidators.query     , bodyValidators.schema    ]],
    updateMany  : ['PUT'    , `${uri}List`        , [urlValidators.params   , urlValidators.query     , bodyValidators.updateMany]],
    remove      : ['DELETE' , `${uri}/{id}`       , [urlValidators.paramsId , urlValidators.noQuery   , bodyValidators.none      ]],
    removeMany  : ['DELETE' , `${uri}`            , [urlValidators.params   , urlValidators.noQuery   , bodyValidators.deleteMany]],
    hide        : ['PUT'    , `${uri}/{id}/hidden`, [urlValidators.paramsId , urlValidators.query     , bodyValidators.none      ]],
    show        : ['DELETE' , `${uri}/{id}/hidden`, [urlValidators.paramsId , urlValidators.noQuery   , bodyValidators.none      ]],
};

merge(resource, {
    urlValidators: {
        queryMany: { employeeRegisters: csv },
        dateRangeQuery: { ...urlValidators.queryMany, start: date.required(), end: date.required() },
    },
    routes: {
        getAllIntersectingPeriod: ['GET', `${uri}/intersectingPeriod`, [urlValidators.params, urlValidators.dateRangeQuery, bodyValidators.none]], // permission!
        getAllBetweenPeriod     : ['GET', `${uri}/betweenPeriod`     , [urlValidators.params, urlValidators.dateRangeQuery, bodyValidators.none]],
    },
});


// Other frameworks
// https://github.com/litestar-org/litestar
// https://docs.litestar.dev/latest/usage/parameters.html
// @get("/", guards=[is_authorized])

// https://fastapi.tiangolo.com/#example
// https://fastapi.tiangolo.com/tutorial/query-params/
// @app.get("/items/{item_id}")
// def read_item(item_id: int, q: Union[str, None] = None):

// https://guides.rubyonrails.org/routing.html#the-query-string
