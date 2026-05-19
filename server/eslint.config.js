import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		files: ['**/*.ts'],
		languageOptions: {
			ecmaVersion: 'latest',
			globals: globals.node,
            parser: tseslint.parser,
            parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		plugins: {
			prettier: prettierPlugin,
		},
		rules: {
			'no-unused-vars': ['error', { argsIgnorePattern: '^_$' }],
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
			indent: ['error', 'tab', { 'SwitchCase': 1 }],
			curly: ['error', 'all'],
			'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
			'arrow-spacing': ['warn', { before: true, after: true }],
			'comma-spacing': 'error',
			'comma-style': 'error',
			'keyword-spacing': 'error',
			'max-nested-callbacks': ['error', { max: 4 }],
			'no-empty-function': 'error',
			'no-floating-decimal': 'error',
			'no-inline-comments': 'error',
			'no-lonely-if': 'error',
			'no-multi-spaces': 'error',
			'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 0 }],
			'no-var': 'error',
			'no-trailing-spaces': ['error'],
			'object-curly-spacing': ['error', 'always'],
			'prefer-const': 'error',
			'space-before-blocks': 'error',
			'space-before-function-paren': [
				'error',
				{
					anonymous: 'never',
					named: 'never',
					asyncArrow: 'always',
				},
			],
			'space-in-parens': 'error',
			'space-infix-ops': 'error',
			'space-unary-ops': 'error',
			'spaced-comment': 'error',
			yoda: 'error',
		},
	},
);