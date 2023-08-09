// Creating an object

let animal = {}
animal.name = 'Leo'
animal.energy = 10

animal.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

// Functional Instantiation: when more then one object is needed

function Animal(name, energy) {
  let animal = {}
  animal.name = name
  animal.energy = energy

  animal.eat = function (amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  }

  return animal
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)

// Functional Instantiation with Shared Methods: share methods between instances to save memory

const animalMethods = {
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  },
}

function Animal(name, energy) {
  let animal = {}
  animal.name = name
  animal.energy = energy
  animal.eat = animalMethods.eat

  return animal
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)

// Adding Object.create: delegates lookup to another object on failed lookups
// {} is the same as Object.create(Object.prototype)

const animalMethods = {
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  },
}

function Animal(name, energy) {
  let animal = Object.create(animalMethods)
  animal.name = name
  animal.energy = energy

  return animal
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)

leo.eat(10) // failed lookup

// Prototype: every function in JavaScript has a prototype property that references an object

function doThing() { }
console.log(doThing.prototype) // {}

// Prototypical instantiation: to use the function's prototype to share methods, instead of a separate object

function Animal(name, energy) {
  let animal = Object.create(Animal.prototype)
  animal.name = name
  animal.energy = energy

  return animal
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

// Pseudoclassical Instantiation: using `new` to automatically calls Object.create, assigns to an object called `this`, delegates to the object's prototype and returns it

function Animal(name, energy) {
  // const this = Object.create(Animal.prototype)

  this.name = name
  this.energy = energy

  // return this
}

const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)

// class syntax: constructor is a prototype property like any other; it can be referenced or overrided

class Animal {
  constructor(name, energy) {
    this.name = name
    this.energy = energy
  }
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  }
}

// fields proposal

class Animal {
  name: '',
  energy: 0,
}

// static methods: not shared to the instances (not added to the prototype)

class Animal {
  constructor(name, energy) {
    this.name = name
    this.energy = energy
  }
  static nextToEat(animals) {
    const sortedByLeastEnergy = animals.sort((a, b) => {
      return a.energy - b.energy
    })

    return sortedByLeastEnergy[0].name
  }
}

const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)

console.log(Animal.nextToEat([leo, snoop])) // Leo

// ES5 version

function Animal(name, energy) {
  this.name = name
  this.energy = energy
}

Animal.nextToEat = function (nextToEat) {
  const sortedByLeastEnergy = animals.sort((a, b) => {
    return a.energy - b.energy
  })

  return sortedByLeastEnergy[0].name
}