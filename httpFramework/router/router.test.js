import { test } from "node:test";
import assert from "node:assert/strict";
const { equal:eq } = assert;

// /v1/companies/a000001/employees/{id}
test('basic', () => {
    const routes = {
        findById  : { handler: findById  , method: 'GET'   , path: `${uri}/{id}` , query: { fields: jsonMask } },
        find      : { handler: find      , method: 'GET'   , path: `${uri}`      , query: { fields: jsonMask, skip: number, limit: number, sort: csv, ids: csv } },
        insert    : { handler: insert    , method: 'POST'  , path: `${uri}`      , body: schema },
        insertMany: { handler: insertMany, method: 'POST'  , path: `${uri}List`  , body: [schema] },
        update    : { handler: update    , method: 'PUT'   , path: `${uri}/{id}` , body: schemaWithId },
        updateMany: { handler: updateMany, method: 'PUT'   , path: `${uri}List`  , body: [schemaWithId] },
        remove    : { handler: remove    , method: 'DELETE', path: `${uri}/{id}`},
        removeMany: { handler: removeMany, method: 'DELETE', path: `${uri}`      , query: { ids: csv } },
    }
    const expects = {
        '/employees'
    }

    eq(1, 1)
});



// ${uri}/{id}
// ${uri}`
// ${uri}`
// ${uri}List`
// ${uri}/{id}
// ${uri}List`
// ${uri}/{id}
// ${uri}`
