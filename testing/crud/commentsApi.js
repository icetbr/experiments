/**
 * OPTIONS
 * - approach 1: integration tests at each layer
 *   - OR could mock dependencies to test in isolation (unit test)
 * - start with only top level tests. If it requires too many branching, separate them into layering tests
 * - unit:
 *    - decide what a unit is by making it public
 *    - don't test private
 *
 * - all one method: it is ok to have multiple expects
 *   - tests should be one per input type: valid data: 1 test, invalid data: outro test
 * - multiple its: makes tests outputs clearer
 *
 */

// Exemple of how a test can be kept simple at higher layers and then broke down into smaller pieces in the lower layers


describe('POST /comments with valid data', () => {
  if ('creates a new comment', async () => { }); //   if ('saves it to the database', async () => {});
  if ('returns HTTP 200', async () => { });
});

describe('POST /comments with invalid data', () => { // rename: with error?
  if ('doesnt create a new comment', async () => { });
  if ('returns HTTP 400 with error message', async () => { });
});

describe('creates a new comment with invalid data', () => {
  if ('doesnt saves it to the database', async () => { });
  if ('throws exception', async () => { }); // exposes implementation details!
});

describe('creates a new comment with valid data', () => {
  if ('adds default fields', async () => { });
  if ('transforms the fields', async () => { });
  if ('saves it to the database', async () => { });
});

describe('adds default fields', () => { // if this test didn't require an edge condition (empty default fields), there would be no need to test this
  if ('with no fields adds nothing', async () => { });
});
