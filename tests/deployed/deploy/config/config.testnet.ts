import { BN } from '@polkadot/util';
import type {
	Account,
} from './types';


////

const DEPLOYER : Account = {
	mnemonicSeed: process.env.MNEMONIC_TESTNET || 'invalid mnemonic',
	amount: new BN('5')
};

const USERS : Account[] = [
	{
		title: 'User',
		mnemonicSeed: process.env.MNEMONIC_TESTNET_USER || 'invalid mnemonic',
		amount: new BN('5')
	},
];


////

export {
	DEPLOYER,
	USERS,
};