import { Type } from '@sinclair/typebox';
import { TypeCompiler } from '@sinclair/typebox/compiler';
import { TypeSystem } from '@sinclair/typebox/system';
import { Value } from '@sinclair/typebox/value';

// Use TypeScript Checking Semantics
// TypeSystem.AllowArrayObjects = true;
// TypeSystem.AllowNaN = true;

// createCase('@sinclair/typebox', 'assertLoose', () => {
//   const dataType = Type.Object({
//     number: Type.Number(),
//     negNumber: Type.Number(),
//     maxNumber: Type.Number(),
//     string: Type.String(),
//     longString: Type.String(),
//     boolean: Type.Boolean(),
//     deeplyNested: Type.Object({
//       foo: Type.String(),
//       num: Type.Number(),
//       bool: Type.Boolean(),
//     }),
//   });

//   const compiledType = TypeCompiler.Compile(dataType);

//   return data => {
//     const check = compiledType.Check(data);

//     if (!check) {
//       throw new Error('validation failure');
//     }

//     return true;
//   };
// });


// export default {
// // export const sinclairTypebox_assertStrict = () => {
//     ['@sinclair/typebox assertStrict']:() => {
//     const dataType = Type.Object(
//       {
//         number: Type.Number(),
//         negNumber: Type.Number(),
//         maxNumber: Type.Number(),
//         string: Type.String(),
//         longString: Type.String(),
//         boolean: Type.Boolean(),
//         deeplyNested: Type.Object(
//           {
//             foo: Type.String(),
//             num: Type.Number(),
//             bool: Type.Boolean(),
//           },
//           { additionalProperties: false }
//         ),
//       },
//       { additionalProperties: false }
//     );

//     const compiledType = TypeCompiler.Compile(dataType);

//     return data => {
//       console.log(data)
//       const check = compiledType.Check(data);

//       if (!check) {
//         throw new Error('validation failure');
//       }

//       return true;
//     };
//   },
// }

const dataType = Type.Object(
  {
    number: Type.Number(),
    negNumber: Type.Optional(Type.Number()),
    maxNumber: Type.Number(),
    string: Type.String(),
    longString: Type.String(),
    boolean: Type.Boolean(),
    deeplyNested: Type.Object(
      {
        foo: Type.String(),
        num: Type.Number(),
        bool: Type.Boolean(),
      },
      { additionalProperties: false }
    ),
  },
  { additionalProperties: false }
);

const compiledType = TypeCompiler.Compile(dataType);

// console.log(compiledType.Code())

export default {
  // ['@sinclair/typeboxAot assertStrict']: data => {
  //   const check = compiledType.Check(data);

  //   if (!check) {
  //     throw new Error('validation failure');
  //   }

  //   return true;
  // },

  ['@sinclair/typeboxJit assertStrict']: data => {
    const check = Value.Check(dataType, data);

    if (!check) {
      throw new Error('validation failure');
    }

    return true;
  },
};
