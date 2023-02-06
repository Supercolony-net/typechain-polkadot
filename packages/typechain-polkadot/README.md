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
Used to deploy contracts, using different constructors.

Let's deploy the following contract:
```rust
#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[openbrush::contract]
pub mod my_psp22 {

    // imports from openbrush
	use openbrush::contracts::psp22::*;
	use openbrush::traits::Storage;

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct Contract {
    	#[storage_field]
		psp22: psp22::Data,
    }

    // Section contains default implementation without any modifications
	impl PSP22 for Contract {}

    impl Contract {
        #[ink(constructor)]
        pub fn new(initial_supply: Balance) -> Self {
            let mut _instance = Self::default();
			_instance._mint_to(_instance.env().caller(), initial_supply).expect("Should mint");
			_instance
        }
    }
}
```
This contract has a constructor `new` with one argument `initial_supply`.
To deploy this contract, you need to use the following code:
```typescript
// Import here Constructors and Contract classes

// Here we are creating an instance of the Constructors class, which is used to deploy contracts,
// Constructors is typechain-generated class that contains all the constructors of the contract
const factory = new Constructors(api, UserAlice);

// You can access to the different constructors using the name of the constructor, here we will use "new"
const {result, address} = await factory.new('10', {});

// Here we are creating an instance of the Contract class, which is used to interact with the deployed contract
contract = new Contract(address, UserAlice, api);
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

### mixed-methods
This namespace contains both tx and query methods.

```typescript
contract.mixedMethods.<functionName>(...args, options)
```

### query
This namepsace contains all query methods

```typescript
const result = contract.query.<functionName>(...args, options)

console.log(result.value)
```

You can also use it to get errors from contracts

```typescript
try {
	await contract.withSigner(UserBob).query.transfer(UserAlice.address, '10', []);
} catch ({ _err }) {
	console.log(_err);
}
```
```bash
console.log
	{ insufficientBalance: null }
```

### tx-sign-and-send

This namespace is used send transactions.

```typescript
const result = await contract.tx.<functionName>(...args, options)
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

## Plugins

Typechain-polkadot uses plugins to generate code. By default, it uses the following plugins:

- build-extrinsic [docs](./docs/build-extrinsic.md)
- constructors [docs](./docs/constructors.md)
- contract [docs](./docs/contract.md)
- data [docs](./docs/data.md)
- events [docs](./docs/events.md)
- events-types [docs](./docs/events-types.md)
- mixed-methods [docs](./docs/mixed-methods.md)
- query [docs](./docs/query.md)
- tx-sign-and-send [docs](./docs/tx-sign-and-send.md)



You can also create your own plugins. To do this, you need to create a class that implements the `TypechainPlugin` interface:

```typescript
import {TypechainPlugin} from '@727-ventures/typechain-polkadot/src/types/interfaces';

export class MyPlugin implements TypechainPlugin {
  constructor() {}

  name: string = 'my-plugin';
  outputDir: string = 'my-plugin';

  generate: (
  	abi: Abi,
	fileName: string,
	absPathToABIs: string,
	absPathToOutput: string
  ): void {
      // generate code
  }

  beforeRun ?: (
      absPathToABIs: string,
	  absPathToOutput: string
  ) => void {
      // do something before run
  }
}
```

Then you need to add your plugin to the list of plugins:

```typescript
typechain.loadPlugins(new MyPlugin());
```

Or you can load them via cli:

```bash
npx @727-ventures/typechain-polkadot --input path/to/abis --output path/to/output --plugins ./plugins-directory
```

Also you can use `loadPluginsFromFiles` method to load plugins from files:

```typescript
typechain.loadPluginsFromFiles(
	'./plugins'
)
```

