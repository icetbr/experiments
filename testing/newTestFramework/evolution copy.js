describe.only('chamar /reckons (Reckon Lite)', () => {

    it('inexistent employee returns error', async () => {
        const f = fb.minimum();
        delete f.employee;
        const logStub = u.stubWarnLog();
        const response = await r.populateFetch(f);
        u.expectResult(response, u.NOT_FOUND(u.employeeNotFound()));
        u.expectLog(logStub, u.employeeNotFound());
    });

    // more compact, better expect
    it('inexistent employee returns error', async () => {
        const f = fb.minimum({ employee: null });
        const { response, logStub } = await r.populateFetch(f, u.stubWarnLog);
        u.expectError(response, logStub, u.NOT_FOUND, u.employeeNotFound());
    });

    // more flexible builder, composable runner, less cumbersome expect message
    it('inexistent employee returns error', async () => {
        const f = { ...fb.minimum(), employee: null };
        const { response, logStub } = await u.stubWarnLog(r.populateFetch)(f);
        e.expectError(response, logStub, u.EMPLOYEE_NOT_FOUND);
    });

    // DECISOES
    // - fixtures always return themselves composed? Use a wrapper?
    // - log always stubbed!?

    /** *********************************** */
    /** Removing noise */
    /** *********************************** */

    // ideal scenario
    'inexistent employee returns error' = {
        f: fb.minimum,
        employee: null,
        expectedError: u.EMPLOYEE_NOT_FOUND,
    };

    // with explicit runner
    it('inexistent employee returns error', async () => {
        await r1({ f: fb.minimum, employee: null, expectedError: u.EMPLOYEE_NOT_FOUND })
    });

    // runner declared on it
    it1('inexistent employee returns error', fb.minimum, { employee: null, expectedError: u.aEMPLOYEE_NOT_FOUND });
    'inexistent employee returns error' = { f: fb.minimum, employee: null, expectedError: u.EMPLOYEE_NOT_FOUND }; // for comparison
    'inexistent employee returns error' = [fb.minimum, { employee: null, expectedError: u.EMPLOYEE_NOT_FOUND }];  // for comparison

    /* ALTS */
    itEach('returns error with', {
        f: fb.minimum,
        'inexistent employee': { employee: null, expectedError: u.EMPLOYEE_NOT_FOUND },
        'inexistent employee': { employee: null, expectedError: u.EMPLOYEE_NOT_FOUND },
        'inexistent employee': { employee: null, expectedError: u.EMPLOYEE_NOT_FOUND },
    })

    describe('returns error with', () => {
        const f = fb.minimum;
        it1('inexistent employee', f, { employee: null, expectedError: u.EMPLOYEE_NOT_FOUND });
        it1('inexistent employee', f, { employee: null, expectedError: u.EMPLOYEE_NOT_FOUND });
        it1('inexistent employee', f, { employee: null, expectedError: u.EMPLOYEE_NOT_FOUND });
    });

    it('inexistent employee returns error', (d, f = fb.minimum()) => {
        f.employee = null;
        f.expectedError = u.EMPLOYEE_NOT_FOUND;
        return r1(f);
    });

   it('com funcionário inexistente retorna erro', fb.minimum, () =>
        ({ employee: null, expectedError: u.NOT_FOUND(u.employeeNotFound())}))
});
