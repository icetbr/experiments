var OFF = 0, WARN = 1, ERROR = 2;

module.exports = exports = {
    "env": {
        "es6": true
    },

    "ecmaFeatures": {
        // env=es6 doesn't include modules, which we are using
        "modules": true
    },

    "extends": "eslint:recommended",

    "rules": {
        "prefer-destructuring": ["error", {
            "array": true,
            "object": true
        }, {
                "enforceForRenamedProperties": false
            }]
    }
};
