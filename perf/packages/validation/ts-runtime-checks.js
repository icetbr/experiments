const assertStrict = (_value) => {
    if (typeof _value !== "object" || _value === null)
        throw new Error("Expected _value to be an object");
    if (typeof _value.number !== "number")
        throw new Error("Expected _value.number to be a number");
    if (typeof _value.negNumber !== "number")
        throw new Error("Expected _value.negNumber to be a number");
    if (typeof _value.maxNumber !== "number")
        throw new Error("Expected _value.maxNumber to be a number");
    if (typeof _value.string !== "string")
        throw new Error("Expected _value.string to be a string");
    if (typeof _value.longString !== "string")
        throw new Error("Expected _value.longString to be a string");
    if (typeof _value.boolean !== "boolean")
        throw new Error("Expected _value.boolean to be a boolean");
    if (typeof _value.deeplyNested !== "object" || _value.deeplyNested === null)
        throw new Error("Expected _value.deeplyNested to be an object");
    if (typeof _value.deeplyNested.foo !== "string")
        throw new Error("Expected _value.deeplyNested.foo to be a string");
    if (typeof _value.deeplyNested.num !== "number")
        throw new Error("Expected _value.deeplyNested.num to be a number");
    if (typeof _value.deeplyNested.bool !== "boolean")
        throw new Error("Expected _value.deeplyNested.bool to be a boolean");

    if(!(3 === Object.keys(_value.deeplyNested).length && 7 === Object.keys(_value).length))
        throw new Error("Extra keys");

    // Object.getOwnPropertyNames(_value.deeplyNested).length === 3 &&
    //     Object.getOwnPropertyNames(_value).length === 7
    // for (let p_3 in _value.deeplyNested) {
    //     if (p_3 !== "foo" && p_3 !== "num" && p_3 !== "bool")
    //         throw new Error("Property _value.deeplyNested." + p_3 + " is excessive");
    // }
    // for (let p_4 in _value) {
    //     if (p_4 !== "number" && p_4 !== "negNumber" && p_4 !== "maxNumber" && p_4 !== "string" && p_4 !== "longString" && p_4 !== "boolean" && p_4 !== "deeplyNested")
    //         throw new Error("Property _value." + p_4 + " is excessive");
    // }
    return true;
};

export default {
    ['ts-runtime-checks']: assertStrict
}
