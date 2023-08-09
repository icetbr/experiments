describe.only('Reckon Lite', () => {
    // empresa lite usa rekoLite
    // it('com empresa, funcionário e período cria apuração, retorna ela e salva ela no banco', async () => {

    it('passando empresa, funcionário e período cria apuração, retorna ela e salva ela no banco', async () => {




await a.bareMinimumDbWith(
    a.employee({ _id: '59667b5fbca8131700000005' }),
    a.company({ code: 'a000001' }),
);

const actual = await generateReckons({ companyCode: 'a000001', employeeId: '59667b5fbca8131700000005', period: '201702' });

expect(actual, 'a000001_59667b5fbca8131700000005_201702_created');

await a.bareMinimumDbWith(
    a.employee({ _id: '59667b5fbca8131700000006' }),
    a.company({ code: 'a000001' }),
); => not found

await a.bareMinimumDbWith(
    a.employee({ _id: '59667b5fbca8131700000005' }),
    a.company({ code: 'a000002' }),
); => not found

const actual = await generateReckons({ companyCode: 'a000001', employeeId: '59667b5fbca8131700000005', period: '201702' });

expect(actual, 'a000001_59667b5fbca8131700000005_201702_created');


// expect(actual, a.reckonsResult({
//     company: 'a000001',
//     employee: { _id: '59667b5fbca8131700000005' },
//     period: '201702',
// }));
