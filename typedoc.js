// typedoc.js
module.exports = {
	entryPoints: ["packages/typechain-polkadot/**/*.ts", "packages/typechain-polkadot-parser/**/*.ts"],
	exclude: ["out/**/*.ts", "artifacts/**/*.ts", "tests/**/*.ts"],
};
