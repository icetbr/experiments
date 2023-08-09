// IDEAL
// - left most contains the most important information
log = ({ level, color, stream }, eventType) => guard(
    gt(level, levelCap)),

    |> createEvent(appName, level, eventType)
    |> toNsq('log-json') <| stringify
    |> toLogFormat
    |> toConsole <| colors[color]
);

// CLOSEST
log = ({ level, color, stream }, eventType) => guard(
    gt(level, levelCap)),

    pipe(
        createEvent(appName, level, eventType)
        c(toNsq('log-json'), stringify)
        toLogFormat
        c(toConsole, colors[color])
    )
);

// WITH SIGNATURE 1
log = ({ level, color, stream }, eventType) => guard(
    gt(level, levelCap)),

    (message, context) => pipe(
        { message, context },
        createEvent(appName, level, eventType)
        c(toNsq('log-json'), stringify)
        toLogFormat
        c(toConsole, colors[color])
    )
);

// WITH SIGNATURE 2
log = ({ level, color, stream }, eventType) => guard(
    gt(level, levelCap)),

    (message, context) => pipe(
        createEvent(appName, level, eventType)
        c(toNsq('log-json'), stringify)
        toLogFormat
        c(toConsole, colors[color])
    )({ message, context })
);

// JUST COMMENTS
log = ({ level, color, stream }, eventType) => guard(
    gt(level, levelCap)),

    // (message, context) => [ nsqEvent, consoleEvent ]
    pipe(
        createEvent(appName, level, eventType)
        c(toNsq('log-json'), stringify)
        toLogFormat
        c(toConsole, colors[color])
    )
);

// IMPERATIVE
// - easy to return 2 steps
log = ({ level, color, stream }, eventType) => {
    if (level < levelCap) return noop;

    return (message, context) => {
        const event = createEvent(appName, level, eventType, message, context);
        toNsq('log-json', stringify(event))
        const formattedEvent = toLogFormat(event);
        toConsole(formattedEvent)
        return { event, formattedEvent };
    }

    return (message, context) => {
        const $ = createEvent(appName, level, eventType, message, context);
        toNsq('log-json', stringify($))
        $ = toLogFormat(event);
        toConsole($)
        return $;
    }

    return (message, context) => {
        const $ = createEvent(appName, level, eventType, message, context);
        return [
            tap(toNsq('log-json'), stringify($))
            tap(toConsole, toLogFormat($))
        ]
    }

    return (message, context) => {
        const $ = createEvent(appName, level, eventType, message, context);
        return [
            toNsq('log-json', stringify($))
            toConsole(toLogFormat($))
        ]
    }
);

// SHOWDOWN; best approaches

// (message, context) => [ event, nsqEvent, consoleEvent ]
|> createEvent(appName, level, eventType)
|> toNsq('log-json') <| stringify
|> toConsole <| toLogFormat(color)

// (message, context) => [ event, nsqEvent, consoleEvent ]
pipe(
    createEvent(appName, level, eventType)
    c(toNsq('log-json'), stringify)
    c(toConsole, toLogFormat(color))
)

(message, context) => pipe(
    { message, context },
    createEvent(appName, level, eventType)
    c(toNsq('log-json'), stringify)
    c(toConsole, toLogFormat(color))
)

return (message, context) => {
    const $ = createEvent(appName, level, eventType, message, context);
    return [
        toNsq('log-json', stringify($))
        toConsole(toLogFormat($))
    ]
}

(message, context) => pipe(
    {
        ...context,
        topic: appName,
        eventType: eventType || context.eventType || context.tag || level,
        timestamp_insert: new Date().toISOString(),
        dockerPodHost: os.hostname(),
        level,
        id: context.id,
        message,
    },
    c(toNsq('log-json'), stringify)
    c(toConsole, toLogFormat(color))
)
