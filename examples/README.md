# Examples

This directory contains examples of parsed contracts and pieces of advice how to use the typechain-polkadot in your project.

### General usage

- Create a new project with `npm init`
- Create a new directory for your contracts' abi's (for example /artifacts)
- Add .npmrc file to your project directory that will contain following:
```npmrc
@supercolony-net:registry=https://npm.pkg.github.com/

engine-strict=true
```
- Add to your package.json file the following or install it with `npm i ...`:
```json
"dependencies": {
  "@supercolony-net/typechain-polkadot-dev": "0.0.4",
  "@types/node": "^17.0.34",
  "ts-node": "^10.7.0",
  "typescript": "^4.6.4"
  "@polkadot/api": "^8.6.2",
  "@polkadot/api-contract": "^8.6.2",
  "@polkadot/keyring": "^9.3.1",
  "@types/bn.js": "^5.1.0",
}
```
- Run typechain with
```bash
npx typechain-polkadot-dev --in artifacts --out out
```