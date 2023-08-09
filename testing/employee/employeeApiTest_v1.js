describe('POST /employees', () => {
    describe('transforms the employee data to the legacy format', () => {
        it('turns name to fullname', () => { });
        it('turns jobTitle to occupation', () => { });
    });
    describe('adds metadata', () => {
        it('adds an updatedAt field with the current time', () => { });
        it('adds an updatedBy field with the email of the person who called the endpoint', () => { });
    });
    it('saves it to the database', () => { });
    it('saves a copy for history', () => { });
    it('returns the non transformed employee', () => { });
});

