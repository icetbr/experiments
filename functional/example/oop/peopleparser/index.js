// index.js
import ParseFile from './parsefile'
import { ReadFile, DEFAULT_ENCODING } from './readfile'

class PeopleParser {

  static async getPeople() {
    try {
      const reader = new ReadFile()
      const fileData = await reader.readFile('people.txt', DEFAULT_ENCODING)
      const parser = new ParseFile(data)
      parser.parseFileContents()
      return parser.names
    } catch (error) {
      console.error(error)
    }
  }

}

export default PeopleParser
