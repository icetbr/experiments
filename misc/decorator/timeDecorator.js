const logTimed = fn => function timed(...args) {
    console.log(fn.name);
    const duration = process.hrtime();

    const result = fn(...args);

    console.log(green(`done ${ellapsedTime(duration)}`));
    return result;
};

const logTimedAsync = fn => async function timed(...args) {
    console.log(fn.name);
    const duration = process.hrtime();

    const result = await fn(...args);

    console.log(green(`done ${ellapsedTime(duration)}`));
    return result;
};

const logTimed = fn => function timed(...args) {
    console.log(fn.name);
    const duration = process.hrtime();

    const result = fn(...args);

    const after = (value) => {
        console.log(green(`done ${ellapsedTime(duration)}`));
        return value;
    }
    const isPromise = result && typeof result.then === 'function';
    return isPromise ? result.then(after) : after(result);
};

// const logTimed = fn => function timed(...args) {
//     console.log(fn.name);
//     const duration = process.hrtime();

//     const result = fn(...args);

//     const isPromise = result && typeof result.then === 'function';
//     return isPromise
//         ? result.then(r => {
//             console.log(green(`done ${ellapsedTime(duration)}`));
//             return r;
//         })
//         : console.log(green(`done ${ellapsedTime(duration)}`));
//     return result;
// };


const logged = fn => function logged(...args) {
    console.log(fn.name);
    const result = fn(...args);
    console.log(colors.green(`done ${module.exports.ellapsedTime(duration)}`));
    return result;
};

measureAsync: fn => async (...args) => { // TODO renomear p/ measure principal
    const time = process.hrtime();
    const result = await fn(...args);
    return { time: module.exports.ellapsedTime(time), ...result };
},

    // para debugar performance
    async measure(fn, message) {
    const duration = process.hrtime();
    log.perf(message);
    const result = await fn();
    log.perf(`${message} done ${module.exports.formattedEllapsedTime(duration)}`);
    return result;
},
// $lab:coverage:on$

// $lab:coverage:off$
// para testes
measureLocal: fn => async function time(...args) { // TODO renomear p/ measure principal
    // measureLocal: fn => async (...args) { // TODO renomear p/ measure principal
    const duration = process.hrtime();
    console.log(fn.name);
    const result = await fn(...args);
    console.log(colors.green(`done ${module.exports.ellapsedTime(duration)}`));
    return result;
},

    logTime: fn => function time(...args) {
        // measureLocal: fn => async (...args) { // TODO renomear p/ measure principal
        const duration = process.hrtime();
        console.log(fn.name);
        const result = await fn(...args);
        console.log(colors.green(`done ${module.exports.ellapsedTime(duration)}`));
        return result;
    },