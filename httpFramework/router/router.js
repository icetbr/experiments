import { PATH_ERROR } from "./node.js";
import { Trie } from "./trie.js";

const emptyParam = {};
const nullMatcher = [/^$/, [], {}];

function buildMatcherFromPreprocessedRoutes(routes) {
    if (routes.length === 0) return nullMatcher;

    const trie = new Trie();
    const handlerData = [];

    const routesWithStaticPathFlag = routes
        .map(route => [!/\/:/.test(route[0]), ...route])
        .sort(([isStaticA, pathA], [isStaticB, pathB]) =>
            isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
        );

    const staticMap = {};
    for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
        const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
        if (pathErrorCheckOnly) {
            staticMap[path] = { handlers, params: emptyParam };
        } else {
            j++;
        }

        let paramMap;
        try {
            paramMap = trie.insert(path, j, pathErrorCheckOnly);
        } catch (e) {
            throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
        }

        if (pathErrorCheckOnly) {
            continue;
        }

        handlerData[j] =
            paramMap.length === 0
                ? [{ handlers, params: emptyParam }, null]
                : [handlers, paramMap];
    }

    const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
    for (let i = 0, len = handlerData.length; i < len; i++) {
        const paramMap = handlerData[i][1];
        if (paramMap) {
            for (let j = 0, len = paramMap.length; j < len; j++) {
                paramMap[j][1] = paramReplacementMap[paramMap[j][1]];
            }
        }
    }

    const handlerMap = [];
    // using `in` because indexReplacementMap is a sparse array
    for (const i in indexReplacementMap) {
        handlerMap[i] = handlerData[indexReplacementMap[i]];
    }

    return [regexp, handlerMap, staticMap];
}


const buildMatcher = (allRoutes, method) => {
    const routes = [];

    let hasOwnRoute = false;
    const ownRoute = allRoutes[method]
        ? Object.keys(allRoutes[method]).map(path => [path, allRoutes[method][path]])
        : [];
    if (ownRoute.length !== 0) {
        hasOwnRoute = true;
        routes.push(...ownRoute);
    }

    return hasOwnRoute ? buildMatcherFromPreprocessedRoutes(routes) : null;
};

// const routes = { GET: [], POST: [], PUT: [], DELETE: [] };
// add: (method, path, handler) => routes[method][path] = handler,
export const router = routes => {
    const matchers = { GET: buildMatcher(routes, 'GET'), POST: buildMatcher(routes, 'POST'), PUT: buildMatcher(routes, 'PUT'), DELETE: buildMatcher(routes, 'DELETE') };

    return {
        match: (method, path) => {
        const matcher = matchers[method];

        const staticMatch = matcher[2][path];
        if (staticMatch) return staticMatch;

        const match = path.match(matcher[0]);
        if (!match) return null;

        const index = match.indexOf('', 1);
        const [handlers, paramMap] = matcher[1][index];
        if (!paramMap) return handlers;

        const params = {};
        for (let i = 0, len = paramMap.length; i < len; i++) {
            params[paramMap[i][0]] = match[paramMap[i][1]];
        }

        return { handlers, params };
    }}
};
