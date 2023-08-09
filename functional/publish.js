// INDEPENDENT FUNCTIONS
toNsq = nsqWriter => pipe(stringify, tap(nsqWriter.publish('log-json'))),

toConsole = (color, stream) => pipe(colors[color], tap(stream.writeLn)),

log = ({ level, color, stream }, eventType) => guard(
    gt(level, levelCap)),
    pipe(
        createEvent         (appName, level, eventType)
        toNsq               (nsqWriter)
        toLogFormat
        toConsole           (color, stream)
    )
);

// PIPE ALIAS
const toNsq = toConsole = pipe;

log = ({ level, color, stream }, eventType) => guard(
    gt(level, levelCap),
    pipe(
        createEvent         (appName, level, eventType)
        toNsq               (stringify, nsqWriter.publish('log-json'))
        toLogFormat
        toConsole           (colors[color], stream.writeLn)
    )
);


// NO PIPE
const log = ({ level, color, stream }, eventType) => guard(
    gt(level, levelCap),

    (message, context) => {
        const event = {
            ...context,
            topic: appName,
            eventType: eventType || context.eventType || context.tag || level,
            timestamp_insert: new Date().toISOString(),
            dockerPodHost: os.hostname(),
            level,
            id: context.id,
            message,
        };

        // toNsq('log-json', stringify(event));
        // return toConsole(toLogFormat(event));
        // return tap(toConsole, toLogFormat(event));

        const formattedEvent = toLogFormat(event);
        process[stream].write(`${colors[color](formattedEvent)}\n`);
        nsqWriter.publish('log-json', stringify(event));
        return { event, formattedEvent };
    }
);

// IMPERATIVE
const log = ({ level, color, stream }, eventType) => {
    if (level < levelCap) return noop;

    return (message, context) => {
        const event = {
            ...context,
            topic: appName,
            eventType: eventType || context.eventType || context.tag || level,
            timestamp_insert: new Date().toISOString(),
            dockerPodHost: os.hostname(),
            level,
            id: context.id,
            message,
        };

        // toNsq('log-json', stringify(event));
        // return toConsole(toLogFormat(event));
        // return tap(toConsole, toLogFormat(event));

        const formattedEvent = toLogFormat(event);
        process[stream].write(`${colors[color](formattedEvent)}\n`);
        nsqWriter.publish('log-json', stringify(event));
        return { event, formattedEvent };
    }
);

// DELETE THIS

// const toConsole1 = event => {
//     const now = event.timestamp_insert.substring(0, 19).replace('T', ' ');
//     const hostname = event.dockerPodHost.padEnd(26, ' ');
//     const tag = event.tag ? !`${event.tag.toUpperCase()} ` : '';

//     // 2022-11-08 15:28:49 | INFO | ip-10-0-2-94.ec2.internal | PERF An example log
//     const message = `${now} | ${event.level} | ${hostname} | ${tag}event.message`;

//     process[stream].write(`${colors[color](message)}\n`);
// }

// // const toNsq = nsqWriter => event => nsqWriter.publish('log-json', stringify(event));
// // const toConsole = (color, stream) => event => process[stream].write(format(color, event));
// const toNsq     = (nsqWriter, event)              => nsqWriter.publish('log-json', stringify(event));
// const toConsole = (stream, color, formattedEvent) => process[stream].write(`${colors[color](formattedEvent)}\n`);

// const publish1 = (toNsq, toConsole, event) => {
//     toConsole(event);
//     toNsq('log-json', stringify(event));
// };

// const publish2 = (toNsq, toConsole, event) => {
//     const formattedEvent = toLogFormat(event);
//     toConsole(formattedEvent);
//     toNsq(event);
//     return formattedEvent;
// };

// // const publish3 = pipe(
// //     toConsole(event);
// //     const formattedEvent = toLogFormat(event);
// //     toNsq(event);
// //     return formattedEvent;
// // };

// const publish = (nsqWriter, color, stream, event) => {
//     const formattedEvent = toLogFormat(event);

//     process[stream].write(`${colors[color](formattedEvent)}\n`);
//     nsqWriter.publish('log-json', stringify(event));

//     return { formattedEvent };
// };

// const publish3 = pipe(
//     toLogFormat,
//     toConsole,
//     toNsq,
// );
// const publish4 = pipe(
//     toLogFormat,
//     [toConsole, toNsq].map(send)
// );

// const publish5 =
//     [toNsq, toConsole].forEach(pipe(createEvent, addLogFormat))

// const publish5a = pipe(
//     pipa(createEvent, toLogFormat)
//     toNsq
// )
//     [toNsq, toConsole].forEach()
// // => [ event, formattedEvent ]
// const publish6 = pipe(
//     createEvent,
//     tap(toNsq),
//     toLogFormat,
//     tap(toConsole),
// );

// const publish7 = pipe(
//     tap(toNsq),
//     toLogFormat,
//     tap(toConsole),
// );




// const toNsq = (nsqWriter, event) => {
//     nsqWriter.publish('log-json', stringify(event));
//     return event;
// }

// const toLogFormat = event => {
//     const formattedEvent = format(event);
//     return { event, formattedEvent };
// }

// const toConsole = ({ event, formattedEvent }) => {
//     const formattedEvent = format(event);
//     return { event, formattedEvent };
// }


// const log = ({ level, color, stream }, eventType) => gt(level, levelCap) ? noop :
// (message, context = {}, now = new Date()) =>
//     publish(nsqWriter, color, stream, {
//         ...context,
//         topic: appName,
//         eventType: eventType || context.eventType || context.tag || level,
//         timestamp_insert: now.toISOString(),
//         dockerPodHost: hostname,
//         level,
//         id: context.id,
//         message,
//     });
