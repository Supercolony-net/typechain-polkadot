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

## Milestones

Milestone 1 - Referer to [Milestone 1 docs](./docs/milestone-1.md)

-----------
#### Made with ❤️ by [Supercolony](https://supercolony.net)
