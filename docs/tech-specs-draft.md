TypeChain-Polkadot Technical Specification
==========================================

For the initial W3F Grant Proposal.


## Set-up

In your project install this package like so:

```bash
npm i -D @supercolony-net/typechain-polkadot
```

Now you can use it to generate TS definitions & runtime code for your ABIs.

> **(!)** Currently, only ABIs of version 3 (i.e. have `V3` property) are supported.

Given, that you've put input files in `path/to/input` folder, and want generated code to land in `path/to/output` folder, run the following command:

```bash
npx @supercolony-net/typechain-polkadot --in path/to/input --out path/to/output
```

> **(i)** Both generated code and ABI files are meant to stay in your source code and be committed. You have a full ownership of the generated code and can use however you like. Though, we will provide examples further.

<!--
Mind you, that generated runtime code is reliant on [@supercolony-net/polkadot-ts-sdk](https://github.com/Supercolony-net/polkadot-ts-sdk) library - a Polkadot TS SDK by [SUPER:COLONY](https://supercolony.net). Thus, you should be using it in your project (have it in dependencies).
-->

--------
## Input

Input folder `path/to/input` should contain `{contract name}.contract` and/or `{contract name}.json` files.

When your contract is represented by a `{contract name}.contract` file, generated code will also have means to deploy such contract to blockchain. E.g. corresponding class will have a static namespace `Contract.constructors` available.


---------
## Output

<!--
(do) Provide description of the output folders structure
-->

For each given contract (e.g. ABI in `path/to/input/{contract name}.json`), a class is generated and put in `path/to/output/contracts/{contract name}.ts` file. Instance of this class will provide an access point to the contract methods, which already have type definitions for arguments, call options, return values etc.


### Methods Nameing

<!--
Some contract methods have a trait specified in their original full name (i.e. come in a format `MethodTraitName::method_tail_name`). Methods naming in generated code is done in either 'original-first' or in 'tail-first' manner.

Original-first means that methods are available by their original names. When possible (no overlap with other method's name), their camelCased tail name (i.e. `methodTailName`) will also be available.

Tail-first means that methods are primarily available by their camelCased tail name (i.e. `methodTailName`), when it doesn't overlap with other methods' names. Otherwise, original name is used.
-->

Some contract methods have a trait specified in their original full name (i.e. come in a format `MethodTraitName::method_tail_name`). Generated code's methods' names come primarily as camelCased `method_tail_name` (`methodTailName`). In a case of transformed names overlap, their original name is used.


<!-- ### With native Polkadot -->
### Namespaces

The contract instance contains several namespaces that can be useful in different cases:

- `query` namespace - Contains both read-only & mutating methods but treats them all as RPC calls.

```typescript
const {
	value, // Typed result value
	gasConsumed // : bigint
} = await conrtact.query.methodName(
	arg1, ..., argN, // Typed arguments
	options // : CallOptions
);
```

- `buildExtrinsic` namespace - These methods build `SubmittableExtrinsic` objects (i.e. what is natively done via `ContractPromise.tx` in [polkadot{.js}](https://polkadot.js.org/docs/api-contract/start/contract.tx)).

```typescript
const submittableExtrinsic = conrtact.query.buildExtrinsic(arg1, ..., argN, options);
```

- `tx` namespace - For signing & sending transactions at once.

```typescript
const successResponse = await conrtact.tx.methodName(arg1, ..., argN, options);
```

<!--
- `methods` namespace - These methods are mixed. They work like `contract.query` for non-mutating blockchain methods and like `contract.tx` for the mutating ones. Type definitions will reflect that. Both mutating & non-mutating methods are available.
-->

- `methods` namespace - Behaves according to description in ABI: RPC calls for read-only methods and transactions for the mutating ones. Type definitions will reflect that.

```typescript
const { value, gasConsumed } = await conrtact.methods.readOnlyMethod(arg1, ..., argN, options);

const successResponse = await conrtact.methods.mutatingMethod(arg1, ..., argN, options);
```


### Generated Code

For an example of how generated code might look, please, refer to the [Generated Code Draft](#generated-code-draft) section below.


-----------------
## Usage Examples

<!-- ### WITH NATIVE POLKADOT -->

If your project relies on `@polkadot/api` library directly, you would use generated code in a way, described in this section.

Suppose we have an ABI JSON file at `path/to/input/mock_psp22.json`. Then the paths of generated code in the following examples are true for this contract ABI.

Let us first instantiate an access point to all available methods on the contract.

```typescript
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import MockPSP22 from 'path/to/output/contracts/mock_psp22';

declare const apiPromise : ApiPromise;
declare const contractAddress : string;
declare const signer : KeyringPair;

const contract = new MockPSP22(contractAddress, keyringPair, apiPromise);
```

You can see, that ABI itself is not being referred to anymore (its reference is included into generated code). Instantiating of our access point requires:
- an address of the contract on the blockchain
- a `KeyringPair` to be able to sign transactions
- an `ApiPromise`, that has all the connection details

Every method will have an optional option for the last argument of a call. The definition of the option:

```typescript
interface CallOptions {
	gasLimit ? : -1 | string | BN; // defaults to `-1`
	/**
	 * Only required for 'payable' methods
	 */
	value ? : 0 | string; // defaults to `0`
	/**
	 * This flag allows to retreive result value in `TxSuccessResponse.value`, when making transactions.
	 * **(i)** It will be accheived by preamptively querying by the same method with the same given arguments.
	 *
	 * Defaults to:
	 * 	- `false` for `contract.tx`
	 * 	- `true` for `contract.methods`
	 */
	queryValue ? : boolean;
}

declare const options : CallOptions;
```

Transactions' return values will have the following interface:

```typescript
interface TxSuccessResponse<V extends AnyJson = null> {
	from : string;
	txHash : `0x${string}`;
	blockHash ? : `0x${string}`;
	/**
	 * Present only if `CallOptions.queryValue` was set to `true` during the call
	 */
	value ? : V;
}
```


- `contract.query`

Our contract has a method, originally named `PSP22::balance_of`. It is not a 'mutating' method, thus it will not be available for transactions (e.g. in `contract.tx`). It is not a 'payable' method and type definitions will reflect that.

<!--
This method will go by the names:
- `PSP22::balance_of` // Original name, that includes trait
- `balanceOf` // Tail name in camel case. Available, since there is no overlap with other methods' names
-->

Now, let's make a query call to this method:

```typescript
declare const owner : string;

const {
	value, // : number | `0x${string}`
	gasConsumed // : bigint
} = await contract.query.balanceOf(
	owner, // : AcountId
	options // : CallOptions
);
```

Blockchain method arguments go first, last argument is options of our call. You will see this pattern repeat throughout all the calls we make.

Let's make another query call to a 'mutating' & 'payable' method named `WNative::deposit`:

```typescript
declare const payableValue : 0 | string;

const {
	value, // : null // No { ok, err } structure
	gasConsumed // : bigint
} = await contract.query['WNative::deposit']({ // : CallOptions
	value: payableValue, // Required in this case
});
```

Notice, how payable value (and thus options) is required for this 'payable' method.

For 'mutating' methods, returned `value` doesn't have an `{ ok, err }` structure. In this case, `value` is the 'ok' value. In a case, when contract returns 'err' instead of 'ok', an error will be thrown.

Mind you, that runtime success of the call means actual 'success' of it. Any error, happened during the call is thrown and up for catching like so:

```typescript
import type { QueryCallError } from '@supercolony-net/typechain-polkadot';

try {
	const { value, gasConsumed } = await contract.query.balanceOf(owner, { gasLimit });
}
catch(error : QueryCallError) {
	switch(error.issue) { // string literal type
		case 'METHOD_DOESNT_EXIST':
		case 'OUTPUT_IS_NULL':
		// ...
		case 'FAIL_AT_CALL':
		default: console.error(
			error.issue, // string literal type
			error.texts, // : ? string[] // informative array of error descriptions
		);
	}
}
```


- `contract.buildExtrinsic`

Building a `SubmittableExtrinsic` (i.e. what is returned by `ContractPromise.tx`) is done like so:

```typescript
import type { SubmittableExtrinsic } from '@polkadot/api/submittable/types';
import type { ISubmittableResult } from '@polkadot/types/types';

declare const spender : AcountId;
declare const amount : string;

const submittableExtrinsic : SubmittableExtrinsic<
	'promise',
	ISubmittableResult
> = await contract.buildExtrinsic.approve(
	spender, // : AcountId
	amount, // : string
	options // : CallOptions
);
```

Only mutating methods are gonna be available in `contract.buildExtrinsic`. But all these methods can be queried (i.e. available in `contract.query`).


- `contract.tx`

When you need to build a `SubmittableExtrinsic`, sign it and send in one call, you do the following:

```typescript
const successResponse : TxSuccessResponse = await contract.tx.approve( spender, amount, options );
// Returned successResponse here means 'success' for our tx call.
```

The signer of this transaction is going to be the one, that `contract` was instantiated with (`KeyringPair` instance).

<!--
Only mutating methods are gonna be available in `contract.tx`. But all these methods can be queried (i.e. available in `contract.query`).
-->

When you want a method from `contract.tx` to also return a result value in `successResponse.value`, you have to pass `options.queryValue = true` flag in the options of the call. **(i)** It will be accheived by preamptively querying by the same method with the same given arguments.


- `contract.methods`

If you only need to make 'query' calls to the non-mutating methods and 'tx' calls to the mutating ones, then your case is covered by a single namespace - `contract.methods`.

```typescript
// QUERY
const { value, gasConsumed } = await contract.methods.balanceOf( owner, options );

// TX
const successResponse : TxSuccessResponse<null> = await contract.methods.approve( spender, amount, options );
```

The difference here is that `queryValue` flag in mutating methods' options defaults to `true`.


### Contract Deployment

Let's say, instead of ABI JSON you have `path/to/input/mock_psp22.contract` file. Then, PSP22 contract class will also have means for deployment:

```typescript
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import MockPSP22 from 'path/to/output/contracts/mock_psp22';

declare const apiPromise : ApiPromise;
declare const deployer : KeyringPair;

const contractAddress = await MockPSP22.constructors.new(
	apiPromise,
	deployer,
	args : [
		name : string,
		symbol : string,
		decimal : number
	],
);
```

Notice, how boilerplate of providing ABI and a code hash is eliminated here. They are already included into the generated code.


<!--
### WITH POLKADOT-TS-SDK

You might be using [@supercolony-net/polkadot-ts-sdk](https://github.com/Supercolony-net/polkadot-ts-sdk) library - a Polkadot TS SDK by [SUPER:COLONY](https://supercolony.net).
In this case, the following use-case will suit you better.

Instantiation of the access point will differ like so:

```typescript
import * as SDK from '@supercolony-net/polkadot-ts-sdk';
import MockPSP22 from 'path/to/output/with-sdk/contracts/mock_psp22';

declare const provider : SDK.Provider;
declare const contractAddress : string;
declare const signer : SDK.Signer;

const contract = new MockPSP22(contractAddress, signer, provider);
```

Query calls and transactions are done in the same way as with native API (shown in examples above).


## POPULATE-TRANSACTION

If you are familiar with `Contract.populateTransaction` functionality of `@ethersproject` library, you might be in a need of the following too:

```typescript
const deferrableTxRequest = contract.populateTransaction['PSP22::approve'](spender, value, { gasLimit });
```

Return value `deferrableTxRequest` is of type `DeferrableTransactionRequest`, and is defined in [@supercolony-net/polkadot-ts-sdk](https://github.com/Supercolony-net/polkadot-ts-sdk).
-->


<!--
## MORE EXAMPLES

> For more examples in TypeScript, please, refer to this repo: https://github.com/Supercolony-net/typechain-polkadot_example
-->


-----------------------
## Generated Code Draft

For a given `path/to/input/mock_psp22.contract` file we receive a class, defined like so:

```typescript
/* path/to/output/contracts/mock_psp22.ts */

import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import { ContractPromise } from '@polkadot/api-contract';
import QueryMethods from '../query/mock_psp22';
import TxMethods from '../tx/mock_psp22';
import MixedMethods from '../mixed-methods/mock_psp22';
import BuildExtrinsicMethods from '../build-extrinsic/mock_psp22';
import ABI from 'path/to/input/mock_psp22.(json|contract)'; // Pseudo import


export default class Contract {
	/**
	 * Absent, if contract source code is unavailable
	 */
	static readonly constructors = {
		async new(
			nativeAPI : ApiPromise,
			deployer : KeyringPair,
			args : [ /* constructor arguments types go here */ ],
		) : Promise<string> {
			// implementation goes here
		},
	} as const;

	readonly query : QueryMethods;
	readonly buildExtrinsic : BuildExtrinsicMethods;
	readonly tx : TxMethods;
	readonly methods : MixedMethods;

	constructor(
		address : string,
		signer : KeyringPair,
		nativeAPI : ApiPromise,
	) {
		const nativeContract = new ContractPromise(nativeAPI, ABI, address);
		this.query = new QueryMethods(nativeContract, signer.address);
		this.buildExtrinsic = new BuildExtrinsicMethods(nativeContract);
		this.tx = new TxMethods(nativeContract, signer);
		this.methods = new MixedMethods(nativeContract, signer);
	}
}
```

```typescript
type AcountId = string;

/**
 * Return structure of the query successful response
 */
interface QueryReturnType<T>{
	value : T;
	gasConsumed : bigint;
}

interface CallOptions {
	gasLimit ? : -1 | string | BN; // defaults to `-1`
	/**
	 * Only required for 'payable' methods
	 */
	value ? : 0 | string; // defaults to `0`
	/**
	 * This flag allows to retreive result value in `TxSuccessResponse.value`, when making transactions.
	 * **(i)** It will be accheived by preamptively querying by the same method with the same given arguments.
	 *
	 * Defaults to:
	 * 	- `false` for `contract.tx`
	 * 	- `true` for `contract.methods`
	 */
	queryValue ? : boolean;
}
interface CallOptionsWithRequiredValue extends CallOptions {
	value : 0 | string; // defaults to `0`
}

/**
 * Return structure of the transaction successful response
 */
interface TxSuccessResponse<V extends AnyJson = null> {
	from : string;
	txHash : `0x${string}`;
	blockHash ? : `0x${string}`;
	/**
	 * Present only if `CallOptions.queryValue` was set to `true` during the call
	 */
	value ? : V;
}
```

```typescript
/* path/to/output/query/mock_psp22.ts */

import type { ContractPromise } from '@polkadot/api-contract';
import type ArgumentsTypes from '../arguments-types/mock_psp22';
import type OkReturnTypes from '../ok-return-types/mock_psp22';


export default class QueryMethods {
	private __nativeContract : ContractPromise;
	private __callerAddress : string;

	constructor(
		nativeContract : ContractPromise,
		callerAddress : string,
	) {
		this.__nativeContract = nativeContract;
		this.__callerAddress = callerAddress;
	}

	/** Original name: "PSP22::balance_of" */
	balanceOf(
		owner : ArgumentsTypes['2'],
		options ? : CallOptions,
	) : Promise< QueryReturnType< OkReturnTypes['0'] > > { /* implementation */ }
	/** Original name: "WNative::deposit" */
	deposit(
		options ? : CallOptions,
	) : Promise< QueryReturnType< OkReturnTypes['11'] > > { /* implementation */ }
	/** Original name: "PSP22::approve" */
	approve(
		spender : ArgumentsTypes['2'],
		value : ArgumentsTypes['0'],
		options ? : CallOptions,
	) : Promise< QueryReturnType< OkReturnTypes['11'] > > { /* implementation */ }
}
```

```typescript
/* path/to/output/tx/mock_psp22.ts */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type ArgumentsTypes from '../arguments-types/mock_psp22';
import type OkReturnTypes from '../ok-return-types/mock_psp22';


export default class TxMethods {
	private __nativeContract : ContractPromise;
	private __signer : KeyringPair;

	constructor(
		nativeContract : ContractPromise,
		signer : KeyringPair,
	) {
		this.__nativeContract = nativeContract;
		this.__signer = signer;
	}

	/** Original name: "PSP22::balance_of" */
	balanceOf(
		owner : ArgumentsTypes['2'],
		options ? : CallOptions,
	) : Promise< TxSuccessResponse< OkReturnTypes['0'] > > { /* implementation */ }
	/** Original name: "WNative::deposit" */
	deposit(
		options ? : CallOptions,
	) : Promise< TxSuccessResponse< OkReturnTypes['11'] > > { /* implementation */ }
	/** Original name: "PSP22::approve" */
	approve(
		spender : ArgumentsTypes['2'],
		value : ArgumentsTypes['0'],
		options ? : CallOptions,
	) : Promise< TxSuccessResponse< OkReturnTypes['11'] > > { /* implementation */ }
}
```

```typescript
/* path/to/output/mixed-methods/mock_psp22.ts */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type ArgumentsTypes from '../arguments-types/mock_psp22';
import type OkReturnTypes from '../ok-return-types/mock_psp22';


export default class MixedMethods {
	private __nativeContract : ContractPromise;
	private __signer : KeyringPair;

	constructor(
		nativeContract : ContractPromise,
		signer : KeyringPair,
	) {
		this.__nativeContract = nativeContract;
		this.__signer = signer;
	}

	/** Original name: "PSP22::balance_of" */
	balanceOf(
		owner : ArgumentsTypes['2'],
		options ? : CallOptions,
	) : Promise< QueryReturnType< OkReturnTypes['0'] > > { /* implementation */ }
	/** Original name: "WNative::deposit" */
	deposit(
		options : CallOptionsWithRequiredValue,
	) : Promise< TxSuccessResponse< OkReturnTypes['11'] > > { /* implementation */ }
	/** Original name: "PSP22::approve" */
	approve(
		spender : ArgumentsTypes['2'],
		value : ArgumentsTypes['0'],
		options ? : CallOptions,
	) : Promise< TxSuccessResponse< OkReturnTypes['11'] > > { /* implementation */ }
}
```

```typescript
/* path/to/output/arguments-types/mock_psp22.ts */

import type BN from 'bn.js';

export default interface ArgumentsTypes {
	'0' : string | bigint | number | BN;
	// ...
	'2' : AcountId;
}
```

```typescript
/* path/to/output/ok-return-types/mock_psp22.ts */

export default interface OkReturnTypes {
	/** Direct type */
	'0' : `0x${string}` | number;
	// ...
	/** Type of 'ok' value from { ok, err } structure */
	'11' : null;
}
```