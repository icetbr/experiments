import fs from 'fs'
import { getPeople, getDefaultEncoding } from './peopleparser'

getPeople(fs)(getDefaultEncoding())('people.txt')
  .then(console.log)
  .catch(console.error)
