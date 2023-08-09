/** @param type mongoConfig */
const mapMongoDb = ({ servers, dbName, ...rest }) => {
    const uris = mongodbConfig.servers.map(server =>
        `${server.host.replace('$SHARED_LOGIN', SHARED_LOGIN).replace('$SHARED_PASSWORD', SHARED_PASSWORD)}:${server.port}`);

    return { uri: `mongodb://${uris.join()}/${mongodbConfig.dbName}` };
};
