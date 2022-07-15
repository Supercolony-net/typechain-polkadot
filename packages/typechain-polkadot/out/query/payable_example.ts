/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ArgumentsTypes } from '../arguments/payable_example';
import type OkishReturns from '../return-values/payable_example';
import type { GasLimit, GasLimitAndRequiredValue } from '../_sdk/types';
import type { QueryReturnType } from '../_sdk/query';
import { queryJSON, queryOkJSON } from '../_sdk/query';


export default class Methods {
	private __nativeContract : ContractPromise;
	private __callerAddress : string;

	constructor(
		nativeContract : ContractPromise,
		callerAddress : string,
	) {
		this.__nativeContract = nativeContract;
		this.__callerAddress = callerAddress;
	}

	/** */
	"flip" (
		__options ? : GasLimitAndRequiredValue,
	): Promise< QueryReturnType< null > >{
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "flip", [], __options);
	}

	/** */
	"get" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< OkishReturns["0"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "get", [], __options);
	}

}