I'm sharing my though process while considering some improvements over the code base I work with. Explanations will focus on things I find more unusual.
<!-- I did not implement these in production, these are just ideas. -->

I have dozens of entities, ranging from someyhing like 2 to 50 fields each. Here is a fragment of an **Employee** schema. It is skewed in order to demonstrate situations found in other entities

| field             | validation |
|-------------------|------------|
| matricula         | string     |
| nome              | string     |
| pis               | string     |
| dt_admissao       | date       |
| dt_nascimento     | date       |
| demissionDate     | date       |
| FL_ACESSA_PORTA_1 | boolean    |

This is not that unusual for legacy code. Lack of standards in a code base of over 10 years, maintained by dozens of programmers of very different skills and motivation levels. I want to fix this, but we are not allowed to change the database. No problem, I can create a mapper.

| field             | mapper          |
|-------------------|-----------------|
| matricula         | register        |
| nome              | name            |
| pis               | pis             |
| dt_admissao       | hireDate        |
| dt_nascimento     | birthDate       |
| demissionDate     | terminationDate |
| FL_ACESSA_PORTA_1 | canAccessDoor1  |

Motivations
- inglerization: english as default language. Not as obvious decision as it may seem, but overall its worth it.
    - some things have no english equivalent
- camel casing: standard in JS world.
- no prefixes (hungary notation): this favours a more natural naming, and without abbreviations
- renaming to more "business accurate" terms. Not a clear cut thing, it would be nice to have some standards in domain language. A bit of google search made be think that terminationDate is better.

I don't mean to say my choices here are better, but hey are not "just" preferences. They're justifiable, I have a reasoning behind them, I know the alternatives, I can argue for and against them.

I need an UI for Employee, so each field needs a label and sometimes a description.

| field     | label    | description                           |
|-----------|----------|---------------------------------------|
| matricula | Register | An unique identifier for the employee |

I also need a REST endpoint for it, and I w

- name
- hireDate
- terminationDate
- jobTitle

const employee = {
    name                : Joi.string().required(),
        pis                 : Joi.string().required(),
        hireDate            : Joi.betterDate().validDate().length(10).required(),

        birthDate           : Joi.betterDate().validDate().length(10).required(),
        terminationDate     : Joi.betterDate().validDate().length(10).required(),
        location            : Joi.array(Joi.string()),
        workPermit          : Joi.string(),
        jobTitle            : Joi.string(),
}
    schema: Joi.object({
        // REQUIRED
        register            : Joi.string().required(),
        name                : Joi.string().required(),
        pis                 : Joi.string().required(),
        hireDate            : Joi.betterDate().validDate().length(10).required(),

        birthDate           : Joi.betterDate().validDate().length(10).required(),
        terminationDate     : Joi.betterDate().validDate().length(10).required(),
        location            : Joi.array(Joi.string()),
        workPermit          : Joi.string(),
        jobTitle            : Joi.string(),


Our system is written in english, but our domain is mostly portuguese. The domain language should be close to how you use it, so it's not ideal to write it in english. We don't say "The employee **register** is wrong" in meetings, we say it in portuguese. To there is a bit of mental mind mapping required, but this opens



// pensando: manter colunas boolean. Fica mais claro, uniforme e permite usar como array

// CONCLUSIONS
// schemaInfo shouldn't be allowed to exist incomplete. Either use bool columns or transform the opbject in place
// having extra steps (fillFlag, replaceX) makes function clearer, but adds more code
// - you test for "fills flag", "replaces x"
