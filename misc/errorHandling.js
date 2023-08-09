const baseHandler = async (model, action, params) => {
  try {
    const data = JSON.parse(params.body);
    const result = await models[model][action](data);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (e) {
    e.name === 'ValidationError' ? log.warn(e.toString()) : log.error(e.stack);
    const statusCode = e.name === 'ValidationError' ? 400 : 500;
    const error = e.name === 'ValidationError' ? 'Bad Request' : 'Internal Server Error';
    return {
      statusCode,
      body: {
        statusCode,
        error,
        message: e.stack, // all stack trace so user can help debug
      },
    };
  }
};

const baseHandler = async (model, action, params) => {
  try {
    const data = JSON.parse(params.body);
    const result = await models[model][action](data);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (e) {
    const errors = {
      Error = {
        statusCode: 500,
        error: 'Internal Server Error',
        messageSource: 'stack',
        logHandler: 'error',
      },
      ValidationError = {
        statusCode: 400,
        error: 'Bad Request',
        messageSource: 'message',
        logHandler: 'warn',
      },
    };
    const error = errors[e.name];
    log[error.logHandler](e[error.messageSource]);
    return {
      statusCode: error.statusCode,
      body: {
        statusCode: error.statusCode,
        error: error.error,
        message: e.message,
      },
    };
  }
};