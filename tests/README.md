# How to test

1) Start a local node

```bash
git clone https://github.com/paritytech/substrate-contracts-node
cd ./substrate-contracts-node
git checkout v0.23.0
cargo +stable build --release
./target/release/substrate-contracts-node --dev --tmp
```

2) Run tests

```bash
npm run test
```

> Note, run the command 2 in project' root directory

## Alternative way to run tests

1) Start a local node as described above

2) Generate typechain-code for the contracts

```bash
npm run gen-test-ts
```

3) Run tests

```bash
npm run only-test
```