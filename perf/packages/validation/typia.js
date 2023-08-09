const keys = Object.keys;

const isStrict = input => {
    if(keys(input).length !== 7 || keys(input.deeplyNested).length !== 3) throw new Error("Extra keys");
    if(
        "object" === typeof input && null !== input && (
        "number" === typeof input.number &&
        "number" === typeof input.negNumber &&
        "number" === typeof input.maxNumber &&
        "string" === typeof input.string &&
        "string" === typeof input.longString &&
        "boolean" === typeof input.boolean && (
        "object" === typeof input.deeplyNested && null !== input.deeplyNested && (
        "string" === typeof input.deeplyNested.foo &&
        "number" === typeof input.deeplyNested.num &&
        "boolean" === typeof input.deeplyNested.bool
    )))) return true;
    throw new Error('wrong type.');
};

const is = input => {
    if(
        "object" === typeof input && null !== input && (
        "number" === typeof input.number &&
        "number" === typeof input.negNumber &&
        "number" === typeof input.maxNumber &&
        "string" === typeof input.string &&
        "string" === typeof input.longString &&
        "boolean" === typeof input.boolean && (
        "object" === typeof input.deeplyNested && null !== input.deeplyNested && (
        "string" === typeof input.deeplyNested.foo &&
        "number" === typeof input.deeplyNested.num &&
        "boolean" === typeof input.deeplyNested.bool
    )))) return true;
    throw new Error('wrong type.');
};

export default {
    ['typia']: is,
    ['typia strict']: isStrict,
}
