/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { ArgumentsTypes } from '../arguments/contract_with_enums';
import type { GasLimit, GasLimitAndRequiredValue } from '../_sdk/types';
import { txSignAndSend } from '../_sdk/tx';


export default class Methods {
	private __nativeContract : ContractPromise;
	private __keyringPair : KeyringPair;
	private __apiPromise: ApiPromise;

	constructor(
		apiPromise: ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
	}

	/**
	 * @arg: args: [
	 * 0: type,
	 * ]
	 */
	"get_message" (
		type: ArgumentsTypes[0],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getMessage", [type], __options);
	}

}