# How to test

1) Start a local node

```bash
git clone https://github.com/paritytech/substrate-contracts-node
git checkout v0.19.0
cargo +stable build --release
./target/release/substrate-contracts-node --dev --tmp
```

2) Generate Typechain types for the contracts

```bash
npm run gen-test-ts
```

3) Run tests

```bash
npm run test
```

> Note, run the commands 2, 3 in ./packages/typechain-polkadot directory
