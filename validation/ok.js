import {
    object,
    string,
    or,
    nullish,
    and,
    length,
    integer,
    Infer,
    hasError,
    assert
} from 'ok-computer';

const user = object({
    firstName: string,
    lastName: or(nullish, string),
    picture: object({
        url: and(string, length(1, 255)),
        width: integer
    })
});
