// "nested"
export default {
    env: assign(base.env, {
        DISABLE_TRIGGERS: process.env.DISABLE_TRIGGERS === 'true',       // usado em produção para as máquinas "http" não lidarem com o trafego "nsq"
        SELECT_TRIGGERS: process.env.SELECT_TRIGGERS?.split(',') || [],
    }),

    loadConfigs: base.loadConfigsEtcd2({
        env,
        format: $ => enhanceConfigs(toUsedFormat($)),

        etcdKeys: assign(base.etcdKeys, {                     // EXAMPLE
            srhHash           : '/ahpi/keys/srh/hash'      ,  // aSrhKey
            rosteringHash     : '/ahpi/keys/rostering/hash',  // aRosteringKey
        }),

    }),
};

// flat
export default {
    env: assign(base.env, {
        DISABLE_TRIGGERS: process.env.DISABLE_TRIGGERS === 'true',       // usado em produção para as máquinas "http" não lidarem com o trafego "nsq"
        SELECT_TRIGGERS: process.env.SELECT_TRIGGERS?.split(',') || [],
    }),

    etcdKeys: assign(base.etcdKeys, {                     // EXAMPLE
        srhHash           : '/ahpi/keys/srh/hash'      ,  // aSrhKey
        rosteringHash     : '/ahpi/keys/rostering/hash',  // aRosteringKey
    }),

    format: $ => enhanceConfigs(toUsedFormat($)),

    fetch: fetchEtcd2,

    loadConfigs: base.loadConfigsEtcd2,
};

// outside oneline
export default {
    logInfo: { name: 'ahpi', level: env.LOG_LEVEL },
    appInfo: { disableTriggers: env.DISABLE_TRIGGERS, selectTriggers: env.SELECT_TRIGGERS },
    loadConfigs: loadConfigsEtcd2({ etcdInfo, format, etcdKeys })
};

enhanceConfigs
app: {
    disableTriggers: env.DISABLE_TRIGGERS,
    selectTriggers: env.SELECT_TRIGGERS
},

// outside multiline
export default {
    logInfo: {
        name: 'ahpi',
        level: env.LOG_LEVEL
    },

    logName: 'ahpi',
    logLevel: env.LOG_LEVEL,

    loadConfigs: loadConfigsEtcd2({ format, etcdKeys })
    loadConfigs: async log => format((await loadConfigsEtcd2(log, etcdKeys)))
    loadConfigs: log => p(loadConfigsEtcd2(log, etcdKeys), format)
};

// outside multiline
export default {
    logName: 'ahpi',
    logLevel: env.LOG_LEVEL,

    fetch: fetchEtcd2,
    etcdInfo,
    format: $ => enhanceConfigs(toUsedFormat($)),

    etcdKeys: assign(base.etcdKeys, {                     // EXAMPLE
        srhHash           : '/ahpi/keys/srh/hash'      ,  // aSrhKey
        rosteringHash     : '/ahpi/keys/rostering/hash',  // aRosteringKey
    }),



    loadConfigs: loadConfigsEtcd2({ format, etcdKeys })
    loadConfigs: async log => format((await loadConfigsEtcd2(log, etcdKeys)))
    loadConfigs: log => p(loadConfigsEtcd2(log, etcdKeys), format)
};


/************************************/
// mapAync flavor

export const loadConfigs = log => async ({ fetch, env: { ETCD_ADDR, ETCD_USER, ETCD_PASS }, format = toUsedFormat, etcdKeys, $ = etcdKeys }) => (
    fetch = fetch(log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }),

    $ = await all(mapValues($, async (etcdKey, $ = etcdKey) => (
        $ = await fetch($),
        $ = assertExist(`${etcdKey} not found`, $),
        $ = parseJson($)
    ))),
    $ = format($)
);

export const loadConfigs = log => async ({ fetch, env: { ETCD_ADDR, ETCD_USER, ETCD_PASS }, format = toUsedFormat, etcdKeys, $ = etcdKeys }) => (
    fetch = fetch(log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }),

    $ = await mapValuesAsync($, async (etcdKey, $ = etcdKey) => (
        $ = await fetch($),
        $ = assertExist(`${etcdKey} not found`, $),
        $ = parseJson($)
    )),
    $ = format($)
);

export const loadConfigs = log => async ({ fetch, env: { ETCD_ADDR, ETCD_USER, ETCD_PASS }, format = toUsedFormat, etcdKeys, $ = etcdKeys }) => (
    fetch = fetch(log, { ETCD_ADDR, ETCD_USER, ETCD_PASS }),

    $ = mapValues($, async (etcdKey, $ = etcdKey) => (
        $ = await fetch($),
        $ = assertExist(`${etcdKey} not found`, $),
        $ = parseJson($)
    )),
    $ = await all($)
    $ = format($)
);

/************************************/
// configsInfo vs configs

const configs = {
    privateKey: '/auth/security/jwt/rsaPrivateKey',
    srhHash           : '/ahpi/keys/srh/hash'      ,  // aSrhKey
    rosteringHash     : '/ahpi/keys/rostering/hash',  // aRosteringKey
};

const env = {
    DISABLE_TRIGGERS: process.env.DISABLE_TRIGGERS === 'true',       // usado em produção para as máquinas "http" não lidarem com o trafego "nsq"
    SELECT_TRIGGERS: process.env.SELECT_TRIGGERS?.split(',') || [],
};

const kibanaLogName = 'ahpi',

const logLevel = env.LOG_LEVEL,

    etcdKeys = assign(base.etcdKeys, {                    // EXAMPLE

    }),

    format = $ => enhanceConfigs(toUsedFormat($)),

    fetch = base.fetchEtcd2;
/************************************/
// signatures (again)
loadConfigs = async log => format((await loadConfigsEtcd2(log, env, etcdKeys)));     // familiar
loadConfigs = log => loadConfigsEtcd2({ log, env, etcdKeys }).then(format);          // promise
loadConfigs = ppipe(loadConfigsEtcd2({ env, etcdKeys }), format);                    // proper composing
loadConfigs = _(loadConfigsEtcd2({ env, etcdKeys }), format);                        // proper composing
loadConfigs = loadConfigsEtcd2({ env, format, etcdKeys });                           // clean, but bad composing
loadConfigs = ppipe(                                                                 // rule: when parentesis, multi line
    loadConfigsEtcd2({ env, etcdKeys }),
    format
);


loadConfigs = loadConfigsEtcd2({ env, etcdKeys });
loadConfigs = ppipe(loadConfigs, toUsedFormat, enhanceConfigs)
loadConfigs = ppipe(loadConfigsEtcd2(env, etcdKeys), toUsedFormat, enhanceConfigs) // how to test these?
loadConfigs = ppipe(loadConfigsEtcd2, toUsedFormat, enhanceConfigs) // how to test these?

/************************************/
// exports

const env = {
    logLevel        : process.env.LOG_LEVEL === '2' ? 'ERROR' : process.env.LOG_LEVEL,

    etcd: {
        address: process.env.ETCD_ADDR,
        user: process.env.ETCD_USER,
        password: process.env.ETCD_PASS,
    },

    disableTriggers: process.env.DISABLE_TRIGGERS === 'true',       // usado em produção para as máquinas "http" não lidarem com o trafego "nsq"
    selectedTriggers : process.env.SELECT_TRIGGERS?.split(',') || [],
};

// etcd: {
//     etcdAddress: process.env.ETCD_ADDR,
//     etcdUser: process.env.ETCD_USER,
//     etcdPassword: process.env.ETCD_PASS,
// },

/***********************************************/
export default {
    kibanaLogName: 'ahpi',
    etcdKeys,
    env,
    fetch: fetchEtcd2,
    format: $ => enhanceConfigs(toUsedFormat($)),
};

/***********************************************/
export default {
    kibanaLogName: 'ahpi',
    logLevel: env.logLevel,
    fetch: fetchEtcd2(env),
    etcdKeys,
    formatConfigs: $ => enhanceConfigs(toUsedFormat($)),
};
/***********************************************/
export default {
    kibanaLogName: 'ahpi',
    logLevel: env.LOG_LEVEL,
    loadConfigs: ppipe(loadConfigsEtcd2(env, etcdKeys), toUsedFormat, enhanceConfigs),
};

/***********************************************/
export default {
    createLog: createLog('ahpi', env.logLevel),
    loadConfigs: ppipe(loadConfigsEtcd2(env, etcdKeys), toUsedFormat, enhanceConfigs),
};

/***********************************************/
export const kibanaLogName = 'ahpi';
export const logLevel = env.LOG_LEVEL;

export const configsInfo = {
    fetch: fetchEtcd2,
    etcdKeys,
    etcdInfo: env.etcdInfo,
};

export formatConfigs = $ => enhanceConfigs(toUsedFormat($));
/***********************************************/
export const configsInfo = [fetchEtcd2, etcdKeys, env.etcdInfo]

// configsInfo: { fetch: fetchEtcd2(env), etcdKeys },


// export default {
//     log: { kibanaLogName: 'ahpi', logLevel: env.LOG_LEVEL },
//     etcd: { etcdKeys, env },
//     fetch: fetchEtcd2,
//     format: $ => enhanceConfigs(toUsedFormat($)),
// };
