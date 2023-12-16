"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var suretype_1 = require("suretype");
var userSchema = suretype_1.v.object({
    firstName: suretype_1.v.string({}).matches(/a/).maxLength(1).required(),
    lastName: suretype_1.v.string(),
    age: suretype_1.v.number().gte(21),
});
