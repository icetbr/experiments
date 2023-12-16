import * as v from "@badrap/valita";

const Pet = v.object({
  type: v.union(v.literal("dog"), v.literal("cat")),
  name: v.string()
});

const Person = v.object({
  name: v.string(),
  age: v.number(),
  pets: v.array(Pet).optional(),
});
