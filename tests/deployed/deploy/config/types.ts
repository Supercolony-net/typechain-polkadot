import type { BN } from '@polkadot/util';
import type Contract from '@redspot/patract/contract';
import type {
	TOKEN_SYMBOL,
} from './tokens';


////

type Account = {
	title ? : string;
	type ? : 'ecdsa';
	mnemonicSeed : string;
	/** (!) Will be multiplied by 10^18 */
	amount : BN;
	mintAmounts ? : { [key in TOKEN_SYMBOL] ? : BN };
	// [ props to assign by deploy script ]
	address ? : string;
};

type Token = {
	name : string;
	symbol : TOKEN_SYMBOL;
	// [ props to assign by deploy script ]
	address ? : string;
	contract ? : Contract;
};


////

export type {
	Account,
	Token,
};

export {
	TOKEN_SYMBOL,
};