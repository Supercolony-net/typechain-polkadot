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
			"warn",
			{ assertionStyle: "never" }
		],
		"@typescript-eslint/no-non-null-assertion": "warn",
	},
};