"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var superstruct_1 = require("superstruct");
var Article = (0, superstruct_1.object)({
    id: (0, superstruct_1.number)(),
    title: (0, superstruct_1.string)({ array: superstruct_1.array, }),
    tags: (0, superstruct_1.array)((0, superstruct_1.string)()),
    author: (0, superstruct_1.object)({
        id: (0, superstruct_1.number)(),
    }),
});
var data = {
    id: 34,
    title: 'Hello World',
    tags: ['news', 'features'],
    author: {
        id: 1,
    },
};
(0, superstruct_1.assert)(data, Article);
// This will throw an error when the data is invalid.
// If you'd rather not throw, you can use `is()` or `validate()`.
