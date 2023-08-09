export const createBaseServices = async (appName, env, configsInfo) => {
    const
        consoleLog = createConsoleLog(appName),
        configs    = await loadConfigs(consoleLog, env)(configsInfo),
        nsqWriter  = await createNsqWriter(consoleLog)(configs.nsq),
        log        = createLog(createNsqWriter.publish, appName);

    return { nsqWriter, log, configs };
};

export const createRequiredServices = async ({ logName, logLevel, ...configsInfo) => {
    const consoleLog    = createConsoleLog(logName, logLevel);
    const configs       = await loadConfigs(consoleLog, configsInfo);
    const nsq           = createNsq(consoleLog, configs.nsq);
    const nsqWriter     = await nsq.createWriter();
    const log           = createLog(nsqWriter.toNsq, logName, logLevel);   // XXX awaiting the need to load logLevel from etcd

    return { nsq, nsqWriter, log, configs };
};

createConsoleLog

export const createRequiredServices = pipeAsync(
    createConsoleLog,
    loadConfigs,
    createNsq,
    createNsqWriter,
    // createSendToNsq,
    // createToNsq,
    createLog,
};

createConsoleLog = ({ logName, logLevel })
loadConfigs      = ({ log:consoleLog, format, ... })
createNsq        = ({ log:consoleLog, configs: { baseConfig:nsq } })
createNsqWriter  = ({ nsq })
createLog        = ({ toNsq, appName, logLevel })

3) not agood idea to pipe things you need selective data

logCreator = createLog(logName, logLevel)
logCreator(toNsq)
logCreator(noop)

