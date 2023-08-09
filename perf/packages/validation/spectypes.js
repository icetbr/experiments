const parseStrict = value => {
  let err;
  if (!(typeof value === 'object' && value !== null && !Array.isArray(value))) {
    (err = err || []).push({
      issue: 'not an object',
      path: []
    });
  } else {
    const value_number = value.number;
    if (typeof value_number !== 'number') {
      (err = err || []).push({
        issue: 'not a number',
        path: ['number']
      });
    }
    const value_negNumber = value.negNumber;
    if (typeof value_negNumber !== 'number') {
      (err = err || []).push({
        issue: 'not a number',
        path: ['negNumber']
      });
    }
    const value_maxNumber = value.maxNumber;
    if (typeof value_maxNumber !== 'number') {
      (err = err || []).push({
        issue: 'not a number',
        path: ['maxNumber']
      });
    }
    const value_string = value.string;
    if (typeof value_string !== 'string') {
      (err = err || []).push({
        issue: 'not a string',
        path: ['string']
      });
    }
    const value_longString = value.longString;
    if (typeof value_longString !== 'string') {
      (err = err || []).push({
        issue: 'not a string',
        path: ['longString']
      });
    }
    const value_boolean = value.boolean;
    if (typeof value_boolean !== 'boolean') {
      (err = err || []).push({
        issue: 'not a boolean',
        path: ['boolean']
      });
    }
    const value_deeplyNested = value.deeplyNested;
    if (!(typeof value_deeplyNested === 'object' && value_deeplyNested !== null && !Array.isArray(value_deeplyNested))) {
      (err = err || []).push({
        issue: 'not an object',
        path: ['deeplyNested']
      });
    } else {
      const value_deeplyNested_foo = value_deeplyNested.foo;
      if (typeof value_deeplyNested_foo !== 'string') {
        (err = err || []).push({
          issue: 'not a string',
          path: ['deeplyNested', 'foo']
        });
      }
      const value_deeplyNested_num = value_deeplyNested.num;
      if (typeof value_deeplyNested_num !== 'number') {
        (err = err || []).push({
          issue: 'not a number',
          path: ['deeplyNested', 'num']
        });
      }
      const value_deeplyNested_bool = value_deeplyNested.bool;
      if (typeof value_deeplyNested_bool !== 'boolean') {
        (err = err || []).push({
          issue: 'not a boolean',
          path: ['deeplyNested', 'bool']
        });
      }
    //   for (const key_deeplyNested in value_deeplyNested) {
    //     if (!(key_deeplyNested === 'foo' || key_deeplyNested === 'num' || key_deeplyNested === 'bool')) {
    //       (err = err || []).push({
    //         issue: 'excess key - ' + key_deeplyNested,
    //         path: ['deeplyNested']
    //       });
    //     }
    //   }
    }
    if(!(3 === Object.keys(value_deeplyNested).length && 7 === Object.keys(value).length))
    throw new Error("Extra keys");
    // for (const key in value) {
    //   if (!(key === 'number' || key === 'negNumber' || key === 'maxNumber' || key === 'string' || key === 'longString' || key === 'boolean' || key === 'deeplyNested')) {
    //     (err = err || []).push({
    //       issue: 'excess key - ' + key,
    //       path: []
    //     });
    //   }
    // }
  }
  return err ? {
    tag: 'failure',
    failure: {
      value,
      errors: err
    }
  } : {
    tag: 'success',
    success: value
  };
};
export default {
    ['spectypes']: parseStrict,
}
