import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'prettier'),
	...compat.plugins('prettier'),
	{
		rules: {
			'prettier/prettier': 'error',
			'react/no-unescaped-entities': 'off',
			'react/prop-types': 'off',
			'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'prefer-const': 'error',
			'no-var': 'error',
		},
		languageOptions: {
			globals: {
				// Browser globals
				window: 'readonly',
				document: 'readonly',
				navigator: 'readonly',
				console: 'readonly',
				// Node.js globals
				process: 'readonly',
				Buffer: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
				global: 'readonly',
				module: 'readonly',
				require: 'readonly',
				exports: 'readonly',
				// ES6+ globals
				Promise: 'readonly',
				Set: 'readonly',
				Map: 'readonly',
				Symbol: 'readonly',
				WeakMap: 'readonly',
				WeakSet: 'readonly',
				Proxy: 'readonly',
				Reflect: 'readonly',
			},
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
	},
]

export default eslintConfig
