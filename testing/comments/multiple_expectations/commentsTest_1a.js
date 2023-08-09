// ORGANIZATION VARIATION: every step is a comment

// CON
 // - test failures will be less descriptive
describe('POST /comments with valid data', () => {
  const comment = {
    name: 'John',
    email: 'john@test.com',
    content: 'my comment',
    postId: '2019-10-05-blockchain-platforms'
  };

  const response = await post('/api/comments', comment);
  const saved = await db.find();

  // saves it to to the database
  expect(saved).to.have.lenght(1);

  // adds _id with an unique id
  expect(saved[0]).to.include({ _id: UID });

  // adds date with the current date
  expect(saved[0]).to.include({ date: NOW });

  // transforms email to its md5 value
  expect(saved[0]).to.include({ email: '5634ff13f953ebcb374ac8c349bcfcfe' });

  // saves all fields
  expect(saved[0]).to.equal({
    name: 'John',
    content: 'my comment',
    postId: '2019-10-05-blockchain-platforms',
    _id: UID,
    date: NOW,
    email: '5634ff13f953ebcb374ac8c349bcfcfe',
  });

  // responds with 200
  expect(response).to.equal({ statusCode: 200, body: undefined });
});

// VARIATION 1: use accumulative expected
// CONS
// - 'saved === expected' is easier to write, but less explicit then writing the whole object
//   - this begin to enter the teritory of adding logic into tests
describe('POST /comments with valid data', () => {
  const comment = {
    name: 'John',
    email: 'john@test.com',
    content: 'my comment',
    postId: '2019-10-05-blockchain-platforms'
  };

  const response = await post('/api/comments', comment);
  const saved = await db.find();

  const expected = { ...comment };

  //saves it to to the database
  expect(saved).to.have.lenght(1);

  //adds _id with an unique id
  expected._id = UID;
  expect(saved[0]).to.include(expected);

  //adds date with the current date
  expected.date = NOW;
  expect(saved[0]).to.include(expected);

  //transforms email to its md5 value
  expected.email = '5634ff13f953ebcb374ac8c349bcfcfe';
  expect(saved[0]).to.include(expected);

  //saves all fields
  expect(saved[0]).to.equal(expected);

  //responds with 200
  expect(response).to.equal({ statusCode: 200, body: undefined });
});