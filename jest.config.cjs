const { pathsToModuleNameMapper } = require('ts-jest');
const path = require('path');
const fs = require('fs');
const Hjson = require('hjson');

const tsconfigStr = fs.readFileSync(
	path.resolve(__dirname, './tests/tsconfig.json'),
	'utf8',
);

const tsconfig = Hjson.parse(tsconfigStr);

const moduleNameMapper = pathsToModuleNameMapper(
	tsconfig.compilerOptions.paths || {},
	{ prefix: '<rootDir>/' }
);

module.exports = {
	preset: 'ts-jest',
	testEnvironment: "node",
	testMatch: [
		"**/tests/**/*.test.ts",
	],
	moduleNameMapper: moduleNameMapper,
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tests/tsconfig.json',
		},
	},
};