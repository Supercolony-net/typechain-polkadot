![alt typechain-logo](./img/logo.png)
=====
###### Version 0.0.12

---

When a smart contract is being written, front-end developer receives file representation of it in the format called Application Binary Interface (ABI). One ABI per each contract, new ABI for every update of a contract.

Information about how to interact with a contract (methods names, arguments & returns types etc.) is included in this ABI file. It is not human-readable enough, so extraction of that information becomes a challenge. Guessing is not an option and we need to have correct type definitions for each contract in TypeScript. They can be generated automatically by a script, taking a list of ABIs as an input, giving usable TS type definitions and even runtime code as its output.

Given, that a front-end developer needs to do this with every contracts update, such tool would save a lot of time and prevent mistakes of misusing smart contracts.


---------
## Usage

In your project install this package:

```bash
npm i -D @supercolony-net/typechain-polkadot
```

Now you can use it to generate TS definitions & runtime code for your ABIs.

Given, that you've put input files in `path/to/input` folder, and want generated code to land in `path/to/output` folder, run the following command:

```bash
npx @supercolony-net/typechain-polkadot --in path/to/input --out path/to/output
```

> Referer to [tech docs](./docs/tech-specs.md) and [about](./docs/about.md) section for more information. For usage examples in TypeScript, please, refer to this repo: https://github.com/Supercolony-net/typechain-polkadot_example

## Progress

- 🟡 Grant proposal
- ✅ Generate types
- ✅ Generate functions
- ✅ Generate runtime code
- ✅ CLI interface
- 🟡 Logger
- 🔜 More?

## Roadmap
#### Milestone 1 - MVP, first application and testing.

* **Estimated duration:** 8 weeks 
* **FTE:**  2
* **Costs:** 44,800 USD

| Number | Deliverable | Specification |
| -----  | ----------- | ------------- |
| 1 | TS types | We will research & match types from ABI to TypeScript, compatible with [polkadot{.js} v8](https://polkadot.js.org) library. Separately, for methods' arguments and return values. Files with types definition will be generated. |
| 2 | Runtime code | Prepare output of runtime code with contracts' methods implementation. At this point we have minimal viable coverage of the ABI types, original methods' names, and general types for methods' options, without specifics for contract's namespaces. |
| 3 | Tests | Minimal coverage of PSP22 contract with integration tests. We will be testing correctness of the derived types of the arguments and return values. |
| 4 | NPM Packaging | Prepare the repository to work through CLI as a package. In TypeScript, as is, without translation to JavaScript. We will publish the package to [NPM repository](https://npmjs.com) and provide set-up instructions. |
| 5 | Examples & Documentation | We will provide TypeScript code examples of this package in use. As well, as document its features. |



<!-- ### Future work -->


## Future Plans


#### Milestone 2 - Full coverage for ABIs’ types. Contracts deployment.

* **Estimated duration:** 8 weeks
* **FTE:**  2
* **Costs:** 44,800 USD

| Number | Deliverable | Specification |
| -----  | ----------- | ------------- |
| 1 | Investigation | Broaden types definitions for methods arguments and return values (to full coverage). |
| 2 | Parser module | Write a separate parser module for ABI JSON. Support of ABI V1-V3. |
| 3 | Refactor | Generate code, based on parser's output now. |
| 4 | Contract deployment | Support of parsing `*.contract` files. Provide means for contract deployment. |
| 5 | Testing | Full coverage of PSP22 contract with integration tests. Both for contract usage and deployment. We will be testing arguments' & return values' types correctness. |
| 5 | Examples & Documentation | Cover new-added features in documentation and usage examples. |


#### Milestone 3 - Optimization. Improve type system of the generated code.

* **Estimated duration:** 6 weeks
* **FTE:**  2
* **Costs:** 33,600 USD

| Number | Deliverable | Specification |
| -----  | ----------- | ------------- |
| 1 | Precise methods definitions | Refine definitions and bahavior of contracts methods (i.e. methods' arguments and returns), depending on namespace, call options and properties of the method, like `payable` & `mutable`. E.g. preamptive querying for transaction calls, controlled by a call options flag. |
| 2 | Methods' names | Format methods' names in the output from original `MethodTrait::method_name` to more user-friendly `methodName` naming scheme, while resolving overlap in formatted names. |
| 3 | Contract classes extension | Extend generated contract classes with useful properties, normally available on the contract (e.g. address, name, signer, etc.). Rely on usage experience in doing so. |
| 4 | IDE hints | Prepare generated code to have more informattive IDE hints, based on both JSDoc and output typesystem itself (if needed). Rely on usage experience in doing so. |
| 5 | NPM Package | Translate package's code to JavaScript upon deployment. Provide informattive CLI, when needed. Make sure to have a cross-platform CLI support. |
| 6 | Examples & Documentation | Cover new-added features in documentation and usage examples. |


-----------
#### Made with ❤️ by [Supercolony](https://supercolony.net)
