# commentsTest

Using the Given When Then terminology, there are 4 variations of tests that I'm currently thinking of

1) **Multiple 'whens'**: use case tests
- user clicks on button
  expect counter to increate by one
- user clicks on button
  expect counter to increate by one
  expect maxClicks to be reached, blocking the button
- user clicks on button
  expect nothing to happen

2) **Multiple 'thens'** (side effects): functional, integration tests
- user creates a comment
  - expect comment to be validated
  - expect common fields to be added
  - expect notification to be emitted
  - expect comment to be saved

3) **Different givens**
- user creates a comment, given the DB is offline
- user creates a comment, given the data is invalid

4) One of each
- validate examples

## How would I documment this for developers and end users?

POST /comments with a valid comment
- creates the comment
- returns HTTP 200

comment creation
- adds default fields
- transforms fields