// minimal possible: pipe, one line
const ensureHasDecimal = match(charAt(-2), ',' => replace(',', '.'), _ => insert(-2, '.'));
const stringToMoney = { fromDb: _(ensureHasDecimal, parseFloat), toDb: _(toFixed(2), toString, replace('.', ',')) };

// minimal multi line
const ensureHasDecimal = match(
    charAt(-2), ',' => replace(',', '.'),
                 _  => insert(-2, '.')
)

const stringToMoney = {
    fromDb: _(ensureHasDecimal, parseFloat),
    toDb: _(toFixed(2), toString, replace('.', ',')),
};

// abreviated
const ensureHasDecimal = s => charAt(s, -2) === ',' ? replace(s, ',', '.') : insert(s, -2, '.');
const stringToMoney = { fromDb: s => parseFloat(ensureHasDecimal(s)) || 0, toDb: n => toString(n.toFixed(2)).replace('.', ',') };

// abreviated multi line
const ensureHasDecimal = s =>
    charAt(s, -2) === ',' ? replace(s, ',', '.') :
                            insert(s, -2, '.')

const stringToMoney = {
    fromDb: s => parseFloat(ensureHasDecimal(s)) || 0,
    toDb: n => toString(n.toFixed(2)).replace('.', ',')
};

// NOTE: keep helpers just above the exported fn
pensando: doc e teste



// a => b
// c => d
const stringToMoney = {
    fromDb: string => parseFloat(ensureHasDecimal(string)) || 0,
    toDb: number => String(number.toFixed(2)).replace('.', ',')
};

export const ensureHasDecimal = s => charAt(s, -2) === ',' ? replace(s, ',', '.') : insert(s, -2, '.')
const stringToMoney = { fromDb: string => parseFloat(ensureHasDecimal(string)) || 0, toDb: number => String(number.toFixed(2)).replace('.', ',') };
