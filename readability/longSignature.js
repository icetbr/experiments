
const logX = config => TYPE => eventType => (message, context) => {}

// const log2 = (config = baseConfig) => (TYPE, eventType) => (message, context) => {}
// const log2 =
//     ( appName, level = 'INFO', publish = publish) =>
//     (TYPE, eventType) =>
//     (message, context) => {}

const log1 = (appName, level = 'INFO', publish = publish) => (TYPE, eventType) => (message, context) =>                                                         { appName, level, publish, TYPE< level1, label, color, stream, eventType, message, context }

const log2 = (appName, level = 'INFO', publish = publish) => ({ level1, label, color, stream }, eventType) => (message, context) =>                             { appName, level, publish, level1, label, color, stream, eventType, message, context }

const log3 = (appName, level = 'INFO', publish = publish) =>
    ({ level1, label, color, stream }, eventType) => (message, context) =>                                                                                      { appName, level, publish, level1, label, color, stream, eventType, message, context }

const log3a = (appName, level = 'INFO', publish = publish) =>

    ({ level1, label, color, stream }, eventType) => (message, context) =>                                                                                      { appName, level, publish, level1, label, color, stream, eventType, message, context }

const log4 = (appName, level = 'INFO', publish = publish) =>
    ({ level1, label, color, stream }, eventType) =>
        (message, context) =>                                                                                                                                    { appName, level, publish, level1, label, color, stream, eventType, message, context }

const log5 = (appName, level = 'INFO', publish = publish) =>

    ({ level1, label, color, stream }, eventType) =>

        (message, context) =>                                                                                                                                    { appName, level, publish, level1, label, color, stream, eventType, message, context }

const log6 = (appName, level = 'INFO', publish = publish) => {
    return ({ level1, label, color, stream }, eventType) => (message, context) =>                                                                               { appName, level, publish, level1, label, color, stream, eventType, message, context }
}

const log7 = (
    appName,
    level = 'INFO',
    publish = publish) =>
        ({ level1, label, color, stream }, eventType) => (message, context) =>                                                                                  { appName, level, publish, level1, label, color, stream, eventType, message, context }


const log8 = (
    appName,
    level = 'INFO',
    publish = publish,
    TYPE,
    eventType,
    message,
    context
) => {
}

const log9 = (
    appName,
    level = 'INFO',
    publish = publish
) => (
    TYPE,
    eventType
) => (
    message,
    context
) => {}

// no defaults!
{
    const loga = (appName, level, publish)
    // const baseLog = appName => log(appName, 'INFO', publish.toConsoleAndNsq)
    const baseLog = appName => log(appName, 'INFO', pipe(toConsole, toNsq))
    const logAhpi = baseLog('ahpi');
    // const logAhpi = baseLog('ahpi', 'ERROR', toNsq);
    const log = {
        error: baseLog(TYPE.ERROR),
    }
}
{
    const toNsq = nsqWriter => event => nsqWriter.publish('log-json', stringify(event));
    const toConsole = process => stream => event => process[stream].write(format(event));


    appName,
    level = 'INFO',
    publish = publish,
    TYPE,
    eventType,
    message,
    context
) => {
}

}
//
const logAhpi = log2('ahpi', config.LOG_LEVEL)
const logInfo = logAhpi(TYPE.INFO)
logInfo(msg);

// default log: kibana, console
// optional: kibana only
// also to file
