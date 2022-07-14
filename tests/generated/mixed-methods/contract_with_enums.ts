/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ArgumentsTypes } from '../arguments/contract_with_enums';
import type OkishReturns from '../return-values/contract_with_enums';
import type { GasLimit, GasLimitAndRequiredValue } from '../_sdk/types';
import type { QueryReturnType } from '../_sdk/query';
import { queryJSON } from '../_sdk/query';
import { txSignAndSend } from '../_sdk/tx';


export default class Methods {
	private __nativeContract : ContractPromise;
	private __keyringPair : KeyringPair;
	private __callerAddress : string;

	constructor(
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
		this.__callerAddress = keyringPair.address;
	}

	/**
	 * @arg: args: [
	 * 0: _type,
	 * ]
	 */
	"get_message" (
		_type: ArgumentsTypes[0],
		__options: GasLimit,
	): Promise< QueryReturnType< OkishReturns["1"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "getMessage", [_type], __options);
	}

}