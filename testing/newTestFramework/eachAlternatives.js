describe('returns error with', (f) => {
    it1('inexistent employee', fb.minimum, { ...fb.minimum(), employee: null, expectedError: u.NOT_FOUND(u.employeeNotFound()) })
    it('inexistent employee', () => r1({ ...fb.minimum(), employee: null, expectedError: u.NOT_FOUND(u.employeeNotFound()) }))
    it('inexistent employee', () => r1({ ...fb.minimum(), employee: null, expectedError: u.NOT_FOUND(u.employeeNotFound()) }))
});

describe('returns error with', (f) => {
    it('inexistent employee', () => r1({ ...fb.minimum(), employee: null, expectedError: u.NOT_FOUND(u.employeeNotFound()) }))
    it('inexistent employee', () => r1({ ...fb.minimum(), employee: null, expectedError: u.NOT_FOUND(u.employeeNotFound()) }))
    it('inexistent employee', () => r1({ ...fb.minimum(), employee: null, expectedError: u.NOT_FOUND(u.employeeNotFound()) }))
});

describe('returns error with', (f) => {
    before(() => f = fb.minimum());
    it('inexistent employee', () => r1({ employee: null, expectedError: u.NOT_FOUND(u.employeeNotFound()) }))
    it('inexistent employee', () => r1({ employee: null, expectedError: u.NOT_FOUND(u.employeeNotFound()) }))
    it('inexistent employee', () => r1({ employee: null, expectedError: u.NOT_FOUND(u.employeeNotFound()) }))
});

const x = [
    ['Scenario', 'fixture', 'returns', 'with message'],
    ['inexistent employee', fb.minimum({ employee: null }), NOT_FOUND, u.employeeNotFound()],
    ['inexistent company', fb.minimum({ company: null }), NOT_FOUND, u.companyNotFound()],
    ['middleware company', fb.minimum({ company: aMiddlewareCompany() }), NOT_FOUND, u.companyIsMiddleware()],
]

const x = [
    ['inexistent employee', fb.minimum({ employee: null }), { expectedError: [NOT_FOUND, u.employeeNotFound()] }],
    ['inexistent company', fb.minimum({ company: null }), { expectedError: [NOT_FOUND, u.companyNotFound()] }],
    ['middleware company', fb.minimum({ company: aMiddlewareCompany() }), { expectedError: [NOT_FOUND, u.companyIsMiddleware()] }],
]