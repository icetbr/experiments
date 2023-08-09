module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true
	},
	extends: [
		'xo',
		'plugin:import/recommended'
	],
	parserOptions: {
		ecmaVersion: 12
	},
	rules: {
		'import/no-namespace': [2]
	}
};

