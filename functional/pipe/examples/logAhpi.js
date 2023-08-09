const enhanceLog1 = (dispatcher, log) => ({
    ...log,
    error: pipe(log.error, toFile(dispatcher)),
})

const enhanceLog = (dispatcher, log) => ({
    ...log,
    error: pipe(log.error, toFile(dispatcher)),
})

const enhanceLog = (dispatcher, log) => set(log, 'error', pipe(log.error, toFile(dispatcher)))

log.error = (message, context = {}) => {
    const [ consoleEvent ] = log.error(message, context);
    dispatcher.logError(`ahpiError#${consoleEvent}`)
}

log.error = pipe(log.error, toFile(dispatcher))

enhance(log, 'error', toFile(dispatcher))
enhance(log, { error: toFile(dispatcher) })

enhance = (a, b, c) => ({
    ...a,
    [b]: pipe(a[b], c)
})
