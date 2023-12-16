const clean = cwd => _(
    split('\n'),
    filterRe(!/node:internal|deep equality|AssertionError|^\n$/),
    map(
        remove(ANSI, `file://${cwd}/`, `${cwd}/`),
        replace(['at Arguments.', 'at '], ['at Context.', 'at '], ['@packages', 'packages']),
        match([/^Expected/, green], [/^Received/, red], [/node_modules/, /packages\\/utils/, dim])
    ),
    join('\n')
    trim(),
)

const clean = cwd => _(
    split('\n'),
    filterMap(!/node:internal|deep equality|AssertionError|^\n$/.test, _(
        remove(ANSI, `file://${cwd}/`, `${cwd}/`),
        replace(['at Arguments.', 'at '], ['at Context.', 'at '], ['@packages', 'packages']),
        match([/^Expected/, green], [/^Received/, red], [/node_modules/, /packages\\/utils/, dim])
    )),
    join('\n')
    trim(),
)

const clean = cwd => _(
    split('\n'),
    filterRe`
        !node:internal
        |deep equality
        |AssertionError
        |^\n$
    `,
    map(
        remove(
            ANSI,
            `file://${cwd}/`,
            `${cwd}/`
        ),
        replace(
            'at Arguments.', 'at ',
            'at Context.', 'at ',
            '@packages', 'packages'
        ),
        match(
            /^Expected/       , green,
            /^Received/       , red,
            /node_modules/    , dim,
            /packages\\/utils/, dim,
        )
    ),
    join('\n')
    trim(),
)

const clean = cwd => _(
    split('\n'),

    filterRe`!node:internal
             |deep equality
             |AssertionError
             |^\n$`,
    map(
        remove(ANSI, `file://${cwd}/`, `${cwd}/`),

        replace('at Arguments.', 'at ',
                'at Context.', 'at ',
                '@packages', 'packages'),

        match(/^Expected/       , green,
              /^Received/       , red,
              /node_modules/    , dim,
              /packages\\/utils/, dim)
    ),
    join('\n')
    trim(),
)
TESTAR flapelo e o plugin novo
