// const sm = require('source-map-support/register');
const double = x => x * 2;
const increment = x => x + 1;

const parseSchema = input => input
  |> double(^)
  |> increment(^)
  |> ^ + input
  |> double(^)
  |> double(^)

// parseSchema(process.argv[1])
// parseSchema(2)

// console.log(parseSchema(2));
console.log(1)
