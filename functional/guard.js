// IMPERATIVE
const log = ({ level, color, stream }, eventType) => (message, context) => {
    if (gt(level, levelCap)) return;

    // code
}

// PREFERED
const log = ({ level, color, stream }, eventType) => gt(level, levelCap) ? noop :
    (message, context) =>
        // code


// OTHERS

const log = ({ level, color, stream }, eventType) => guard(gt(level, levelCap),
    (message, context) =>
        // code


const log = ({ level, color, stream }, eventType) =>
    gt(level, levelCap) ? noop

    : (message, context) => {
        // code
    }


const log = ({ level, color, stream }, eventType) =>
    gt(level, levelCap)
    ? noop
    : (message, context) => {
        // code
    }


const log = ({ level, color, stream }, eventType) =>
    gt(level, levelCap) ? noop :

    (message, context) => {
        // code
    }


const log = ({ level, color, stream }, eventType) =>
    gt(level, levelCap) : noop;
    otherwise: (message, context) => {
        // code
    }




