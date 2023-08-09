'use strict';

const { COMPANY_IS_MIDDLEWARE, COMPANY_IS_BLOCKED, COMPANY_NOT_ALLOWED_TO_USE_AHPI } = require('common/Errors');
ReckonError

module.exports = {

    async checkCanBeReckoned(company, forceAhpi) {
        if (company.isMiddleware) throw new ReckonError(COMPANY_IS_MIDDLEWARE);
        if (company.isBlocked) throw new ReckonError(COMPANY_IS_BLOCKED);
        if (!company.usesNewReckon && !forceAhpi) throw new ReckonError(COMPANY_NOT_ALLOWED_TO_USE_AHPI);
    },

    async cantBeReckoned(company, forceAhpi) {
        if (company.isMiddleware) return COMPANY_IS_MIDDLEWARE;
        if (company.isBlocked) return COMPANY_IS_BLOCKED;
        if (!company.usesNewReckon && !forceAhpi) return COMPANY_NOT_ALLOWED_TO_USE_AHPI;
    },

    cantBeReckoned: (company, forceAhpi) =>
        company.isMiddleware
            ? COMPANY_IS_MIDDLEWARE
            : company.isBlocked
                ? COMPANY_IS_BLOCKED
                : !company.usesNewReckon && !forceAhpi
                    ? COMPANY_NOT_ALLOWED_TO_USE_AHPI
                    : '',

    cantBeReckoned: (company, forceAhpi) =>
        company.isMiddleware && COMPANY_IS_MIDDLEWARE
        ?? company.isBlocked && COMPANY_IS_BLOCKED
        ?? !company.usesNewReckon && !forceAhpi && COMPANY_NOT_ALLOWED_TO_USE_AHPI
        ?? '',

};

// getReasonCantBeReckoned
// const reason = cantBeReckoned(company, params.forceAhpi)//if (canBeReckoned() instanceOf error) cleanError(e);
// throwIfCantBeReckoned(company, params.forceAhpi)//if (canBeReckoned() instanceOf error) cleanError(e);
// const validationResult = validate(cantBeReckoned(company, params.forceAhpi)//if (canBeReckoned() instanceOf error) cleanError(e);