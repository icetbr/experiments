// /**
//  * Iterates over elements of `array`, returning an array of all elements
//  * `predicate` returns truthy for. The predicate is invoked with three
//  * arguments: (value, index, array).
//  *
//  * **Note:** Unlike `remove`, this method returns a new array.
//  *
//  * @since 5.0.0
//  * @category Array
//  * @param {Array} array The array to iterate over.
//  * @param {Function} predicate The function invoked per iteration.
//  * @returns {Array} Returns the new filtered array.
//  * @see pull, pullAll, pullAllBy, pullAllWith, pullAt, remove, reject
//  * @example
//  *
//  * const users = [
//  *   { 'user': 'barney', 'active': true },
//  *   { 'user': 'fred',   'active': false }
//  * ]
//  *
//  * filter(users, ({ active }) => active)
//  * // => objects for ['barney']
//  */
// function filter(array, predicate) {
//   let index = -1
//   let resIndex = 0
//   const length = array == null ? 0 : array.length
//   const result = []

//   while (++index < length) {
//     const value = array[index]
//     if (predicate(value, index, array)) {
//       result[resIndex++] = value
//     }
//   }
//   return result
// }

// filter()

// const a = (b, c) => { console.log(c) };
// a('b')

(async () => {
    const ask = message => decodeURIComponent(prompt(message).trim())
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: "POST",
      body: new URLSearchParams([
        ['client_id', decodeURIComponent('clientId')],
        ['client_secret', decodeURIComponent('clientSecret')],
        ['code', decodeURIComponent('code')],
        ['grant_type', 'authorization_code'],
        ['redirect_uri', 'http%3A//127.0.0.1%3A9004']
      ]),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const json = await response.json();
    console.log(json);

  })();
