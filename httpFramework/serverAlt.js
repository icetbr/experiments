import { createServer, STATUS_CODES } from 'node:http';

const error = (code, message, originalError) => { throw new Error({ code, message, originalError }) };
// const error = (code, message, originalError) => { throw new Error({ error: STATUS_CODES[code], message, statusCode: code }, { cause: originalError }) };

// const errors = {
//     400: BAD_REQUEST_ERROR: message => ({
//         statusCode: 400,
//         error: 'Bad Request',
//         message,
//     }, ],
// }),

// NOT_FOUND: (message = 'Not Found') => ({
//     errors: [{
//         statusCode: 404,
//         error: 'Not Found',
//         message,
//     }, ],
// }),

// serializerFn(Object.create(error, {
//     error: { value: statusCodes[statusCode + ''] },
//     message: { value: error.message },
//     statusCode: { value: statusCode }
//   }

// server.on('error', (err) => {
//     console.error('micro:', err.stack);
//     process.exit(1);
//   });
//   TODO: analyze middleware? Nop because sender should take care of this

// server repleceable
// considerar sintaxe then ao inves de await se tiver promessas
// do i need Content-Length?
export const handleRequest = router => (req, res) => { // router or routes as param?
    try {
        const credentials = authenticate(req) || error(401);
        const route = match(router, req) || error(404); // throws on match not found or here? req.method, req.url
        const isAuthorized = authorize(route, req) || error(403);
        const validData = validate(req) || error(400);
        const response = route.handler(req, validData);// || send(res, 204, null); // browser will not reload
        return json(res, response);
    } catch (e) {
        res.send(e) //    errors: [{
    }
    // console.log(x)
    // await new Promise(resolve => setTimeout(resolve, 600000));

}
//).listen(3000);

// composable behaviour?

// explicit dependencies
// modular


// createRouter
(req, res) => _(
    route,
)
    // route      handler
    // authenten  credentials
    // authorize
    // parse      body, query
    // validate
    // handle     response
    // serialize
    // response
// pensar na api como eu faria

// tips
// consider a default handler, maybe one that returns all available routes, even a "did you mean X lib"

// COMPARE WITH

// access-control-expose-headers:
// 'WWW-Authenticate,Server-Authorization'
// cache-control:
// 'no-cache'
// connection:
// 'keep-alive'
// content-length:
// 98
// content-type:
// 'application/json; charset=utf-8'
// date:
// 'Wed, 20 Sep 2023 18:51:44 GMT'
// vary:
// 'origin'
