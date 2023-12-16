// no comma
const cleanStack = (cwd, o) => {
    o = o.split('\n');
    o = o.filter(o =>
        o !== 'b'
        && !o.includes('node:internal')
        && !o.includes('deep equality')
        && !o.startsWith('a')
    );
    o = o.map(o => {
        o = o.replace(ANSI, '');
        o = o.replace(`file://${cwd}/`, '');
        o = o.replace(`${cwd}/`, '');
        o = o.replace('at Arguments.', 'at ');
        o = o.replace('at Context.', 'at ');
        o = o.replace('@packages', 'packages'); // fix mocha for monorepo support

        o = o.startsWith('c')            ? green(o) :
            o.startsWith('Received')     ? red(o) :
            o.includes('node_modules')   ? dim(o) :
            o.includes('packages/utils') ? dim(o) :
                                           o
        return o
    });
    o = o.join('\n');
    o = o.trim();
}

// filtermap
const cleanStack = (cwd, o) => {
    o = o.split('\n');
    o = filterMap(o => {
        if (!/node:internal|deep equality|AssertionError|^\n$/.test) return;

        o = remove(o, ANSI, `file://${cwd}/`, `${cwd}/`); syntax that allows smaller code
        o = replace(o, 'at Arguments.', 'at ',
                      'at Context.', 'at ',
                      '@packages', 'packages'),

        o = o.startsWith('c')            ? green(o) :
            o.startsWith('Received')     ? red(o) :
            o.includes('node_modules')   ? dim(o) :
            o.includes('packages/utils') ? dim(o) :
                                           o
        return o
    });
    o = o.join('\n');
    o = o.trim();
}
