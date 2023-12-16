// inverts autocomplete logic
// size(string(), 1, 100) VS string(size, 1, 100))

import { assert, object, number, string, array } from 'superstruct'

const Article = object({
  id: number(),
  title: size(string(), 1, 100),
  tags: array(string()),
  author: object({
    id: number(),
  }),
})

const data = {
  id: 34,
  title: 'Hello World',
  tags: ['news', 'features'],
  author: {
    id: 1,
  },
}

assert(data, Article)
// This will throw an error when the data is invalid.
// If you'd rather not throw, you can use `is()` or `validate()`.
