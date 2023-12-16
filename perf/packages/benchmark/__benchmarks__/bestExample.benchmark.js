const params = [...Array(100).keys()];

const imperative = input => {
    let total = 0;
    for (let i = 0; i < input.length; i++) {
        let x = input[i];
        if (isOdd(x)) total = sum(total, triple(x));
    }
    return total;
}

describe('js-execution', () => {
    benchmark('fibonacci 15', () => {
        run(() => {
            return imperative(params);
        });
    });
});
