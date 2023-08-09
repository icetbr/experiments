// NORMAL

let loadConfigs = (log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }, format = toUsedFormat) => configsInfo => {
    log.info(`Loading ETCD configs from ${ETCD_ADDR}`);

    const client = new Etcd(
        ETCD_ADDR.split(','),
        { auth: { user: ETCD_USER, pass: ETCD_PASS } },
    );

    const configs = mapValues(configsInfo, etcdKey => {
        const value = client.getSync(etcdKey)?.body?.node?.value;
        if (value === null) throw new Error(`${etcdKey} not found in ${ETCD_ADDR}`);
        return value.charAt('0') === '{' ? JSON.parse(value) : value;
    });

    return format(configs);
};

/*****************************************************************************************/
// ETCDV3

let fetchEtcd2 = (log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }) => {
    const client = new Etcd(
        ETCD_ADDR.split(','),
        { auth: { user: ETCD_USER, pass: ETCD_PASS } },
    );

    return etcdKey => client.getSync(etcdKey)?.body?.node?.value);
};

let fetchEtcd3 = (log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }) => {
    const client = new Etcd(
        ETCD_ADDR.split(','),
        { auth: { user: ETCD_USER, pass: ETCD_PASS } },
    );

    return etcdKey => client.getSync(etcdKey)?.body?.node?.value);
};

let loadConfigs = (log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }, fetch = fetchEtcd2) => configsInfo => {
    log.info(`Loading ETCD configs from ${ETCD_ADDR}`);

    return mapValues(configsInfo, etcdKey => {
        const value = fetch(etcdKey);
        if (value === null) throw new Error(`${etcdKey} not found in ${ETCD_ADDR}`);
        return value.charAt('0') === '{' ? JSON.parse(value) : value;
    });
};

/*****************************************************************************************/

const fetch = etcdKey => client.getSync(etcdKey)?.body?.node?.value;

let loadConfigs = (log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }, fetch = fetch) => configsInfo => {
    log.info(`Loading ETCD configs from ${ETCD_ADDR}`);

    const client = new Etcd(
        ETCD_ADDR.split(','),
        { auth: { user: ETCD_USER, pass: ETCD_PASS } },
    );

    return mapValues(configsInfo, etcdKey => {
        const value = fetch(etcdKey);
        if (value === null) throw new Error(`${etcdKey} not found in ${ETCD_ADDR}`);
        return value.charAt('0') === '{' ? JSON.parse(value) : value;
    });
};

/*****************************************************************************************/

let fetch = ({ ETCD_ADDR, ETCD_USER, ETCD_PASS }) => configsInfo => {
    const client = new Etcd(
        ETCD_ADDR.split(','),
        { auth: { user: ETCD_USER, pass: ETCD_PASS } },
    );

    return mapValues(configsInfo, etcdKey => client.getSync(etcdKey)?.body?.node?.value);
};

let validate = configs => mapValues(configs, config => {
    if (value === null) throw new Error(`${etcdKey} not found in ${ETCD_ADDR}`);
    return value.charAt('0') === '{' ? JSON.parse(value) : value;
});

let loadConfigs = (log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }) => configsInfo => pipe(configsInfo,
    log(`Loading ETCD configs from ${ETCD_ADDR}`),
    fetch({ ETCD_ADDR, ETCD_USER, ETCD_PASS }),
    validate
)

/*****************************************************************************************/

let loadConfigs = (log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }, fetch = fetch) => configsInfo => {
    log(`Loading ETCD configs from ${ETCD_ADDR}`);

    return mapValues(configsInfo, etcdKey => {
        const value = fetch(etcdKey);
        if (value === null) throw new Error(`${etcdKey} not found in ${ETCD_ADDR}`);
        return value.charAt('0') === '{' ? JSON.parse(value) : value;
    });
};

let loadConfigs = (log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }, fetch) => configsInfo => pipe(configsInfo,
    log(`Loading ETCD configs from ${ETCD_ADDR}`),
    fetch({ ETCD_ADDR, ETCD_USER, ETCD_PASS }),
    assertExist,
    parseJson,
)

let loadConfigs = (log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }, fetch) => $ => (
    $ = log(`Loading ETCD configs from ${ETCD_ADDR}`, $),
    $ = fetch({ ETCD_ADDR, ETCD_USER, ETCD_PASS }, $),
    $ = assertExist($), -- pegar lib p/ nornmalziarestes nomes!!!??
    $ = parseJson($),
)

let loadConfigs = (log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }, fetch) => pipe(
    log: $ = log(`Loading ETCD configs from ${ETCD_ADDR}`, $),
    fetch: $ = fetch({ ETCD_ADDR, ETCD_USER, ETCD_PASS }, $),
    validate: $ = assertExist($), -- pegar lib p/ nornmalziarestes nomes!!!??
    $ = parseJson($),
)

// ALTERNATIVAS
    // connectEtcd?
    // etcdFetcher?
    // fecthEtcd2
    // loadConfigsEtcd2 => MELHOR! expoe so o que o usuario precisa saber!
    // TODO: analisar stack trace do loadConfigs assim

/*****************************************************************************************/

const fetch = configs => {
    log.info(`Loading ETCD configs from ${ETCD_ADDR}`);

    const client = new Etcd(
        ETCD_ADDR.split(','),
        { auth: { user: ETCD_USER, pass: ETCD_PASS } },
    );

    return mapValues(configsInfo, etcdKey => client.getSync(etcdKey)?.body?.node?.value);
}

let loadConfigs = (log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }, fetch = fetch) => {
    const value = fetch({ ETCD_ADDR, ETCD_USER, ETCD_PASS }, configsInfo);
    return mapValues(configs, config => {
        if (value === null) throw new Error(`${etcdKey} not found in ${ETCD_ADDR}`);
        return value.charAt('0') === '{' ? JSON.parse(value) : value;
    });
};

/*****************************************************************************************/
// named return variations

let configLoader = (log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }, fetch) => {
    const loadConfigs = $ => (
    )
    return loadConfigs;
}

let configLoader = (log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }, fetch) => ({
    loadConfigs: $ => (
    )
})

/*****************************************************************************************/
// is pipe better?
loadConfigs = (log, etcdInfo, fetch) => pipe(log(`Loading ETCD configs`), fetch(etcdInfo), validate)

loadConfigs = (log, env, fetch) => pipe
    ($ = log(`Loading ETCD configs from ${ETCD_ADDR}`, $), $ = fetch(env, $), $ = validate($))

loadConfigs = (log, env, fetch) => pipe(log(`Loading ETCD configs from ${ETCD_ADDR}`), fetch(env), validate)

loadConfigs = (log, env, fetch) => ($ = log(`Loading ETCD configs from ${ETCD_ADDR}`, $), $ = fetch(env, $), $ = validate($))

loadConfigs = (fetch, toUsedFormat) => p(
    mapValues(p(
        fetch,
        assertExist(`${etcdKey} not found in ${ETCD_ADDR}`),
        parseJson
    )),
    toUsedFormat
);

/*****************************************************************************************/
// functions near they use
loadConfigs = (log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }, fetch) => {
    const validate = pipe(assertExist, parseJson);

    return $ => (
        $ = log(`Loading ETCD configs from ${ETCD_ADDR}`, $),
        $ = fetch({ ETCD_ADDR, ETCD_USER, ETCD_PASS }, $),
        $ = assertExist($), -- pegar lib p/ nornmalziarestes nomes!!!??
        $ = parseJson($),
    )
)

/*****************************************************************************************/
/* small functions comparison */
loadConfigs = (log, etcdInfo, fetch) => p(log(`Loading ETCD configs`), fetch(etcdInfo), assertExist, parseJson)

validate = config => p(assertExist, parseJson)
loadConfigs = (log, etcdInfo, fetch) => p(log(`Loading ETCD configs`), fetch(etcdInfo), validate)

loadConfigs = (log, etcdInfo, fetch) => p(log(`Loading ETCD configs`), fetch(etcdInfo), assertExist, parseJson)

/*****************************************************************************************/
// keep all impure together?

const fetchEtcd2 = (log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }) => {
    log(`Loading ETCD configs from ${ETCD_ADDR}`);

    const client = new Etcd(
        ETCD_ADDR.split(','),
        { auth: { user: ETCD_USER, pass: ETCD_PASS } },
    );

    return etcdKey => client.getSync(etcdKey)?.body?.node?.value;
};

export const loadConfigs = fetch => configsInfo => mapValues(configsInfo, $ => (
    $ = fetch($),
    $ = assertExist($),
    $ = parseJson($)
));

// if it were 2 values only
export const loadConfigs = fetch => configsInfo => mapValues(configsInfo, $ => parseJson(assertExist($))),

export const loadConfigs = fetch => configsInfo => mapValues(configsInfo, loadConfig),

/*****************************************************************************************/
// alternatives to fetch "inline"

// original
export const loadConfigs = (fetch, format = toUsedFormat) => (configsInfo, $ = configsInfo) => (
    $ = mapValues($, (etcdKey, $ = etcdKey) => ( // can be overriden by mapValues!!
        $ = fetch($),
        $ = assertExist(`${etcdKey} not found`, $),
        $ = parseJson($)
    )),
    $ = format($)
);

export const loadConfigs = (fetch, log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }, format = toUsedFormat) => (configsInfo, $ = configsInfo) => (
    $ = mapValues($, (etcdKey, $ = etcdKey) => ( // can be overriden by mapValues!!
        $ = memo(fetch(log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }))($),
        $ = assertExist(`${etcdKey} not found`, $),
        $ = parseJson($)
    )),
    $ = format($)
);

export const loadConfigs = (fetch, log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }, format = toUsedFormat) => (configsInfo, $ = configsInfo) => (
    $ = doLoad(fetch(log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }))($)
    $ = format($)
);

export const loadConfigs = log => ({ fetch, env: { ETCD_ADDR, ETCD_USER, ETCD_PASS }, format = toUsedFormat, configsInfo, $ = configsInfo }) => (
    fetch = fetch(log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }),

    $ = mapValues($, (etcdKey, $ = etcdKey) => ( // can be overriden by mapValues!!
        $ = fetch($),
        $ = assertExist(`${etcdKey} not found`, $),
        $ = parseJson($)
    )),
    $ = format($)
);

export const loadConfigs = (fetcher, log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }, format = toUsedFormat, configsInfo) => {
    const fetch = fetcher(log, { ETCD_ADDR, ETCD_USER, ETCD_PASS });

    const configs = mapValues(configsInfo, etcdKey => {
        const fetched = fetch(etcdKey);
        assertExist(`${etcdKey} not found`, fetched);

        return parseJson(fetched);
    });

    return toUsedFormat(configs);
};

/*****************************************************************************************/
// child usage

export const loadConfigs = log => enhanceConfigs(base.loadConfigs(fetchEtcd2(log, env), toUsedFormat)(configsInfo));

export const loadConfigs = log => enhanceConfigs(base.loadConfigsEtcd2(log, env, toUsedFormat)(configsInfo));

export const loadConfigs = log => base.loadConfigsEtcd2(log, env, toUsedFormat, enhanceConfigs)(configsInfo));

export const loadConfigs = log => {
    const fetch = fetchEtcd2(log, env);
    const configs = base.loadConfigs(fetch, toUsedFormat)(configsInfo);
    return enhanceConfigs(configs);
};

export const loadConfigs = (log, $) => (
    $ = fetchEtcd2(log, env),
    $ = base.loadConfigs($, toUsedFormat)(configsInfo),
    $ = enhanceConfigs($)
)

createBaseSevices(fetch2, configsInfo, toUsedFormat)

/*****************************************************************************************/
// usage
export const loadConfigs = log => loadConfigs(fetchEtcd2(log, env), format)(configsInfo);
export const loadConfigs = log => loadConfigsEtcd2(log, env, format, configsInfo);         // format can't be optional
export const loadConfigs = log => loadConfigsEtcd2(log, env)(format)(configsInfo);
export const loadConfigs = log => loadConfigsEtcd2({ log, env, format, configsInfo });

export const loadConfigs = log => loadConfigsEtcd2(log, env)()(configsInfo);
export const loadConfigs = log => loadConfigsEtcd2({ log, env, configsInfo });

export const loadConfigs = log => (base.loadConfigs(fetchEtcd2(log, env), pipe(toUsedFormat, enhanceConfig))(configsInfo));
export const loadConfigs = log => enhanceConfigs(base.loadConfigsEtcd2(log, env)(toUsedFormat)(configsInfo));

export const loadConfigsEtcd2 = (log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }) => fetchEtcd2(log, { ETCD_ADDR, ETCD_USER, ETCD_PASS })) |> loadConfigs;


export const loadConfigs = loadConfigsEtcd2(log, env)(format)(configsInfo);
export const loadConfigs = log => loadConfigsEtcd2(log)(env)(format)(configsInfo); // nao é bom ocultar desta forma, sem mostrar parametros que recebem

export const loadConfigs = log =>
    base.loadConfigs
        (fetchEtcd2(log, env))
        (format)
        (configsInfo);

export const loadConfigs = log =>
    base.loadConfigs({
        fetch: fetchEtcd2(log, env),
        format,
        configsInfo,
    })

export const loadConfigs = log => loadConfigs({ fetch: fetchEtcd2, log, env, format, configsInfo })
export const loadConfigs = log => loadConfigsEtcd2({ log, env, format, configsInfo })

// MY FAVORITE
// put the most likely to be fixed params at first
// config is an special case, the configuration is "embedded", it has no benefit to put it separated
export const loadConfigs = loadConfigsEtcd2({ env, format, configsInfo })
export const loadConfigsEtcd2 = loadConfigs(fetchEtcd2)
export const loadConfigs = fetch => ({env, format = toUsedFormat, configsInfo }) => log =>
loadConfigs(log)




/*****************************************************************************************/
const format = _ => enhanceConfigs(toUsedFormat(_));
const format = pipe(enhanceConfigs, toUsedFormat);

/*****************************************************************************************/
// fetch as regular param
loadConfigs(fetchEtcd2, log, env, format)
export const loadConfigs = (fetch, log, etcdInfo, format = toUsedFormat) => (configsInfo, $ = configsInfo) => {
//OR
loadConfigsEtcd2(log, env, format)
export const loadConfigsEtcd2 = loadConfigs.bind(null, fetchEtcd2);

// fetch as simple arg: locks fetch into etcd
loadConfigsEtcd2(log, env, format)
export const loadConfigsEtcd2 = loadConfigs(fetchEtcd2)
export const loadConfigs = fetch => (log, etcdInfo, format = toUsedFormat) => (configsInfo, $ = configsInfo) => {

// fetch as partial app: fetch does not need to be etcd
loadConfigsEtcd2(log, env)(format)
//OR
loadConfigs(fetchEtcd2(log, env))(format);
export const loadConfigs = fetch => (format = toUsedFormat) => (configsInfo, $ = configsInfo)
export const loadConfigsEtcd2 = (log, etcdInfo) => loadConfigs(fetchEtcd2(log, etcdInfo));

// partial app "parameter reordering"
loadConfigsEtcd2(log, env, format)
export const loadConfigsEtcd2 = (log, etcdInfo, format = toUsedFormat) => loadConfigs(fetchEtcd2(log, etcdInfo), format);
export const loadConfigs = (fetch, format = toUsedFormat) => (configsInfo, $ = configsInfo);

// named params
loadConfigs({ fetchEtcd2, log, env, format })
export const loadConfigs = ({fetch, log, etcdInfo, format = toUsedFormat, configsInfo, $ = configsInfo }) => {

// named params hybrid
loadConfigsEtcd2({ log, env, format })
export const loadConfigsEtcd2 = loadConfigs(fetchEtcd2)
export const loadConfigs = fetch => ({ log, etcdInfo, format = toUsedFormat, configsInfo, $ = configsInfo }) => {

// inicialmente hybrid p/ instigar disciplina?

loadConfigsEtcd2(format)(env)
export const loadConfigs = (fetch, log, etcdInfo, format = toUsedFormat) => (configsInfo, $ = configsInfo) => { // for comparison
export const loadConfigs = fetch => (format = toUsedFormat) => etcdInfo => log => (configsInfo, $ = configsInfo) => {

startApp
  app = {} |>
    loadConfigs
    loadDb

createRequiredServices('ahpi', env, configsInfo, loadConfigs); // pensando: vira namedParameters? quero bindear o configsInfos?

/*****************************************************************************************/
// "condensed" usage, including this variation

export const loadConfigs = log => etcdInfo => fetch => (format = toUsedFormat) => (configsInfo, $ = configsInfo) => (
    $ = mapValues($, (etcdKey, $ = etcdKey) => (
        $ = fetch($),
        $ = assertExist(`${etcdKey} not found`, $),
        $ = parseJson($)
    )),
    $ = format($)
);

export const loadConfigs = log => (
    $ = mapValues($, (etcdKey, $ = etcdKey) => (
        $ = this.fetch(log, this.env)($),
        $ = assertExist(`${etcdKey} not found`, $),
        $ = parseJson($)
    )),
    $ = this.format($)
);

export const loadConfigs = log => info => (
    $ = mapValues($, (etcdKey, $ = etcdKey) => (
        $ = info.fetch(log, info.env)($),
        $ = assertExist(`${etcdKey} not found`, $),
        $ = parseJson($)
    )),
    $ = info.format($)
);


export const loadConfigs = loadConfigs({ fetch: fetchEtcd2, env, format, configsInfo })
export const loadConfigs = loadConfigsEtcd2({ env, format, configsInfo })
export const loadConfigsEtcd2 = info => log => loadConfigs({ fetch: fetchEtcd2(log, info.env), ...info }))

export const loadConfigs = loadConfigsEtcd2({ env, format, configsInfo })
export const loadConfigsEtcd2 = loadConfigs(fetchEtcd2)

import * as configsInfo from configs
loadConfigs(log)(configsInfo) VS loadConfigsEtcd2({ env, format, configsInfo })
createServices(configsInfo)
// import loadConfigs from base
//   more in line with funcional's last param is the data
//   import fetchEtcd2
createServices(loadConfigs)
// import loadConfigs from local
//   loadConfigs "hides" configsInfo
//   import loadConfigsEtcd2

loadConfigsEtcd2

fetch: fetchEtcd2
loadConfigs: loadConfigsEtcd2(format, etcdKeys)

loadConfigs({ log, ...configsInfo })
loadConfigs(log)(configsInfo)
loadConfigs(configsInfo.fetch(log))(configsInfo)
loadConfigsEtcd2 = log, env => loadConfigs(fetchEtcd2(log, env))
loadConfigsEtcd2 = log => info => loadConfigs(fetchEtcd2(log, info.env), info)
loadConfigs(log, env, etcdInfo)


loadConfigsEtcd2 = info => log => env => loadConfigs(fetchEtcd2(log, env))(info)

info.loadConfigs(log)(env)(info)

1) if needs to pass pointer, better to have just one function
- although it is common practice to do so, either as a lambda or a flip, lift, etc

2) only break function if it will be reused?
- avoid spreading logic all over

/*************************************************************************/
// best contenders

// only 1 function
loadConfigs = log => ({ fetch, env: { ETCD_ADDR, ETCD_USER, ETCD_PASS }, format = toUsedFormat, configsInfo, $ = configsInfo }) // expanded
loadConfigs = log => ({ fetch, env, format = toUsedFormat, configsInfo, $ = configsInfo }) // condensed

// 2 functions: condensed
loadConfigs = fetch => ({ format = toUsedFormat, configsInfo, $ = configsInfo })
loadConfigsEtcd2 = info => (log, env) => loadConfigs(fetchEtcd2(log, env))(info)

// 2 functions: expanded
loadConfigs = fetch => ({ format = toUsedFormat, configsInfo, $ = configsInfo })
loadConfigsEtcd2 = info => (log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }) => loadConfigs(fetchEtcd2(log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }))(info)


/*************************************************************************/
// ALT: fetch all to keep function pure

let fetchAllEtcd2 = (log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }) => async etcdKeys => {
    const client = new Etcd(
        ETCD_ADDR.split(','),
        { auth: { user: ETCD_USER, pass: ETCD_PASS } },
    );

    return mapValues(etcdKeys, async $ => await client.getSync(etcdKey)?.body?.node?.value);
};

validate = $ => mapValues($, (key, $ = key) => ( // can be overriden by mapValues!!
    $ = assertExist(`${etcdKey} not found`, $),
    $ = parseJson($)
))

export const loadConfigs = log => ({ fetch, env: { ETCD_ADDR, ETCD_USER, ETCD_PASS }, format = toUsedFormat, configsInfo, $ = configsInfo }) => (
    $ = fetch(log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }),
    $ = validate($)
    $ = format($)
);
