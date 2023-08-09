post('/api/comments', validComment())
    .adds(defaultFields)
    .transforms(transformedFields)
    .changes(db).with([allFieds])
    .responds(http200)

// describe('POST /comments with valid data', () => {
//     it('adds default fields')
//     it('transforms fields')
//     it('saves it to the database')
//     it('responds with 200')
// })

describe('POST /comments with valid data', () => {
    it('saves to the database', () => expect(saved).to.have.lenght(1));
    it('saves to the database', saved).to.have.lenght(1);
    equal('saves to the database', saved.length, 1)
    it('saves to the database').equal(saved.length, 1)
    it('saves to the database').contains(saved.length, 1)
    // it.is.expected.to(is_expected.to respond_with_content_type(: json) }
    it('adds default fields')
    it('transforms fields')
    it('saves all fields to the database')
    it('responds with 200')
})



// this test is ok bc there is no logic anywhere, but it does not prescribe a DI design
describe('POST /comments with valid data', () => {
    it('adds default fields')
    it('transforms fields')
    it('saves it to the database')
    it('responds with 200')
})

describe('POST /comments with valid data', () => {
    it('creates a comment')
    it('responds with 200')
})

describe('creates a comment', () => {
    it('adds default fields')
    it('transforms fields')
})

/**
 * CRUD não tem muita variabilidade, pode ser tudo junto
 * - se defaultFields tem logica, separa testes
 * describe('POST /comments with valid data and email is X', () => {
 *
 * CONCLUSOES
1) mocha with expects, latter an expensive reporter to parse body
2) mocha with shared variables + before
  - alt: memoized sharable function
3) tape with mocha like syntax

1) comum
2) ideal
3) melhor possivel com ferramentas dadas


NEXT
começar com este exemplo, p/ decidir qual o mais legivel
 */


