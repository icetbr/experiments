import { addSuite } from '../benchmark/mitata.js';
import { getQueryParam } from './hono.js';
import qs from 'qs';
import fastQueryString from 'fast-querystring';
import native from 'node:querystring';
import queryString from 'query-string';
import querystringify from 'querystringify';
import awsQueryStringParser from '@aws-sdk/querystring-parser';
import querystringparser from 'querystringparser';

function tail(url) {
  const index = url.indexOf('?');
  return index === -1 ? '' : url.substring(index + 1);
}

const typia = (url) => {
  return new URLSearchParams(tail(url)); //decode()
};
// elysia fast-querystring

const cases = {
    'URLSearchParams'             : input => new URLSearchParams(tail(input)),
    hono                          : getQueryParam,
    'fast-querystring'            : input => fastQueryString.parse(tail(input)),
    querystringparser             : input => querystringparser.parse(tail(input)),
    // qs                            : input => qs.parse(tail(input)),
    // 'node querystring'            : input => native.parse(tail(input)),
    // 'query-string'                : input => queryString.parse(tail(input)),
    // querystringify                : input => querystringify.parse(tail(input)),
    // '@aws-sdk/querystring-parser' : input => awsQueryStringParser.parseQueryString(tail(input)),

    // 'URLSearchParams-with-Object.fromEntries': input => Object.fromEntries(new URLSearchParams(tail(input))),

    'URLSearchParams-with-construct': input => {
      const u = new URLSearchParams(tail(input));
      const data = {};
      for (const [key, value] of u.entries()) {
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else if (data[key]) {
          data[key] = [].concat(data[key], value);
        } else {
          data[key] = value;
        }
      }
      return data;
    },
};

const cases2 = {
  hono                          : getQueryParam,
  qs                            : qs.parse,
  'fast-querystring'            : fastQueryString.parse,
  'node querystring'            : native.parse,
  'query-string'                : queryString.parse,
  querystringify                : querystringify.parse,
  '@aws-sdk/querystring-parser' : awsQueryStringParser.parseQueryString,
  querystringparser             : querystringparser.parse,

  'URLSearchParams-with-Object.fromEntries': input => Object.fromEntries(new URLSearchParams(input)),
}

const cases3 = {
  'URLSearchParams': input => {
    const x = new URLSearchParams(tail(input));
    return x.get('frappucino') + x.get('goat') + x.get('pond') + x.get('foo');
  },
  hono: input => {
    const x = getQueryParam(input);
    return x.frappucino + x.goat + x.pond + x.foo;
  },
  honoIndexed: input => {
    const x = getQueryParam(input, null, null, 27);
    return x.frappucino + x.goat + x.pond + x.foo;
  },
  'fast-querystring': input => {
    const x = fastQueryString.parse(tail(input));
    return x.frappucino + x.goat + x.pond + x.foo;
  },
  querystringparser: input => {
    const x = querystringparser.parse(tail(input));
    return x.frappucino + x.goat + x.pond + x.foo;
  },
}
const cases4 = {
  'URLSearchParams': input => {
    const x = new URLSearchParams(input);
    return x.get('frappucino') + x.get('goat') + x.get('pond') + x.get('foo');
  },
  'fast-querystring': input => {
    const x = fastQueryString.parse(input);
    return x.frappucino + x.goat + x.pond + x.foo;
  },
  querystringparser: input => {
    const x = querystringparser.parse(input);
    return x.frappucino + x.goat + x.pond + x.foo;
  },
}

// const input = 'https://www.google.com/site?frappucino=muffin&goat=scone&pond=moose&foo=bar&foo=baz';
// const input = 'https://www.google.com/site?frappucino=muffin&goat=scone&pond=moose&foo=bar';
const input = 'frappucino=muffin&goat=scone&pond=moose&foo=bar';
// console.log(cases3['querystringparser'](input));
addSuite('Query Parser', cases4, { params: input });

// Query Parser
// ---------------------------------
// URLSearchParams    642.46 ns/iter
// hono               628.89 ns/iter
// fast-querystring    682.9 ns/iter
// querystringparser  683.09 ns/iter

// conclusion: URLSearchParams is enough
