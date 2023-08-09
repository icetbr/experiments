const log = (message, context, { level, color, stream }, eventType) => gt(level, levelCap) ? noop :
    publish(nsqWriter, color, stream, {
        ...context,
        topic: appName,
        eventType: eventType || context.eventType || context.tag || level,
        timestamp_insert: new Date().toISOString(),
        dockerPodHost: os.hostname(),
        level,
        id: context.id,
        message,
    });

return {
    log,
    error : (message, context) => log(LEVEL.ERROR, message, context),
    error : log.bind(null, LEVEL.ERROR),
    error : (...args) => log(LEVEL.ERROR, ...args),
};


// "class" approach
const nsq = log => ({
    createReader: () => { log('a') },
    createWriter: () => { log('b') },
})
