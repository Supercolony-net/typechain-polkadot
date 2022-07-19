module.exports = {

	parser: "@typescript-eslint/parser",
	plugins: [
		"node",
		"import",
		// "unused-imports",
		"@typescript-eslint"
	],
	settings: {
		// "import/extensions": [".ts", ".tsx"],
		"import/parsers": {
			"@typescript-eslint/parser": [ ".ts", ],
		},
		"import/resolver": {
			"typescript": { },
		},
	},
	rules: {
		"prettier/prettier": "off",
		//// [native]
		"indent": [ "error", "tab", { "SwitchCase": 1 } ],
		"semi": "warn",
		"no-trailing-spaces": "error",
		"comma-dangle": ["warn", {
			// "arrays": "always-multiline",
			"arrays": "ignore",
			"objects": "always-multiline",
			"imports": "always-multiline",
			"exports": "always-multiline",
			"functions": "ignore",
		}],
		"prefer-const": "warn",
		/*
		"node/no-missing-import": [
			"error", {
				resolvePaths
				tryExtensions: [ ".js", ".ts", ".json", ]
			}
		],
		*/
		//// [eslint-plugin-import]
		"import/no-cycle": "error",
		"import/no-self-import": "error",
		//// [eslint-plugin-unused-imports] // Unused imports might have side effects
		// "unused-imports/no-unused-imports": "error",
		//// [@typescript-eslint]
		"@typescript-eslint/consistent-type-assertions": [
			"warn",
			{ assertionStyle: "never" }
		],
		"@typescript-eslint/no-non-null-assertion": "warn",
		// "@typescript-eslint/consistent-type-imports": "error",
	},

};