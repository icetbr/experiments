export const getDefaultEncoding = () =>
  'utf8'

const readFile = fsModule => encoding => filename =>
  new Promise((success, failure) =>
    fsModule.readFile(filename, encoding, (error, data) =>
      error
        ? failure(error)
        : success(data)
    )

const parseFile = data =>
  new Promise((success, failure) => {
    try {
      const result = JSON.parse(data)
      return result
    } catch (error) {
      return error
    }
  })

const filterHumans = peeps =>
  peeps.filter(
    person =>
      person.type === 'Human'
  )

const formatNames = humans =>
  humans.map(
    human =>
      `${human.firstName} ${human.lastName}`
  )

const startCaseNames = names =>
  names.map(startCase)

export const getPeople = fsModule => encoding => filename =>
  readFile(fsModule)(encoding)(filename)
    .then(parseFile)
    .then(filterHumans)
    .then(formatNames)
    .then(startCaseNames)
