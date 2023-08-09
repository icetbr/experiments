const { createLogger, format, transports } = require('winston')
const pino = require('pino')()

const config = {
    servers: [
        {
            host: 'sigma:somePassword@10.32.1.2',
            port: '27017'
        },
        {
            host: '10.32.1.3',
            port: '27017',
        }
    ],
};

const yamlFile = 'config/default.yaml';

const winston = createLogger({
    format: format.combine(
        format.splat(),
        format.simple()
      ),

    transports: [ new transports.Console() ]
});

const log = console;

//1) works like console.log
log.info('Shutting down server')
log.info('Connecting with mongodb %j', config);
log.info('Using config from:', yamlFile)
log.info({ a: 1, b: 2 }, 'just an object')

//2) allows context
log.info('Updating user 257', { tag: 'updateUser', register: '257'})

log.info({ message: 'Updating user 257', tag: 'updateUser', register: '257' })

// The Infra squad made all these properties mandatory:
const logEvent = {
    topic: appName,                                 // example: 'ahpi', 'ah-reports'
    eventType: eventType || args.tag || label,      // see below
    timestamp_insert: new Date().toISOString(),
    dockerPodHost: os.hostname()
};

// There are some properties I find situational, and should not be required, only suggested:
const situationalProps = {
    operation: 'update',
    eventType: 'updateEvent',
    module: 'user',
    tag: 'crud',
};

/*
  It is not clear these are all distinct and/or required. I could have a `{ tag: 'crud:updateUser' }` for instance. But since `eventType` is required, I'm using `tag` and `label` (ERROR, INFO, etc) as alternatives.

  I added `level` as required, since it's classic in all log systems. I also added `id` as "desired", as it takes come effort to include it in all log messages.
*/
const otherProps = {
    level: label,
    id: args.reqId,         // this will help to connect other log messages, get from request or generate using `nanoid(10)`
}

// Logging works different from console.log. This will not work
log.info('Hello', 'World')

// instead use
log.info('Hello')
log.info('Hello', { extra: 'world' })
log.info('Hello', { tag: 'perf' })

// alt
log.info('eventType', 'message', { extra: 'world' })

- log(string) => { message: string }
- log({ message: string })
- log(string) => { message: string }


log.info({ message: 'Updating user 257', id: reqId })
log.info('Updating user 257', { id: reqId })
log.info({ message: 'Updating user 257', ...ctx })
log.info('Updating user 257', ctx)
log(ctx).info('Updating user 257')

// 3) raw method? Allow create custom levels? convenience methods on the logger returned.?
// log.log({
//     level: 'info',
//     message: 'Hello distributed log files!'
//   });



// logger.log('info', 'test message %s', 'my string');

// logger.log({
//     level: 'info',
//     message: 'Hello distributed log files!'
//   });

// // logger.info('Hello again distributed logs', 'my string', { message: 'ddv'});
// logger.info('Hello again distributed logs %s %s', 'my string', 'ddv', { tag: 'critical'});



// [2022-06-16T14:33:39.526Z] INFO (373617 on fedora): user profile updated
//     user_id: "283487"

// logger.info('Starting all recurring tasks', {
//   tag: 'starting_recurring_tasks',
//   id: 'TaskManager-1234729',
//   module: 'RecurringTaskManager',
// });
