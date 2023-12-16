// debuggability
// needs refactor when breaking up line!
// .filter(o => o !== '\n' && !o.includes('node:internal') && !o.includes('deep equality') && !o.startsWith('AssertionError [ERR_ASSERTION]'))
.filter(o => (
    if (o !== '\n') o = true
    else if (o.includes('node:internal')) o = false,
    o &&= !o.includes('deep equality'),
    o &&= !o.startsWith('AssertionError [ERR_ASSERTION]'),
))

.filter(o => (
    o = o !== '\n',
    o ||= !o.includes('node:internal'),
    o ||= !o.includes('deep equality'),
    o ||= !o.startsWith('AssertionError [ERR_ASSERTION]'),
))


.filter(o =>
    o !== '\n'
    && !o.includes('node:internal')
    && !o.includes('deep equality')
    && !o.startsWith('AssertionError [ERR_ASSERTION]')
)

.filter(o =>
    o !== '\n'                   &&
    !o.includes('node:internal') &&
    !o.includes('deep equality') &&
    !o.startsWith('AssertionError [ERR_ASSERTION]')
)
