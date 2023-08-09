// empty line befiore and after each property

const string = () => 'string', objectId = () => 'objectId', number = () => 'number', list = () => 'list';

const resource = {
    name: 'employees',

    schema: 'schema',

    baseUrl: `/companies/{company}/${name}`,

    validators: {
        params   : { company: string() },
        paramsId : { company: string(), id: objectId() },
        query    : { fields: string(), format: string() },
        queryIds : { fields: string(), ids: list() },
        queryMany: { fields: string(), format: string(), skip: number(), limit: number(), sort: string(), ids: list() },
    },

    schemas: {
        none: null,
        response: schema,
        insertMany: schema,
        updateMany: schema,
    },

    routes: {
        getById: ['GET', `${baseUrl}/{id}`, validators.paramsId, validators.query, schemas.none ],
    },
};