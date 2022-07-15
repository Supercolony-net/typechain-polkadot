/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ArgumentsTypes } from '../arguments/payable_example';
import type OkishReturns from '../return-values/payable_example';
import type { GasLimit, GasLimitAndRequiredValue } from '../_sdk/types';
import type { QueryReturnType } from '../_sdk/query';
import { queryJSON } from '../_sdk/query';
import { txSignAndSend } from '../_sdk/tx';


export default class Methods {
	private __nativeContract : ContractPromise;
	private __keyringPair : KeyringPair;
	private __callerAddress : string;
	private __apiPromise: ApiPromise;

	constructor(
		apiPromise : ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
		this.__callerAddress = keyringPair.address;
	}

	/** */
	"flip" (
		__options: GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "flip", [], __options);
	}

	/** */
	"get" (
		__options: GasLimit,
	): Promise< QueryReturnType< OkishReturns["0"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "get", [], __options);
	}

}