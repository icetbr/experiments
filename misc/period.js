const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

const nextMonth = ({ year, month }) => ({ year, month: month + 1 });

const Period = {

    nextPeriod({ year, month }) {
        const nextMonth = month + 1;

        return {
            year: nextMonth > 11 ? year + 1 : year,
            month: nextMonth > 11 ? 0 : nextMonth,
        };
    },

    nextPeriod({ year, month }) {
        const nextMonth = month + 1;
        const yearTurned = nextMonth > 11;

        return {
            year: yearTurned ? year + 1 : year,
            month: yearTurned ? 0 : nextMonth,
        };
    },

    nextPeriod({ year, month }) {
        const yearTurned = month + 1 > 11;

        return {
            year: yearTurned ? year + 1 : year,
            month: yearTurned ? 0 : month + 1,
        };
    },

    nextPeriod({ year, month }) {
        const yearTurned = month + 1 > 11;

        return yearTurned
            ? { year: year + 1, month: 0 }
            : { year: year, month: month + 1 }
    },

    nextPeriod({ year, month }) {
        const nextPeriod = { year, month: month + 1 };
        const yearTurned = nextPeriod.month > 11;

        return yearTurned
            ? { year: year + 1, month: 0 }
            : nextPeriod
    },

    nextPeriod: ({ year, month }) =>
        month + 1 > 11
            ? { year: year + 1, month: 0 }
            : { year: year, month: month + 1 },

    nextPeriod: ({ year, month }) => ({
        year: month + 1 > 11 ? year + 1 : year,
        month: month + 1 > 11 ? 0 : month + 1,
    }),

    nextPeriod: ({ year, month }) => ({
        year: next(month) > 11 ? year + 1 : year,
        month: next(month) > 11 ? 0 : next(month),
    }),

    nextPeriod: pipe(
        ({ year, month }) => ({ year, month: month + 1 }),
        ({ year, month }) => ({
            year: month > 11 ? year + 1 : year,
            month: month > 11 ? 0 : month,
        }),
    )
};

const Period = {
    next: ({ year, month }) =>
        month + 1 > 11
            ? { year: year + 1, month: 0 }
            : { year: year, month: month + 1 },
}

class Period {
    next() {
        return this.month + 1 > 11
            ? { year: this.year + 1, month: 0 }
            : { year: this.year, month: this.month + 1 }
    }
}

const Period = {
    next: ({ year, month, ...o }) => assign({}, o,
        month + 1 > 11
            ? { year: year + 1, month: 0 }
            : { year: year, month: month + 1 }
    ),
}

const Period = {
    next: ({ year, month, ...o }) =>
        month + 1 > 11
            ? { ...o, year: year + 1, month: 0 }
            : { ...o, year: year, month: month + 1 },
}

class Period {
    next() {
        return this.month + 1 > 11
            ? { ...this, year: this.year + 1, month: 0 }
            : { ...this, year: this.year, month: this.month + 1 }
    }
}

const x = {
    eat(amount) {
        this.energy += amount;
    },

    eat: amount => energy += amount,

    eat: amount => o.energy += amount,

    eat: o => amount => o.energy += amount,

    eat: c(o => amount => o.energy += amount),

    eat: o => amount => ({...o, energy: o.energy + amount}),

    eat: o => amount => add(o, 'energy', amount),

    eat: o => amount => update('energy', value => value + amount, o),

    eat: o => amount => _.set('energy', o.energy + amount, o),

    eat: o => amount => p(o, x => x.energy += amount),


    // _.set(_.lensProp('energy'), [], dino) // aww, no more friends

}


const period = { year: 2018, month: 0 };
console.log(Period.nextPeriod1(period));
console.log(Period.nextPeriod4(period));