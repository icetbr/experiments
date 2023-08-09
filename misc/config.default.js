const { error, uid, md5 } = require('./utils');

module.exports = {

  // https://www.lettercount.com/
  validations: {
    name: value => value && value.length > 2 && value.length < 254 ? true : error('"name" should be between 2 and 254 caracteres'), // required
    email: value => value && value.length > 5 && value.length < 254 ? true : error('"email" should be between 5 and 254 caracteres'),
    content: value => value && value.length > 1 && value.length < 20000 ? true : error('"content" should be between 1 and 20000 caracteres'),
    website: value => !value || (value && value.length > 5 && value.length < 254) ? true : error('"website" should be between 5 and 254 caracteres'), // optional
    // _id: value => !value, // forbidden. Use this to override default validations


    // name: value => value && value.length > 2 && value.length < 254 ? 'ok' : '"name" should be between 2 and 254 caracteres', // required
    // email: value => value && value.length > 5 && value.length < 254 ? 'ok' : '"email" should be between 5 and 254 caracteres',
    // content: value => value && value.length > 1 && value.length < 20000 ? 'ok' : '"content" should be between 1 and 20000 caracteres',
    // website: value => !value || (value && value.length > 5 && value.length < 254) ? 'ok' : '"website" should be between 5 and 254 caracteres', // optional
    // _id: value => !value, // forbidden. Use this to override default validations
  },

  // validations: {
  //   name: {
  //     validate: value => value && value.length > 2 && value.length < 254,
  //     errorMessage: '"name" should be between 2 and 254 caracteres',
  //   },
  // },

// auto-generated fields ?
  generations: {
    _id: () => uid(),
    date: () => new Date().toISOString(),
  },

  transformations: {
    email: value => md5(value),
    // email: entry => [entry[0], md5(entry[1])],
  },

}

