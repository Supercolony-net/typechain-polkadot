Typechain-Polkadot Documentation
==========================================

## Packages of Typechain-Polkadot

Typechain Polkadot has 4 main packages:
- `typechain-polkadot` - main package, which contains all logic for generating interfaces for contracts
- `typechain-polkadot-parser` - package for parsing types of contracts received from metadata
- `typechain-compiler` - package that allows you to run typechain easily on the big projects, it automatically compiles all contracts and generates typechain-code for them.
- `typechain-types` - package that contains types for typechain-polkadot, that are used in generated code.

---

## How to use Typechain-Polkadot

If you want to use Typechain-Polkadot, you have few options:
- You can use `typechain-compiler` package, which allows you to run typechain easily on the big projects, it automatically compiles all contracts and generates typechain-code for them.
- You can use `typechain-polkadot` package, which contains all logic for generating interfaces for contracts. You can use it as a library or as a CLI tool.

### Typechain-Compiler case

As was mentioned above, `typechain-compiler` package allows you to run typechain easily on the big projects, it automatically compiles all contracts and generates typechain-code for them.
So let's create a simple project, which will contain 2 contracts, and we will use `typechain-compiler` to generate typechain-code for them.

1) First of all, let's create a project:
```bash
$ mkdir typechain-compiler-example
$ cd typechain-compiler-example
$ npm init -y
```

And add typescript config:
`tsconfig.json`
```json
{
  "compilerOptions": {
	"target": "es2016",
	"module": "commonjs",
	"resolveJsonModule": true,
	"esModuleInterop": true,
	"forceConsistentCasingInFileNames": true,
	"strict": true,
	"skipLibCheck": true
  }
}
```

2) Now, let's create directory for contracts:
```bash
$ mkdir contracts
```

3) Let's create 2 contracts, which will be used in our example:
```bash
$ cd contracts
$ cargo contract new flipper
$ cargo contract new psp22
```
4) Let's let flipper be flipper, and add some code to psp22. For this, let's copy code from openbrush wizard:

```toml
# psp22/Cargo.toml
[package]
name = "my_psp22"
version = "1.0.0"
edition = "2021"
authors = ["The best developer ever"]

[dependencies]

ink = { git = "https://github.com/paritytech/ink", rev = "4655a8b4413cb50cbc38d1b7c173ad426ab06cde", default-features = false }

scale = { package = "parity-scale-codec", version = "3", default-features = false, features = ["derive"] }
scale-info = { version = "2.3", default-features = false, features = ["derive"], optional = true }

# Include brush as a dependency and enable default implementation for PSP22 via brush feature
openbrush = { tag = "3.0.0-beta", git = "https://github.com/727-Ventures/openbrush-contracts", default-features = false, features = ["psp22"] }

[lib]
name = "my_psp22"
path = "lib.rs"
crate-type = [
    # Used for normal contract Wasm blobs.
    "cdylib",
]

[features]
default = ["std"]
std = [
    "ink/std",
    "scale/std",
    "scale-info/std",

    "openbrush/std",
]
ink-as-dependency = []
```

```rust
// psp22/lib.rs
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

Alright, now we have 2 contracts, let's create a file, which will contain our configuration for `typechain-compiler`:
> You should be on the root of your project
```bash
$ touch typechain.config.json
```

5) Let's add some configuration to our `typechain.config.json`:
```json
{
  "projectFiles": ["./contracts/**"],
  "artifactsPath": "./artifacts",
  "typechainGeneratedPath": "./typechain-generated"
}
```
To dive deeper into configuration, you can check [typechain-compiler documentation](../packages/typechain-compiler/README.md)

6) And now, let's install `typechain-compiler`. Also we will need to have `@polkadot/api`, `@polkadot/api-contract` and some other packages installed:
Add the following to your `package.json`:
```json
"dependencies": {
	"@727-ventures/typechain-compiler": "^0.5.16",
	"@727-ventures/typechain-types": "^0.0.22",
	"@types/node": "^17.0.34",
	"ts-node": "^10.7.0",
	"typescript": "^4.6.4",
	"@polkadot/api": "^9.13.4",
	"@polkadot/api-contract": "^9.13.4",
	"@polkadot/keyring": "^10.4.2",
	"@types/bn.js": "^5.1.0"
}
```
And install it with `npm install`.

> If you're still confused, you can check our examples in [examples](../examples) directory

7) Now, let's run `typechain-compiler`:
```bash
$ npx @727-ventures/typechain-compiler --config typechain.config.json
```

8) And now, you can use generated code in your project. For example, you can create a file `index.ts`:
```typescript
// In this example we will deploy & interact with psp22 token to transfer some tokens to the owner and get total supply.
import {ApiPromise, Keyring} from "@polkadot/api";
import Constructors from "./typechain-generated/constructors/my_psp22";
import Contract from "./typechain-generated/contracts/my_psp22";

async function main() {
    // Connect to the local node
	const api = await ApiPromise.create();

	// Create keyring pair for Alice and Bob
	const keyring = new Keyring({type: 'sr25519'});

	const aliceKeyringPair = keyring.addFromUri('//Alice');
    const bobKeyringPair = keyring.addFromUri('//Bob');

    // Create instance of constructors, that will be used to deploy contracts
	// Constructors contains all constructors from the contract
    const constructors = new Constructors(api, aliceKeyringPair);

    // Deploy contract via constructor
	const {address: TOKEN_ADDRESS} = await constructors.new(10000);

	console.log('Contract deployed at:', TOKEN_ADDRESS);

	const contract = new Contract(TOKEN_ADDRESS, aliceKeyringPair, api);

	const totalSupply = await contract.query.totalSupply();
	const balance = await contract.query.balanceOf(aliceKeyringPair.address);

	console.log(`%c Total supply before transfer: ${totalSupply.value.unwrap().toNumber()}`, 'color: green');
	console.log(`%c Balance of Alice before transfer: ${balance.value.unwrap()}`, 'color: green');

	const mintTx = await contract.tx.transfer(bobKeyringPair.address, 1, []);

	const totalSupplyAfterMint = await contract.query.totalSupply();
	const balanceAfterMint = await contract.query.balanceOf(aliceKeyringPair.address);

	console.log(`%c Total supply after transfer: ${totalSupplyAfterMint.value.unwrap().toNumber()}`, 'color: green');
	console.log(`%c Balance of Alice after transfer: ${balanceAfterMint.value.unwrap()}`, 'color: green');

	await api.disconnect();
}

main().then(() => {
	console.log('done');
});
```

9) To interact with our contract, we need to have `substrate-contracts-node` installed and running:
```bash
git clone https://github.com/paritytech/substrate-contracts-node
cd ./substrate-contracts-node
git checkout v0.23.0
cargo +stable build --release
./target/release/substrate-contracts-node --dev --tmp
```

10) And now, you can run it with `ts-node`:
```bash
$ npx ts-node index.ts
```

Whoa! We've just deployed and interacted with our contract! 🎉

> Link to the full example: [typechain-compiler-example](https://github.com/varex83/typechain-compiler-example/tree/main)

### Events

In this section we will handle smart contract events!

1) Let's add `event` to our contract, so the final code will look like this:
```rust
#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[openbrush::contract]
pub mod my_psp22 {

	// imports from openbrush
	use openbrush::contracts::psp22::*;
	use openbrush::traits::{DefaultEnv, Storage};
	use ink::codegen::EmitEvent;

	#[ink(storage)]
	#[derive(Default, Storage)]
	pub struct Contract {
		#[storage_field]
		psp22: psp22::Data,
	}

	#[ink(event)]
	pub struct TransferEvent {
		#[ink(topic)]
		from: Option<AccountId>,
		#[ink(topic)]
		to: Option<AccountId>,
		value: Balance,
	}

	// Section contains default implementation without any modifications
	impl PSP22 for Contract {}

	impl Transfer for Contract {
		fn _after_token_transfer(&mut self, _from: Option<&AccountId>, _to: Option<&AccountId>, _amount: &Balance) -> Result<(), PSP22Error> {
			Self::env().emit_event(TransferEvent { from: _from.copied(), to: _to.copied(), value: *_amount });
			Ok(())
		}
	}

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

2) And now, let's run `typechain-compiler` in the root of our project:
```bash
$ npx @727-Ventures/typechain-compiler --config typechain.config.json
```

3) And now, let's add subscription to the events, so the final code will look like this:
```typescript
// index.ts
// In this example we will deploy & interact with psp22 token to mint some tokens to the owner and get total supply.
import {ApiPromise, Keyring} from "@polkadot/api";
import Constructors from "./typechain-generated/constructors/my_psp22";
import Contract from "./typechain-generated/contracts/my_psp22";

async function main() {
	const api = await ApiPromise.create();

	const keyring = new Keyring({type: 'sr25519'});

	const aliceKeyringPair = keyring.addFromUri('//Alice');
	const bobKeyringPair = keyring.addFromUri('//Bob');

	const constructors = new Constructors(api, aliceKeyringPair);

	const {address: TOKEN_ADDRESS} = await constructors.new(10000);

	console.log('Contract deployed at:', TOKEN_ADDRESS);

	const contract = new Contract(TOKEN_ADDRESS, aliceKeyringPair, api);

	const totalSupply = await contract.query.totalSupply();
	const balance = await contract.query.balanceOf(aliceKeyringPair.address);

	console.log(`%c Total supply before transfer: ${totalSupply.value.unwrap().toNumber()}`, 'color: green');
	console.log(`%c Balance of Alice before transfer: ${balance.value.unwrap()}`, 'color: green');

	contract.events.subscribeOnTransferEventEvent((event) => {
		console.log('Transfer event received:', event);
	});

	const mintTx = await contract.tx.transfer(bobKeyringPair.address, 1, []);

	const totalSupplyAfterMint = await contract.query.totalSupply();
	const balanceAfterMint = await contract.query.balanceOf(aliceKeyringPair.address);

	console.log(`%c Total supply after transfer: ${totalSupplyAfterMint.value.unwrap().toNumber()}`, 'color: green');
	console.log(`%c Balance of Alice after transfer: ${balanceAfterMint.value.unwrap()}`, 'color: green');

	await api.disconnect();
}

main().then(() => {
	console.log('done');
});
```

4) And now, let's run it:
```bash
$ npx ts-node index.ts
```

And you should see something like this:
```bash
Contract deployed at: 5Cc95McifGEqPsc9kfBNvWgAkDZeZ2BkQ5BCBXkHXmsNYavM
 Total supply before transfer: 10000
 Balance of Alice before transfer: 10000
Transfer event received: {
  from: null,
  to: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  value: ReturnNumber { rawNumber: <BN: 2710> }
}
Transfer event received: {
  from: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  to: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
  value: ReturnNumber { rawNumber: <BN: 1> }
}
 Total supply after transfer: 10000
 Balance of Alice after transfer: 9999
done
```
Wow, we have successfully subscribed to events and got them!

## How to use it directly via `typechain-polkadot`?
Let's use previous example, but instead of using `typechain-compiler`, we will use `typechain-polkadot` directly.

1) We need to compile our contracts:
```bash
cd ./contracts/psp22
cargo contract build
cd ../flipper
cargo contract build
```

2) And now, let's install `typechain-polkadot`:
```bash
$ npm install @727-ventures/typechain-polkadot
```

3) Let's create a directory with artifacts:
```bash
$ mkdir artifacts
```

4) And now, let's copy our artifacts to the `artifacts` directory:
```bash
$ cp ./contracts/psp22/target/ink/psp22.contract artifacts
$ cp ./contracts/flipper/target/ink/flipper.contract artifacts
```
And metadata, but you should rename `metadata.json` to `<contract-name>.json`:
```bash
$ cp ./contracts/flipper/target/ink/metadata.json artifacts/flipper.json
$ cp ./contracts/psp22/target/ink/metadata.json artifacts/psp22.json
```

5) Let's run `typechain-polkadot`:
```bash
$ npx @727-ventures/typechain-polkadot --in ./artifacts --out ./typechain-generated
```

Wow! We've just generated code for our contracts using typechain directly! 🎉

> For more information about `typechain-polkadot` you can check [typechain-polkadot documentation](../packages/typechain-polkadot/README.md)