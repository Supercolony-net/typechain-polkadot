# Contract

### About

Contract is the main namespace for interacting with contracts. It contains all the functions that are related to contracts.
It has all plugins (or default plugins) as namespaces.



### How to use

```typescript
const contract = new Contract(
		address,
		signer,
		nativeAPI,
)

contract.name() // get the name of the contract

contract.address() // get the address of the contract

contract.abi() // get the abi of the contract

contract.<pluginName>.<functionName>(...args, options) // call a function from a plugin

contract.withSigner(signer)
// change the signer of the contract in the current context,
// basically it will create a new contract with the new signer

contract.withAddress(address)
// change the address of the contract in the current context,
// basically it will create a new contract with the new address
// useful for proxy contracts

contract.withAPI(api)
// change the api of the contract in the current context
// basically it will create a new contract with the new api

```
