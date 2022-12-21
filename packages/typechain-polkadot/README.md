# Typechain-polkadot

---

Package for generating TypeScript definitions & runtime code for Polkadot smart contracts.

---

## Usage

In your project install this package:

```bash
npm i -D @727-ventures/typechain-polkadot
```

Now you can use it to generate TS definitions & runtime code for Polkadot smart contracts. To use typechain-polkadot.

> Note, that ink! contracts generate two files: `metadata.json` and `<contract-name>.contract`. You need to provide both of them to typechain-polkadot, and rename `metadata.json` to `<contract-name>.json`.

Typechain can be used in two ways:

- As a CLI tool
- As a library

### CLI tool

After installing the package, you can use it as a CLI tool. To use it, run the following command:

```bash
npx @727-ventures/typechain-polkadot --input path/to/abis --output path/to/output
```

### Library

You can also use typechain-polkadot as a library. To use it, you need to import it in your code:

```typescript
import {Typechain} from '@727-ventures/typechain-polkadot/src/types/typechain';
import {testPathPatternToRegExp} from "jest-util";

const typechain = new Typechain();

typechain.loadDefaultPlugins();

typecchain.run(
	pathToInput,
	pathToOutput
)
```

## Methods and namespaces used in the typechain, and their description

### build-extrinsic

In this namespace you can find all the functions that are related to building extrinsics.

```typescript
const tx = contract.buildExtrinsic.<methodName>(...args, options);

tx.signAndSend(account, (result) => {
	// Handle result
});
```

### constructors
This namespace is used to deploy contracts, using different constructors.

```typescript
const { result, address } = await contract.constructors.<constructorName>(...args, options);
```

### contract

Contract is the main namespace for interacting with contracts. It contains all the functions that are related to contracts.

```typescript
const contract = new Contract(
		address,
		signer,
		nativeAPI,
)

contract.name() // get the name of the contract

contract.address() // get the address of the contract

contract.abi() // get the abi of the contract

contract.<namespace>.<functionName>(...args, options) // call a function from a namespace
// namespace can be tx, query, events, etc.

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

### data
Utility file. Contains all info about types. It's used in runtime to parse return values from contracts.

### events
This namespace is used to subscribe to events from contracts.

```typescript
contract.events.subscribeOnTransferEvent((event) => {
	// Event callback function
});
```

### events-types
This file contains all event types, which are used in the events namespace.

### mixed-methods
This namespace contains both tx and query methods.

```typescript
contract.mixedMethods.<functionName>(...args, options)
```

### query
This namepsace contains all query methods.

```typescript
const result = contract.query.<functionName>(...args, options)

console.log(result.value)
```

### tx-sign-and-send

This namespace is used send transactions.

```typescript
const result = await contract.tx.<functionName>(...args, options)
```