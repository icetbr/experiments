const toY = s => Function('a', s);

function makeFunction(text) {
    // return eval("function x () { " + text + "}");
    return eval(`() => ${text}`);
}

const x = (a) => {
    // const y = `return a`;
    const y = `return a`;
    // console.log(eval(y))
    // console.log(toY(y)(a))
    // console.log(Function(y)())
    console.log(makeFunction(y)())
}

x(1)
