const sut = require()
const { create } = test(sut);
// tem forma melhor de azer o only? comenta?
eq('aaa', () => [ap(4), 3]);
eq('aaa', () => {
    await prepareDb()
    ap(4)
    expect(await db.load(), 10)
});

const prepare = () => prepareDb();
eq('aaa',
    () => prepareDb(),
    () => ap(4),
    () => [await db.load(), 10]
)

eq('aaa', ap(4), 3);

// how to async?