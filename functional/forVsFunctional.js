// for 1
let total = 0;
for(distance of distances) total += distance < 10000 ? distance * 0.621371 : 0;

// for 2
let total = 0;
distances.forEach(distance => total += distance < 10000 ? distance * 0.621371 : 0);

// functional 1
let total = distances.filter(item => item.distance < 10000)
                     .map(item => item.distance * 0.621371)
                     .reduce((prev, distance) => prev + distance, 0)

// functional 2
const total = distances.reduce((acc, distance) => distance < 10000 ? acc + (distance * 0.621371) : acc, 0);




const carts = [
    {
        name: 'Waterloo Sparkling Water',
        quantity: 4,
        price: 1,
    },
    {
        name: 'High Brew Coffee',
        quantity: 2,
        price: 2,
    },
];

// for 1
let totalPrice = 0;
for (const cart of carts) {
    totalPrice += cart.quantity * cart.price;
}

// totalPrice = 0
// for cart of carts
//     totalPrice += quantity * price

// // for 2
// const total = carts.reduce((acc, cart) => {
//     return acc + (cart.quantity * cart.price);
// }, 0);

// total = carts.reduce((totalPrice, cart)
//     totalPrice + cart.quantity * cart.price
// 0

