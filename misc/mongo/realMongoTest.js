const Code = require('@hapi/code');
const { expect } = require('@hapi/code');
const { describe, it } = exports.lab = require('@hapi/lab').script();
const { MongoClient } = require('mongodb');
Code.settings.truncateMessages = true;

const ellapsedTime = (start) => {
  var hrtime = process.hrtime(start);
  const nanoseconds = (hrtime[0] * 1e9) + hrtime[1];
  return (nanoseconds / 1e6).toFixed(0);
};

describe('real mongo', () => {

  it('insert saves the data to the database', async () => {
    const time = process.hrtime();
    const client = await MongoClient.connect('mongodb://localhost:27017/pwtests', { useUnifiedTopology: true, useNewUrlParser: true });
    const db = client.db('pwtests');

    await db.collection('test1').removeMany();
    // await db.collection('test1').drop();
    await db.dropDatabase();
    await db.collection('test1').insertMany([{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }]);
    const objects = await db.collection('test1').find().toArray();

    console.log(ellapsedTime(time));

    console.log(JSON.stringify(objects))
    expect(true).to.equal(true);
    // await employee.removeAll();
  });

});


