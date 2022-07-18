import { network } from 'redspot';
import {attachContract} from './helpers';
import { Keyring } from '@polkadot/keyring';
import * as dotenv from 'dotenv';

import deployPSP22_Token from './psp22';
import deployPSP34_Token from './psp34';
import deployContractWithEnums from './contractWithEnums';


dotenv.config({ path: __dirname + '/.env' });
const { api } = network;


async function run() {
    await api.isReady;

    const keyring = new Keyring({ type: 'sr25519' });

    const deployerSigner = network.getSigners()[0];

    const PSP22Address = await deployPSP22_Token(deployerSigner);

    const alice = keyring.addFromUri('//Alice');
    const bob   = keyring.addFromUri('//Bob');

    console.log(`export const TOKEN = '${PSP22Address}';`);

    const PSP22Contract = await attachContract('my_psp22', PSP22Address);

    await PSP22Contract.tx["psp22Mintable::mint"](alice.address, '1000000000000000000000000000000000000');
    await PSP22Contract.tx["psp22Mintable::mint"](bob.address, '1000000000000000000000000000000000000');

    const psp34Address = await deployPSP34_Token(deployerSigner);

    console.log(`export const PSP34_TOKEN = '${psp34Address}';`);

    const contactWithEnumsAddress = await deployContractWithEnums(deployerSigner);

    console.log(`export const CONTRACT_WITH_ENUMS = '${contactWithEnumsAddress}';`);

    await api.disconnect();
}


run().catch(error => {
    console.error('Error caught: ', error);
    process.exit(1);
});
