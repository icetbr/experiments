export default {
  ['sinclair-typebox']: (value) => {
    return (
      (typeof value === 'object' && value !== null && !Array.isArray(value)) &&
      (typeof value.number === 'number' && Number.isFinite(value.number)) &&
      (value.negNumber !== undefined ? ((typeof value.negNumber === 'number' && Number.isFinite(value.negNumber))) : true) &&
      (typeof value.maxNumber === 'number' && Number.isFinite(value.maxNumber)) &&
      (typeof value.string === 'string') &&
      (typeof value.longString === 'string') &&
      (typeof value.boolean === 'boolean') &&
      (typeof value.deeplyNested === 'object' && value.deeplyNested !== null && !Array.isArray(value.deeplyNested)) &&
      (typeof value.deeplyNested.foo === 'string') &&
      (typeof value.deeplyNested.num === 'number' && Number.isFinite(value.deeplyNested.num)) &&
      (typeof value.deeplyNested.bool === 'boolean') &&
      (3 === Object.keys(value.deeplyNested).length && 7 === Object.keys(value).length)
      // Object.getOwnPropertyNames(value.deeplyNested).length === 3 &&
      // Object.getOwnPropertyNames(value).every(key => ['number', 'negNumber', 'maxNumber', 'string', 'longString', 'boolean', 'deeplyNested'].includes(key))
    )
  }
}
