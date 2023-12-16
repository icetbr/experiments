o = o.replace(ANSI, '')
     .replace(`file://${cwd}/`, '')
     .replace(`${cwd}/`, '')
     .replace('at Arguments.', 'at ')
     .replace('at Context.', 'at ')
     .replace('@packages', 'packages') // fix mocha for monorepo support

     if (o.startsWith('Expected'))         o = green(o);    // requires unusual formating
else if (o.startsWith('Received'))         o = red(o);
else if (o.includes('node_modules'))       o = dim(o);
else if (o.includes('packages/utils'))     o = dim(o);
else if (o.includes('packages/testUtils')) o = dim(o);

o = o.startsWith('c')            ? green(o) :
    o.startsWith('Received')     ? red(o) :
    o.includes('node_modules')   ? dim(o) :
    o.includes('packages/utils') ? dim(o) :
                                    o



// less unusual ternary construct
// care: daisy chain makes it harder to debug
.map(o => {
    o = o.replace(ANSI, '')
         .replace(`file://${cwd}/`, '')
         .replace(`${cwd}/`, '')
         .replace('at Arguments.', 'at ')
         .replace('at Context.', 'at ')
         .replace('@packages', 'packages') // fix mocha for monorepo support

    if (o.startsWith('Expected'))     o = green(o);
    if (o.startsWith('Received'))     o = red(o);
    if (o.includes('node_modules'))   o = dim(o);
    if (o.includes('packages/utils')) o = dim(o);

    return o;
})

match(
    when(startsWith('Expected'), green),
    when(startsWith('Received'), red),
    when(includes('node_modules'), dim),
    when(includes('packages/utils'), dim),
)

new RegExp(`!node:internal
            |deep equality
            |AssertionError [ERR_ASSERTION]
            |^\n$`
).test,

replace('at Arguments.', 'at '     )
       ('at Context.'  , 'at '     )
       ('@packages'    , 'packages')

replace('at Arguments.', 'at ',
        'at Context.', 'at ',
        '@packages', 'packages'),

['at Arguments.', 'at ',
 'at Context.', 'at ',
 '@packages', 'packages'].map(replace),

greenOrRed(/^Expected/, /^Received/),

filter(o => !match(o,
    'node:internal',
    'deep equality',
    'AssertionError [ERR_ASSERTION]',
    '^\n$'
),

// event shorter; I don't like match being the first word, makes intent less clear
const clean = cwd => _(
    split('\n'),
    filterRe(!/node:internal|deep equality|AssertionError|^\n$/),
    map(
        strip(ANSI, `file://${cwd}/`, `${cwd}/`),
        replace(['at Arguments.', 'at '], ['at Context.', 'at '], ['@packages', 'packages']),
        match([/^Expected/, green], [/^Received/, red]),
        dim(/node_modules/, /packages\\/utils/),
    ),
    join('\n'),
    trim(),
)

// reducing code; relying on regexp helps but it should be avoided
const clean = cwd => _(
    split('\n'),
    filter(!/node:internal|deep equality|AssertionError [ERR_ASSERTION]|^\n$/.test),
    map(
        strip(ANSI, `file://${cwd}/`, `${cwd}/`)
        replace('at Arguments.', 'at '),
        replace('at Context.', 'at '),
        replace('@packages', 'packages'),
        green(/^Expected/),
        red(/^Received/),
        dim('node_modules', 'packages/utils'),
    ),
    join('\n'),
    trim(),
)

// real pipe: ideal
const clean = cwd => _(
    split('\n'),
    filter(
        not(includes('node:internal')),
        not(includes('deep equality')),
        not(eq('\n')),
        not(startsWith('AssertionError [ERR_ASSERTION]')),
    ),
    map(
        stripAnsi,
        when(startsWith('Expected'), green),
        when(startsWith('Received'), red),
        when(includes('node_modules'), dim),
        when(includes('packages/utils'), dim),
        replace(`file://${cwd}/`, ''),
        replace(`${cwd}/`, ''),
        replace('at Arguments.', 'at '),
        replace('at Context.', 'at '),
        replace('@packages', 'packages'),
    ),
    join('\n'),
    trim(),
)

// pipe o: better
const clean = (cwd, o) => (
    o = o.split('\n'),
    o = o.filter(o =>
        !o.includes('node:internal')
        && !o.includes('deep equality')
        && o !== '\n'
        && !o.startsWith('AssertionError [ERRoASSERTION]')
    ),
    o = o.map(o, o => (
        o = stripAnsi(o),
        o = o.startsWith('Expected') ? green(o) : o.startsWith('Received') ? red(o) : o,
        o = o.includes('nodeomodules') ? dim(o) : o,
        o = o.includes('packages/utils') ? dim(o) : o,
        o = o.replace(`file://${cwd}/`, ''),
        o = o.replace(`${cwd}/`, ''),
        o = o.replace('at Arguments.', 'at '),
        o = o.replace('at Context.', 'at '),
        o = o.replace('@packages', 'packages'), // fix mocha for monorepo support
    ),
    o = o.join('\n'),
    o = o.trim(),
))

// pipe _: too disruptive
const clean = (cwd, _) => (
    _ = _.split('\n'),
    _ = _.filter(_ => !_.includes('node:internal')
                 && !_.includes('deep equality')
                 && _ !== '\n'
                 && !_.startsWith('AssertionError [ERR_ASSERTION]')
    ),
    _ = _.map(_, _ =>
        _ = stripAnsi(_),
        _ = _.startsWith('Expected') ? green(_) : _.startsWith('Received') ? red(_) : _,
        _ = _.includes('node_modules') ? dim(_) : _,
        _ = _.includes('packages/utils') ? dim(_) : _,
        _ = _.replace(`file://${cwd}/`, ''),
        _ = _.replace(`${cwd}/`, ''),
        _ = _.replace('at Arguments.', 'at '),
        _ = _.replace('at Context.', 'at '),
        _ = _.replace('@packages', 'packages'), // fix mocha for monorepo support
    ),
    _ = _.join('\n'),
    _ = _.trim(),
)




