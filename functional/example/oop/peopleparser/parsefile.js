// parser.js
import { startCase } from 'lodash'

class ParseFile {

  #fileData
  #names

  get names() {
    return this.#names
  }

  constructor(data) {
    this.#fileData = data
  }

  parseFileContents() {
    let people = JSON.parse(this.#fileData)
    this.#names = []
    let p
    for (p = 0; p < people.length; p++) {
      const person = people[p]
      if (person.type === 'Human') {
        const name = this._personToName(person)
        names.push(name)
      }
    }
  }

  _personToName(person) {
    const name = `${person.firstName} ${person.lastName}`
    return startCase(name)
  }
}

export default ParseFile
