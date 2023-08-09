// readfile.js
import fs from 'fs'
import { EventEmitter } from 'events'

class ReadFile {

  readFile(filename, encoding = DEFAULT_ENCODING) {
    return new Promise(function (success, failure) {
      fs.readFile(filename, encoding, function (error, data) {
        if (error) {
          failure(error)
          return
        }
        success(data)
      })
    })
  }
}

export DEFAULT_ENCODING = 'utf8'
export ReadFile
