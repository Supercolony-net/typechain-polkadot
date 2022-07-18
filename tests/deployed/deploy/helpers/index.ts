import BN from 'bn.js';
// @ts-ignore
import { artifacts, network, patract } from 'redspot';
import { KeyringPair } from '@polkadot/keyring/types';
import { buildTx } from '@redspot/patract/buildTx';
import { Keyring } from '@polkadot/keyring';

const { getContractFactory, getRandomSigner } = patract;

const { api, getAddresses } = network;

export const getDefaultAccounts = async () => {
    const acc = await getKeyringPairs();
    return [
        acc.alice.address,
        acc.alice.address,
        acc.benny.address,
        acc.annie.address,
        acc.chris.address
    ];
};

export const attachContract = async (name, address) => {
    return await getContract(name, address, '', false);
};


export const getContract = async (name, address, constructor, isSetup, ...args) => {
    const defaultAccounts = await getDefaultAccounts();
    const contractFactory = await getContractFactory(name, defaultAccounts[0]);
    const contract = isSetup ?
	  await contractFactory.deploy(constructor, ...args) :
	  await contractFactory.attach(address);
    const abi = artifacts.readArtifact(name);
    return {
        defaultSigner: defaultAccounts[0],
        alice: defaultAccounts[1],
        accounts: { alice: defaultAccounts[1], benny: defaultAccounts[2], annie: defaultAccounts[3], chris: defaultAccounts[4] },
        contractFactory,
        contract,
        abi,
        query: contract.query,
        tx: contract.tx,
    };
};

export const getKeyringPairs = async () => {
    return {
        alice: await addPairWithAmount(new Keyring({ type: 'ecdsa' }).addFromUri('//Alice'), new BN('50000000000')),
        benny: await addPairWithAmount(new Keyring({ type: 'ecdsa' }).addFromUri('//Benny'), new BN('50000000000')),
        annie: await addPairWithAmount(new Keyring({ type: 'ecdsa' }).addFromUri('//Annie'), new BN('50000000000')),
        chris: await addPairWithAmount(new Keyring({ type: 'ecdsa' }).addFromUri('//Chris'), new BN('50000000000')),
    };
};

export const addPairWithAmount = async (pair: KeyringPair, amount: BN): Promise<KeyringPair> => {
    await api.isReady;
    const one = new BN(10).pow(new BN(api.registry.chainDecimals[0]));
    const redspotPair = network.addPair(pair);
    await buildTx(api.registry, api.tx.balances.transfer(redspotPair.address, one.mul(amount)), (await getAddresses())[0]);
    return redspotPair;
};