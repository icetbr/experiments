import { createServer } from 'node:http';
import { RegExpRouter } from 'hono/router/reg-exp-router';

const doIt = (res) => (a, b, c) => {
    res.end('Hi')
}

// createServer((req, res) => res.end('Hello, Bench!')).listen(3000);
// search best practices. - maxSize, security headers for REST api
createServer(async (req, res) => {
    // /favicon.ico
    const router = new RegExpRouter();
    // router.add('GET', '/', doIt(res));
    const route = router.match(req.method, req.url);
    if (route) route.handlers[0]()
    else res.end()
    // console.log(x)
    // await new Promise(resolve => setTimeout(resolve, 600000));

})

// composable behaviour?
// .listen(3000);
// pipe c req c res?
