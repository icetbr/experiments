/**
 * GOAL: reducing duplication
 *
 * putting these tests here reduce duplication that would require all tests to check for the return value
 *
 * BUT must tie up a real model:
 * - if the model changes, this breaks
 * - will be testing the same code twice
 * SOLUTION: create a dummy model
 * SIDEEFFECT: if the real models change, the dummy would be unnafected!
 *
 * ALTERNATIVATLY I could use one model as reference, the others shouldnt need to test this
 *
 * TLDR: OK for unit test, but still need a full layer test for app
 */

describe('invoking the api', () => {

  it('executes the specified action passing the params supplied', async () => {

  });
  it('returns 200 when the call results in a success', async () => {});
  it('returns 400 when the call results in a validation error', async () => {});
  it('returns 500 when the call results in a critical error', async () => {});
  // it('returns 500 when the specified action doesnt exist', async () => {});

});

// ensures the service is called
describe('invoking a CRUD action', () => {

  it('creates on POST', async () => { });
  it('updates on PUT', async () => { });
  it('gets all on GET', async () => { });
  it('gets one element on GET with an id', async () => { });
  it('removes on DELETE', async () => { });

});

// could also use shared examples and `act as`
// pensando: usar o newAhpi como exemplo
// - to test route existance, need to call every action at least once
// - my example doesnt need this because it forwards all calls



// describe('POST /comments', () => {

//   it('saves the payload data to the database', async t => {
//     const payload = { name: 'John', email: 'john@test.com', content: 'my comment' };
//     await post('/api/comments', payload);

//     const actual = await db.find().toArray();

//     const expected = [payload];
//     expect(actual).to.equal(expected);
//   });

// });

