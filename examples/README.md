# Examples

This directory contains examples of parsed contracts and pieces of advice how to use the typechain-polkadot in your project.

### General usage
- Create a new project with `npm init`
- Create a new directory for your contracts' abi's (for example /artifacts)
- Add to your package.json file the following and install it with `npm i`:
```json
"dependencies": {
  "@727-ventures/typechain-polkadot": "0.1.1",
  "@types/node": "^17.0.34",
  "ts-node": "^10.7.0",
  "typescript": "^4.6.4",
  "@polkadot/api": "^9.6.2",
  "@polkadot/api-contract": "^9.6.2",
  "@polkadot/keyring": "^9.3.1",
  "@types/bn.js": "^5.1.0"
}
```
- Run typechain with
```bash
npx typechain-polkadot --in artifacts --out out
```
or if you not installed typechain
```bash
npx @727-ventures/typechain-polkadot --in artifacts --out out
```