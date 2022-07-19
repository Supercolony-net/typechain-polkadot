import { BN } from '@polkadot/util';
import type {
	Account,
} from './types';


////

const DEPLOYER : Account = {
	mnemonicSeed: '//Alice',
	amount: new BN('100000'),
};

const DEF_AMOUNT = new BN('5000000000000');

const USERS : Account[] = [
	{
		title: 'Alice',
		mnemonicSeed: '//Alice',
		amount: DEF_AMOUNT,
		mintAmounts: {
			'W_N': new BN('1000000000000000000000000000000000000'),
			'TOKEN1': new BN('1000000000000000000000000000000000000'),
			'TOKEN2': new BN('1000000000000000000000000000000000000'),
		},
	},
	{
		title: 'Bob',
		mnemonicSeed: '//Bob',
		amount: DEF_AMOUNT,
		mintAmounts: {
			'W_N': new BN('1000000000000000000000000000000000000'),
			'TOKEN1': new BN('1000000000000000000000000000000000000'),
			'TOKEN2': new BN('1000000000000000000000000000000000000'),
		},
	},
];


////

export {
	DEPLOYER,
	USERS,
};