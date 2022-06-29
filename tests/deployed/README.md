## TypeChain-Polkadot ink!

The contracts use [ink!](https://github.com/paritytech/ink) eDSL and [redspot](https://github.com/patractlabs/redspot) for integration tests

### Installation (Only for v2 branch)

##### Rust
please follow Substrate tutorial to install rust [installation steps](https://docs.substrate.io/v3/getting-started/installation/)


##### Cargo contract CLI
Follow installation in [Cargo contract repo](https://github.com/paritytech/cargo-contract)


##### Local Node: Europa
We use a version of Europa with 18 decimals (instead of 10)
[Europa](https://github.com/Supercolony-net/europa/tree/18-decimals)


### Run tests
* Step 1: `npm install`.

* Step 2: ensure an Europa node is running  `./europa/target/release/europa --tmp`

* Step 3: to compile & run tests `yarn c`. to run test with no-compile `yarn t`

### Deploying the contracts

We deploy the contracts using the deployment scripts located in the `./deploy` directory.
Right now, when doing local deployments, do the following:

0. Create a `.env` file with mnemonics
1. Navigate to the `./deploy/deploy.ts` file
2. Configure the account generation algorithm for the `deployerSigner` / `superDelegatorSigner`
3. Adapt the actual mnemonics (NB: concatenated with the derivation paths) in the `.env` file
4. Deploy using `yarn deploy`.