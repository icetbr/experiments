"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var v = require("@badrap/valita");
var Pet = v.object({
    type: v.union(v.literal("dog"), v.literal("cat")),
    name: v.string()
});
var Person = v.object({
    name: v.string(),
    age: v.number(),
    pets: v.array(Pet).optional(),
});
