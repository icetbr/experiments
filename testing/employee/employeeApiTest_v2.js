'POST /employees', () => {
    'transforms the employee data to the legacy format', () => {
        'turns name to fullname', () => { };
        'turns jobTitle to occupation', () => { };
    };
    'adds metadata', () => {
        'adds an updatedAt field with the current time', () => { };
        'adds an updatedBy field with the email of the person who called the endpoint', () => { };
    };
    'saves it to the database', () => { };
    'saves a copy for history', () => { };
    'returns the non transformed employee', () => { };
};

/*
    Está parecendo cada vez mais cvom cucumber
*/