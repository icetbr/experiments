// ORIGINAL
export const toUsedFormat = ({ host, port, ...rest }) => {

    const toMongoDb = ({ servers, dbName, ...restMongoDb }) => {
        const uris = servers.map(server =>
            `${server.host.replace('$SHARED_LOGIN', SHARED_LOGIN).replace('$SHARED_PASSWORD', SHARED_PASSWORD)}:${server.port}`);

        return { uri: `mongodb://${uris.join()}/${dbName}`, ...restMongoDb };
    };

    return {
        ...rest,
        mongodb: toMongoDb(configs.mongodb),
        http: { address: host, port },
    };
};


const toMongoDb = ({ servers, dbName, ...restMongoDb }) => {
    const uris = servers.map(server => `${server.host}:${server.port}`);
    return { uri: `mongodb://${uris.join()}/${dbName}`, ...restMongoDb };
};

export const toUsedFormat = ({ host, port, mongodb, ...rest }) => ({
    ...rest,
    mongodb: toMongoDb(mongodb),
    http: { address: host, port },
});

/********************************************************************/
// ja tenhgo solução aqui, ver meu branch crud
export const toUsedFormat = configs => ({
    privateKey       : configs.privateKey,
    publicKey        : configs.publicKey,
    nsq              : configs.nsq,
    mongodb          : toMongoDb(configs.mongodb),
    http             : { address: configs.host, configs.port },
    accountServiceUrl: configs.accountServiceUrl,
});

// $ = ({ host, port, ...rest }) => ( { http: { address: host, port }, ...rest })($),
export const toUsedFormat = (configs, $ = configs) => (
    $ = transform({ host, port }) => ({ http: { address: host, port } })($),
    $ = transform({ mongodb }) => ({ mongodb: toMongoDb(mongodb) })($),
);

const toUri = servers => servers.map(server => `${server.host}:${server.port}`).join();
const toMongoDb = ({ servers, dbName, ...restMongoDb }) => ({ uri: `mongodb://${toUri(servers)}/${dbName}`, ...restMongoDb })

export const toUsedFormat = ({ host, port, mongodb: { servers, dbName, ...restMongoDb }, ...rest }) => ({
    ...rest,
    mongodb: { uri: `mongodb://${toUri(servers)}/${dbName}`, ...restMongoDb },
    http: { address: host, port },
});

export const toUsedFormat = ({ host, port, mongodb: { servers, dbName, ...restMongoDb }, ...rest }, $ = null) => (
    $ = { uri: servers.map(server => `${server.host}:${server.port}`).join() },
    $ = {
        ...rest,
        mongodb: { uri: `mongodb://${$.uri}/${dbName}`, ...restMongoDb },
        http: { address: host, port },
    }
);
