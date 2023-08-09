## 1 step: maps a schemaInfo to an example
```js
export class SchemaInfo { example: () => map(this, o => o.example) }; // OO
export const example = schemaInfo => map(schemaInfo, o => o.example); // FP
export const example = map(o => o.example);                           // FP point free
```

### Point free
A choice between explicit vs convention, `map` with 1 parameter returns a function, with 2 it returns a value. You either like this or not.
```js
values.map(o => o.example)  // traditional
map(o => o.example)(values) // pipeable
map(values, o => o.example) // lib: data first
map(o => o.example, values) // lib: data last
map(^, o => example)        // new pipeline operator
```

### Missing parameter from signature
The OO example also doesn't have a parameter, because it is inside the `class`. In the FP point free example it is "inside" the module, but its not visible, it is implied. A module is just a file with functions that act on the same type of data. The following is equivalent.

```js
export class SchemaInfo {
    constructor(schemaInfo) {
        this.schemaInfo = schemaInfo;
    },

    example() {
        return map(this.schemaInfo, o => o.example);
    },

    requiredExample() {
        return map(this.schemaInfo, buildRequiredExample);
    },

    schema: () {
        return map(this.schemaInfo, buildSchema);
    },
}

// MODULE schemaInfo.js
export const example = map(o => o.example);
export const requiredExample = map(buildRequiredExample);
export const schema = map(buildSchema);
```

### Descriptive vs imperative
A choice between show vs tell. The more nuts and bolts you see, the more imperative your code. Whenever you name something, you're describing it. You also create an abstraction, an indirection layer. Picking the wrong abstraction can make your code worse.

<!-- A descriptive code follows the "keep code at the same level of abstraction" rule. -->

```js
map(o => o.example);  // 1
map(prop('example')); // 2
map(getExample);      // 3
```
1 is more imperative. It shows that you're getting the property example. 3 tells you it will get the example. 2 is a tough sell unless already using only worth it in havilly FP code bases. Every new function you add your cognitive load increases.


## 2 steps: replaces [x] with the given value

```js
const replaceX = (example, x) => example.replace?.('[x]', x) || example;
const replaceX = x => row => ({ ...row, example: row.example.replace?.('[x]', x) || row.example }); // used in a pipe

export const fullExample = x => map(a => a[example].replace?.('[x]', x) || a[example]); // shows you HOW
export const fullExample = x => map(a => replaceX(a[example], x));                      // just the WHAT
export const fullExample = x => map(_(replaceX(x), getExample));                        // with pipe function
export const fullExample = x => map(replaceX(x) |> getExample);                         // with F# pipe operator

export const fullExample = x => map(_(                                                  // multi line
    replaceX(x),
    getExample,
));
```

At 2 steps you could go either way, even leaving all in a single line. Having an extra function is a little clearer, as it is the pipe version. The pipe version of replaceX needs to clone the object to keep immutability, which ammounts to extra code. The extra caracteres are not the problem, the mental overload is.


## 3 steps: maps a schemaInfo to an joi schema
Many options here, I'll showcase a few styles. Copy/paste and placethem together in your IDE to compare for yourself, make some modifications and see what style you prefer and why.

### Compact
```js
export const toJoiSchema = _ => Joi.object(
    map(_, a =>
        a[validation].example(a[example].replace?.('[x]', 5) || a[example])
        .description(a[description])
        .note(a[devNotes])
    )
);
```
### Clearly defined steps
Note how the one line version is easy to read as well. With 3+ steps the declarative becomes more attractive. You right a "receipe", a workflow, just naming the steps.
```js
export const toJoiSchema = _(
    map(_(
        replaceX(5),
        buildSchema
    )),
    Joi.object
);

export const toJoiSchema = _(map(_(replaceX(5), buildSchema)), Joi.object); // one line
```

### Tradicional'ish
```js
export const toJoiSchema = schemaInfo => {
    const schemas = schemaInfo.map(a => {
        const example = a[example].replace?.('[x]', 5) || a[example];

        return a[validation].example(example)
            .description(a[description])
            .note(a[devNotes])
    );
    return Joi.object(schemas);
);
```

### Imperative pipe
This is the closest you can get to a pipe style, while keeping performance, stack trace and debuggability intact.

```js
export const toJoiSchema2 = _ => (
    _ = map(_, _ =>
        _ = replaceX(_, 5),
        _ = buildSchema(_)
    ),
    _ = Joi.object(_)
);
```

## Required example: only the required fields

```js
export const example = x => map(a => a[example].replace?.('[x]', x) || a[example]);

export const requiredExample = x => _(filter(a => a[validation].includes('required')), fullExample(x));
export const requiredExample = x => _(filter(isRequired), fullExample(x));
```
## Pipe debug
I don't like the standard stack trace of pipe funcions, so I use this // todo add try catch version, show a stack trace

```js

_.print(step1, step2) // print the result of each step
_.debug(step1, step2) // adds a breakpoint after each step

export const fn = _(
    step1,
    step2,
    x => (console.log(x), x), // bind a shortcut, like CTRL + 1 toggles this line, CTRL + 2 clears all debug lines...
    step3,
    x => (debugger, x),
    step4,
);
```

## Style guide
- keep rules regarding the amoount of nested pipes and one line functions a pipe can have

## Type inference (TODO)
- data first is best
- there is a special pipe lib

## Conclusions
- its very similar
- points are just boiler plate
- BUT it makes code more standard
- encourages you to treat every behavuiour as a separate step

## Performance (TODO)

TODO: CODEMOD to switch between styles
