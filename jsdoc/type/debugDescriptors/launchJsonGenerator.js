const fs = require('fs');

const data = fs.readFileSync('./dev/launchJson.js');
console.log(JSON.stringify(data.toString()))