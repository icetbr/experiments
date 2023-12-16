Why cant this be proper JS?

findById  GET   URI/{id}?fields=jsonMask
find      GET   URI?fields=jsonMask&skip=number&limit=number&sort=csv&ids=csv
insert    POST  URI jsonBody
update    PUT   URI jsonBodyWithId

service    method path     query                                                      body
---------- ------ -------- ---------------------------------------------------------- ------------
findById   GET    URI/{id} ?fields=jsonMask
find       GET    URI      ?fields=jsonMask&skip=number&limit=number&sort=csv&ids=csv
insert     POST   URI                                                                 schema
insertMany POST   URIList                                                             [schema]
update     PUT    URI                                                                 schemaWithId
updateMany PUT    URIList                                                             [schemaWithId]
remove     DELETE URI/{id}
removeMany DELETE URI      ?ids=csv

service    method path        query                                                      body
---------- ------ ----------- ---------------------------------------------------------- ------------
findById   GET    ${uri}/{id} ?fields=jsonMask
find       GET    ${uri}      ?fields=jsonMask&skip=number&limit=number&sort=csv&ids=csv
insert     POST   ${uri}                                                                 ${schema}
insertMany POST   ${uri}List                                                             ${[schema]}
update     PUT    ${uri}                                                                 ${schemaWithId}
updateMany PUT    ${uri}List                                                             ${[schemaWithId]}
remove     DELETE ${uri}/{id}
removeMany DELETE ${uri}      ?ids=csv

## PROPOSAL: JSTAB
A format that looks like a string but:

### works like an array
findById  GET   URI/{id}?fields=jsonMask
find      GET   URI?fields=jsonMask&skip=number&limit=number&sort=csv&ids=csv
insert    POST  URI jsonBody
update    PUT   URI jsonBodyWithId

### keyd like an object
findById: GET   URI/{id}?fields=jsonMask
find    : GET   URI?fields=jsonMask&skip=number&limit=number&sort=csv&ids=csv
insert  : POST  URI jsonBody
update  : PUT   URI jsonBodyWithId

### works like an object
service   method path     query                                                      body         permissions
-------   ------ -------- ---------------------------------------------------------- ------------ ------------
findById  GET    URI/{id} ?fields=jsonMask
find      GET    URI      ?fields=jsonMask&skip=number&limit=number&sort=csv&ids=csv
insert    POST   URI                                                                 schema
update    PUT    URI                                                                 schemaWithId

routes.find = null;                           // removing
routes.find.query += &employeeRegisters=csv   // apending
```


