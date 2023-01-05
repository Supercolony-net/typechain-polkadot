# How to test

1) Start a local node

```bash
git clone https://github.com/paritytech/substrate-contracts-node
git checkout v0.19.0
cargo +stable build --release
./target/release/substrate-contracts-node --dev --tmp
```

2) Run tests

```bash
npm run test
```

> Note, run the command 2 in ./packages/typechain-polkadot directory
