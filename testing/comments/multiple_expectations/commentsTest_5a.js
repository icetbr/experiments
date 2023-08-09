// ORGANIZATION VARIATION: every step with its own test

// CONS
// - order dependent!!
// - repetition with 'save all fields'
//  - see the other examples for an alternative using am object accumulating the fields
describe('POST /comments with valid data', () => {
  const comment = {
    name: 'John',
    email: 'john@test.com',
    content: 'my comment',
    postId: '2019-10-05-blockchain-platforms'
  };

  let response;
  let saved;

  beforeEach(() => {
    response = await post('/api/comments', comment);
    saved = await db.find();
  });

  it('saves it to to the database', async () => {
    expect(saved).to.have.lenght(1);
  });

  it('adds _id with an unique id', async () => {
    expect(saved[0]).to.include({ _id: UID });
  });

  it('adds date with the current date', async () => {
    expect(saved[0]).to.include({ date: NOW });
  });

  it('transforms email to its md5 value', async () => {
    expect(saved[0]).to.include({ email: '5634ff13f953ebcb374ac8c349bcfcfe' });
  });

  it('saves all fields', async () => {
    expect(saved[0]).to.equal({
      name: 'John',
      content: 'my comment',
      postId: '2019-10-05-blockchain-platforms',
      _id: UID,
      date: NOW,
      email: '5634ff13f953ebcb374ac8c349bcfcfe',
    });
  });

  it('responds with 200', async () => {
    expect(response).to.equal({ statusCode: 200, body: undefined });
  });

});

// VARIATION: DON'T use beforEach (TODO: helper methods)
it('saves it to to the database', async () => {
  const response = await post('/api/comments', comment);
  const saved = await db.find();
  expect(saved).to.have.lenght(1);
});

// DEEP EQUALITY VARIATION 1: break down even further
it('adds _id with an unique id', async () => {
  expect(saved[0]).to.have.property('_id');
  expect(saved[0]).to.have.propertyVal('_id', UID);
});

it('adds date with the current date', async () => {
  expect(saved[0]).to.have.property('date');
  expect(saved[0]).to.have.propertyVal('date', NOW);
});

it('transforms email to its md5 value', async () => {
  expect(saved[0]).to.have.property('email');
  expect(saved[0]).to.have.propertyVal('email', '5634ff13f953ebcb374ac8c349bcfcfe');
});

// DEEP EQUALITY VARIATION 2: every group of steps with its own test
//  - this seems less informative, but could be right if the specifics are not important (as it is my case)
it('adds generated fields', async () => {
  expect(saved[0]).to.include({ _id: UID, date: NOW }); // containSubset ?
});

it('transforms fields', async () => {
  expect(saved[0]).to.include({ email: '5634ff13f953ebcb374ac8c349bcfcfe' });
});

// DEEP EQUALITY VARIATION 3: use equals
// - the error message is better in the other variation
//  - this comparator wouldn't catch if you added 'id' insteand of '_id'
expect(saved[0]._id).to.equal(UID);

