export const

    createLogEvent = (appName, label, type) => (message, context) => ({
        ...context,
        topic: appName,
        eventType: type || context.eventType || context.tag || label,
        timestamp_insert: new Date().toISOString(),
        dockerPodHost: os.hostname(),
        level: label,
        id: context.id,
        message,
    }),

    log1 = ({ level, label, color, stream }, eventType) =>
        logLevel < level
            ? noop
            : pipe(
                createLogEvent(appName, label, eventType),
                publish(nsqWriter, color, stream),
            );

    log1 = ({ level, color, stream }, eventType) => pipe(
        guard(gt(level, levelCap)),
        pipe(
            createEvent,
            tap(toNsq),
            toLogFormat,
            tap(toConsole),
        )
    );

    log2 = ({ level, label, color, stream }, eventType) => logLevel < level ? noop :
        (message, context) => {
            const event = {
                ...context,
                topic: appName,
                eventType: eventType || context.eventType || context.tag || label,
                timestamp_insert: new Date().toISOString(),
                dockerPodHost: os.hostname(),
                level: label,
                id: context.id,
                message,
            };

            return publish(nsqWriter, color, stream, event);
        };

    log3 = ({ level, label, color, stream }, eventType) => logLevel < level ? noop :
        (message, context) =>
            publish(nsqWriter, color, stream, {
                ...context,
                topic: appName,
                eventType: eventType || context.eventType || context.tag || label,
                timestamp_insert: new Date().toISOString(),
                dockerPodHost: os.hostname(),
                level: label,
                id: context.id,
                message,
            });

    log4 = (TYPE, eventType) => logLevel < TYPE.level ? noop :
        (message, context) =>
            publish(nsqWriter, TYPE.color, TYPE.stream, {
                ...context,
                topic: appName,
                eventType: eventType || context.eventType || context.tag || TYPE.label,
                timestamp_insert: new Date().toISOString(),
                dockerPodHost: os.hostname(),
                level: TYPE.label,
                id: context.id,
                message,
            });

    log5 = ({ level, label, color, stream }, eventType) =>
        logLevel < level
        ? noop
        : (message, context) =>
            publish(nsqWriter, color, stream, {
                ...context,
                topic: appName,
                eventType: eventType || context.eventType || context.tag || label,
                timestamp_insert: new Date().toISOString(),
                dockerPodHost: os.hostname(),
                level: label,
                id: context.id,
                message,
            });
