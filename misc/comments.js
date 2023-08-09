const { validations, generations, transformations } = require('./config');
const { error } = require('./utils');
const db = require('./db');
const { keys, entries, fromEntries } = Object;

module.exports = {
  // steps to remmeber
    // if (this.options.parent) {
    //   internalFields._parent = this.options.parent
    // }
  // create3(data) {
  //   // canPost
  //   const comment = entries(data)              // converts to array and shallow clones the data
  //         .filter(isAllowed)
  //         .filter(isValid)
  //         //sanitize: CRFS, XSS
  //         .concat(generateFields)
  //         .map(toTransformed);

  //   db.insert(fromEntries(comment));
  // },

  // opt create2
    // const allowedFields = keys(validations);
    // if (!allowedFields.includes(field)) throw new Error(`Forbidden field: ${field}`);


  // const isAllowed = ([field]) => validations[field] ? true : error(`Forbidden field: ${field}`);
  // const isValid = ([field, value]) => validations[field] ? validations[field](value) : false;
  create1a(data) {
    const isValid = ([field, value]) => validations[field] ? validations[field](value) : error(`Forbidden field: ${field}`);
    const toGeneratedField = ([field, generate]) => [field, generate()];
    const generateFields = () => entries(generations).map(toGeneratedField);
    const toTransformed = ([field, value]) => [field, transformations[field] ? transformations[field](value) : value];

    const comment = entries(data)
      .filter(isValid)
      .concat(generateFields())
      .map(toTransformed);

    db.insert(fromEntries(comment));
  },

  // lodash
  create1b(data) {
    const checkForbiddenFields = (value, field) => !validations[field] && error(`Forbidden field: ${field}`);
    const validate = (value, field) => validations[field](value);
    const toGeneratedField = ([field, generate]) => [field, generate()];
    const generateFields = () => entries(generations).map(toGeneratedField);
    const toTransformed = (value, field) => transformations[field] ? transformations[field](value) : value;

    db.insert(_(data)
      .forIn(checkForbiddenFields)
      .forIn(validate)
      .assign(generateFields())
      .mapValues(toTransformed)
    );
  },

  // new line
  create1a(data) {
    const isAllowed = ([field]) =>
      validations[field] ? true : error(`Forbidden field: ${field}`);

    const isValid = ([field, value]) =>
      validations[field] ? validations[field](value) : false;

    const toGeneratedField = ([field, generate]) =>
      [field, generate()];

    const generateFields = () =>
      entries(generations).map(toGeneratedField);

    const toTransformed = ([field, value]) =>
      [field, transformations[field] ? transformations[field](value) : value];

    const comment = entries(data)
      .filter(isAllowed)
      .filter(isValid)
      .concat(generateFields())
      .map(toTransformed);

    db.insert(fromEntries(comment));
  },

  create2(data) {
    for (const field in data) {
      if (!validations[field]) throw new Error(`Forbidden field: ${field}`);
    }

    for (const [field, validate] of entries(validations)) {
      validate(data[field]);
    }

    const generatedFields = {};
    for (const [field, generate] of entries(generations)) {
      generatedFields[field] = generate(data);
    }

    const transformedFields = {};
    for (const [field, transform] of entries(transformations)) {
      transformedFields[field] = transform(data[field]);
    }

    db.insert({ ...data, ...generatedFields, ...transformedFields });
  },

  create2a(data) {
    for (const field in data)
      if (!validations[field]) throw new Error(`Forbidden field: ${field}`);

    for (const [field, validate] of entries(validations))
      validate(data[field]);

    const generatedFields = {};
    for (const [field, generate] of entries(generations))
      generatedFields[field] = generate(data);

    const transformedFields = {};
    for (const [field, transform] of entries(transformations))
      transformedFields[field] = transform(data[field]);

    db.insert({ ...data, ...generatedFields, ...transformedFields });
  },

  create2b(data) {
    for (const field in data) if (!validations[field]) throw new Error(`Forbidden field: ${field}`);

    for (const [field, validate] of entries(validations)) validate(data[field]);

    const generatedFields = {};
    for (const [field, generate] of entries(generations)) generatedFields[field] = generate(data);

    const transformedFields = {};
    for (const [field, transform] of entries(transformations)) transformedFields[field] = transform(data[field]);

    db.insert({ ...data, ...generatedFields, ...transformedFields });
  },

  create3(data) {
    keys(data).forEach(field => !validations[field] && error(`Forbidden field: ${field}`));
    entries(validations).forEach(([field, validate]) => validate(data[field]));
    const generatedFields = entries(generations).map(([field, generate]) => [field, generate(data[field])]);
    const transformedFields = entries(transformations).map(([field, transform]) => [field, transform(data[field])]);

    db.insert({ ...data, ...fromEntries(generatedFields), ...fromEntries(transformedFields) });
  },

  create3a(data) {
    //checkForbiddenFields
    keys(data).forEach(field => !validations[field] && error(`Forbidden field: ${field}`));

    //validate
    entries(validations).forEach(([field, validate]) => validate(data[field]));

    const generatedFields = entries(generations).map(([field, generate]) => [field, generate(data[field])]);
    const transformedFields = entries(transformations).map(([field, transform]) => [field, transform(data[field])]);

    db.insert({ ...data, ...fromEntries(generatedFields), ...fromEntries(transformedFields) });
  },

  create3b(data) {
    const checkForbiddenFields = data => keys(data).forEach(field => !validations[field] && error(`Forbidden field: ${field}`));
    const validate = data => entries(validations).forEach(([field, validate]) => validate(data[field]));
    const generateFields = data => fromEntries(entries(generations).map(([field, generate]) => [field, generate(data[field])]));
    const transformFields = data => fromEntries(entries(transformations).map(([field, transform]) => [field, transform(data[field])]));

    checkForbiddenFields(data);
    validate(data);

    db.insert({
      ...data,
      ...generateFields(data),
      ...transformFields(data),
    });
  },

  create3c(data) {
    const checkForbiddenField = field => !validations[field] && error(`Forbidden field: ${field}`);
    const validate = data => ([field, validate]) => validate(data[field]);
    const generate = data => ([field, generate]) => [field, generate(data[field])];
    const transform = data => ([field, transform]) => [field, transform(data[field])];

    const generateFields = data => fromEntries(entries(generations).map(generate(data)));
    const transformFields = data => fromEntries(entries(transformations).map(transform(data)));

    keys(data).forEach(checkForbiddenField);
    entries(validations).forEach(validate(data));

    db.insert({
      ...data,
      ...generateFields(data),
      ...transformFields(data),
    });
  },

  create3d(data) {
    const checkForbiddenFields = validations => data => keys(data).forEach(field => !validations[field] && error(`Forbidden field: ${field}`));
    const validate = validations => data => entries(validations).forEach(([field, validate]) => validate(data[field]));
    const generateFields =
      generations =>
      data =>
      fromEntries(entries(generations).map(([field, generate]) => [field, generate(data[field])]));
    const transformFields = transformations => data => fromEntries(entries(transformations).map(([field, transform]) => [field, transform(data[field])]));

    checkForbiddenFields(validations)(data);
    validate(validations)(data);

    db.insert({
      ...data,
      ...generateFields(generations)(data),
      ...transformFields(transformations)(data),
    });
  },

  create4(data) {
    // prevent forbidden fields
    // prevent invalid fields
    // add generated fields
    // transform fields
    // save the result
  },

  create4a(data) {
    keys(data).forEach(field => !validations[field] && error(`Forbidden field: ${field}`));
    entries(validations).forEach(([field, validate]) => validate(data[field]));
    assign(data, fromEntries(entries(generations).map(([field, generate]) => [field, generate(data[field])])));
    assign(data, fromEntries(entries(transformations).map(([field, transform]) => [field, transform(data[field])])))
    db.insert(data);
  },

  create4b(data) {
    entries(data).forEach(([field, value]) => validations[field] ? validations[field](value) : error(`Forbidden field: ${field}`));
    assign(data, fromEntries(entries(generations).map(([field, generate]) => [field, generate(data[field])])));
    assign(data, fromEntries(entries(transformations).map(([field, transform]) => [field, transform(data[field])])))
    db.insert(data);
  },

  create4c(data) {
    entries(data).forEach(([field, value]) => validations[field] ? validations[field](value) : error(`Forbidden field: ${field}`));
    entries(generations).forEach(([field, generate]) => data[field] = generate());
    entries(transformations).forEach(([field, transform]) => data[field] = transform(data[field]));
    db.insert(data);
  },

  create4d(data) {
    _.forIn(data, (field, value) => validations[field] ? validations[field](value) : error(`Forbidden field: ${field}`));
    _.forIn(generations, (field, generate) => data[field] = generate());
    _.forIn(transformations, (field, transform) => data[field] = transform(data[field]));
    db.insert(data);
  },

  create4e(data) {
    _.forIn(data,            (field, value) =>     validations[field] ? validations[field](value) : error(`Forbidden field: ${field}`));
    _.forIn(generations,     (field, generate) =>  data[field] = generate());
    _.forIn(transformations, (field, transform) => data[field] = transform(data[field]));
    db.insert(data);
  },

  create4d(data) {
    const validate = ([field, value]) => validations[field] ? validations[field](value) : error(`Forbidden field: ${field}`);
    const generate = ([field, generate]) => data[field] = generate();
    const transform = ([field, transform]) => data[field] = transform(data[field]);

    entries(data).forEach(validate);
    entries(generations).forEach(generate);
    entries(transformations).forEach(transform);
    db.insert(data);
  },

  create4b(data) {
    for (const [field, value] of entries(data)) {
      validations[field] ? validations[field](value) : error(`Forbidden field: ${field}`)
    }

    for (const [field, generate] of entries(generations)) {
      data[field] = generate(data);
    }

    for (const [field, transform] of entries(transformations)) {
      data[field] = transform(data[field]);
    }

    db.insert(data);
  },
}

