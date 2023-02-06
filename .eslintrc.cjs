module.exports = {
	parser: "@typescript-eslint/parser",
	plugins: [
		"node",
		"import",
		"@typescript-eslint"
	],
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [ ".ts", ],
		},
		"import/resolver": {
			"typescript": { },
		},
	},
	"ignorePatterns": [
		"node_modules/",
		"dist/",
		"generated/",
		"out/",
	],
	rules: {
		"prettier/prettier": "off",
		"indent": [ "error", "tab", { "SwitchCase": 1 } ],
		"semi": "warn",
		"comma-dangle": ["warn", {
			"arrays": "ignore",
			"objects": "always-multiline",
			"imports": "always-multiline",
			"exports": "always-multiline",
			"functions": "ignore",
		}],
		"prefer-const": "warn",
		"import/no-cycle": "error",
		"import/no-self-import": "error",
		"@typescript-eslint/consistent-type-assertions": [
			"off",
		],
		"@typescript-eslint/no-non-null-assertion": "off",
	},
};