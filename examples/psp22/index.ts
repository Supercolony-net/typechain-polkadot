
// In this example we will interact with already deployed psp22 token to mint some tokens to the owner and get total supply.
// If you want to deploy run a substrate-contracts-node on your computer and use my_psp22.contract to deploy it via web UI.
import Contract from "./out/contracts/my_psp22";
import {ApiPromise, Keyring} from "@polkadot/api";
import BN from "bn.js";

async function main() {
    const TOKEN_ADDRESS = '5FjRu3w4wQGJdbSFz2F7PjBTXPN6Fxxe9ndiqH9SsU4u9Yn9';

    const api = await ApiPromise.create();

    const keyring = new Keyring({type: 'sr25519'});

    const aliceKeyringPair = keyring.addFromUri('//Alice');

    const contract = new Contract(TOKEN_ADDRESS, aliceKeyringPair, api);

    const totalSupply = await contract.query['PSP22::total_supply']();
    const balance = await contract.query['PSP22::balance_of'](aliceKeyringPair.address);

    console.log(`%c Total supply before minting: ${totalSupply.value}`, 'color: green');
    console.log(`%c Balance of Alice before minting: ${balance.value}`, 'color: green');

    const mintTx = await contract.tx['PSP22Mintable::mint'](aliceKeyringPair.address, '10000');

    const totalSupplyAfterMint = await contract.query['PSP22::total_supply']();
    const balanceAfterMint = await contract.query['PSP22::balance_of'](aliceKeyringPair.address);

    console.log(`%c Total supply after minting: ${totalSupplyAfterMint.value}`, 'color: green');
    console.log(`%c Balance of Alice after minting: ${balanceAfterMint.value}`, 'color: green');

    await api.disconnect();
}

main().then(() => {
    console.log('done');
});