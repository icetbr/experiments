// killer: no debug support

const products = [
  { weight: 1 },
  { weight: 2 },
  { weight: 3 },
]

/**************************************************/
const orderTotalWeight = products
  .map(p => p.weight)
  .reduce((prev, cur) => prev + cur, 0);

/**************************************************/
const orderTotalWeight = 0;
for (const product of products) {
  orderTotalWeight += product.weigth;
}

/**************************************************/
const orderTotalWeight = 0;
products.forEach(product => {
  orderTotalWeight += product.weigth;
});

/**************************************************/
const orderTotalWeight = products.reduce((acc, product) => acc + product.weight, 0);

/**************************************************/
const toWeight = product => product.weight;
const toSum = (acc, weight) => acc + weight;

const orderTotalWeight = products
  .map(toWeight)
  .reduce(toSum, 0);

/**************************************************/
const toWeight = product => product.weight;
const toSum = (acc, weight) => acc + weight;

const orderTotalWeight = products
  .map(toWeight)
  .reduce(toSum, 0);

/**************************************************/
const orderTotalWeight = _.sumBy(products, 'weight');

/**************************************************/
const orderTotalWeight = products
  .map(_.get('weight'))
  .reduce(_.sum, 0);


/***************************************************** */
/***************************************************** */
/***************************************************** */
/***************************************************** */

let totalPrice = 0;
let fruitsPrice = 0;
for (let line of shoppingList) {
  totalPrice += line.units * line.price;
  fruitsPrice += line.type === "FRT" ? line.units * line.price : 0;
}

/***************************************************** */

const addPrice = (totalPrice, line) => totalPrice + (line.units * line.price);
const areFruits = line => line.type === "FRT";

let totalPrice = shoppingList.reduce(unary(addPrice), 0);
let fruitsPrice = shoppingList.filter(areFruits).reduce(addPrice, 0);

/***************************************************** */
let totalPrice = 0;
let fruitsPrice = 0;

for (let line of shoppingList) {
  totalPrice += line.units * line.price;
  fruitsPrice += line.type === "FRT" ? line.units * line.price : 0;
}

/***************************************************** */
const groupBy = key => array => {
  return array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key]
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
    return objectsByKeyValue
  }, {})
}

const groupByAssignee = groupBy('assignedTo')


const getIncomplete = tasks => tasks.filter(({ complete }) => !complete)
const getNonBlocked = tasks => tasks.filter(({ blocked }) => !blocked)
const sortByDueDate = tasks => tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))

const getIterationReport = pipe(
  getIncomplete,
  getNonBlocked,
  sortByDueDate,
  groupByAssignee
)

const report = getIterationReport(tasks)

/***************************************************** */
tasks.filter(({ complete, blocked }) => !complete && !blocked)
     .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
     .groupBy('assignedTo')
/***************************************************** */