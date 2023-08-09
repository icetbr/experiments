function Dog(name, breed, color, sex) {
    this.name = name;
    this.breed = breed;
    this.color = color;
    this.sex = sex;

}

const x1 = {
    get latest() {
        return '1'
    }
}
console.log(x1.latest)

Dog.prototype.toString = function dogToString() {
    return `Dog ${this.name} is a ${this.sex} ${this.color} ${this.breed}`;
}
const theDog = new Dog('Gabby', 'Lab', 'chocolate', 'female');
console.log(theDog + '')

function z1() {
    this.a = 20
}
z1.prototype.toString = function () {
    return 'teste'
}
const z2 = new z1()
console.log(z2 + '')
new Date()
const a = moment.duration('20:10:10');
const b = moment.duration('12:10:10');
a.add(b).format('HH:mm')
a.add(b).asMinutes()
var x = new Date()
const y = x.getTime()
var z = '1617329796283';