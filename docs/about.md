*Typechain-Polkadot*
====================


## Case

When a smart contract is being written, front-end developer receives file representation of it in the format called Application Binary Interface (ABI). One ABI per each contract, new ABI for every update of a contract.

Information about how to interact with a contract (methods names, arguments & returns types etc.) is included in this ABI file. It is not human-readable enough, so extraction of that information becomes a challenge. Guessing is not an option and we need to have correct type definitions for each contract in TypeScript. They can be generated automatically by a script, taking a list of ABIs as an input, giving usable TS type definitions and even runtime code as its output.

Given, that a front-end developer needs to do this with every contracts update, such tool would save a lot of time and prevent mistakes of misusing smart contracts.


---------
## Set-up

In your project install this package like so:

```bash
yarn add @supercolony/typechain-polkadot
```

Now you can use it to generate TS definitions & runtime code for your ABIs.

> **(!)** Currently, only ABIs of version 3 (i.e. have `V3` property) are supported.

Given, that you've put input files in `path/to/input` folder, and want generated code to land in `path/to/output` folder, run the following command:

```bash
npx typechain-polkadot --in path/to/input --out path/to/output
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

- `methods` namespace - Behaves according to description in ABI: RPC calls for read-only methods and transactions for the mutating ones. Type definitions will reflect that.

```typescript
const { value, gasConsumed } = await conrtact.methods.readOnlyMethod(arg1, ..., argN, options);

const successResponse = await conrtact.methods.mutatingMethod(arg1, ..., argN, options);
```

-----------
## EXAMPLES

> For usage examples in TypeScript, please, refer to this repo: https://github.com/Supercolony-net/typechain-polkadot_example