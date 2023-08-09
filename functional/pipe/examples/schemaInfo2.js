// STYLE COMPARISON

import Joi from '../src/joi.js'
import { mapValues as map, filterValues as filter, pipe as _} from '@ah/utils';

const app = 0, example = 1, validation = 2, label = 3, description = 4, devNotes = 5;
const EMPTY = '&#8203';

export const toJoiSchema2 = _ => {
    _ = map(_, a =>
        a[validation].example(a[example].replace?.('[x]', 5) || a[example])
        .description(a[description] || EMPTY)
        .note(a[devNotes] || EMPTY)
    );
    return Joi.object(_);
};

export const toJoiSchema = _ => Joi.object(
    map(_, a =>
        a[validation].example(a[example].replace?.('[x]', 5) || a[example])
        .description(a[description] || EMPTY)
        .note(a[devNotes] || EMPTY)
    )
);

export const toJoiSchema9 = _ =>
    object(map(_, a =>
        a[validation].example(a[example].replace?.('[x]', 5) || a[example])
        .description(a[description] || EMPTY)
        .note(a[devNotes] || EMPTY)
    ));

export const toJoiSchema4 = _(
    map(a =>
        a[validation].example(a[example].replace?.('[x]', 5) || a[example])
        .description(a[description] || EMPTY)
        .note(a[devNotes] || EMPTY)
    ),
    object,
);

export const toJoiSchema6 = _(
    map(_(
        adjust(example, replace('[x]', 5)),
        a =>
            a[validation].example(a[example])
            .description(a[description] || EMPTY)
            .note(a[devNotes] || EMPTY)
    )),
    Joi.object,
);

export const toJoiSchema7 = _(map(_(replaceX(5), buildSchema)), Joi.object);

export const toJoiSchema8 = _(
    map(_(
        replaceX(5),
        buildSchema
    )),
    Joi.object
);

export const fullExample = x => map(a => a[example].replace?.('[x]', x) || a[example]);

export const requiredExample = x => _(filter(a => a[validation].includes('required')), fullExample(x));

