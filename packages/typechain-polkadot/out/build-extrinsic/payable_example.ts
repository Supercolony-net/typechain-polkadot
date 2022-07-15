/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ArgumentsTypes } from '../arguments/payable_example';
import type { GasLimit, GasLimitAndRequiredValue } from '../_sdk/types';
import { buildSubmittableExtrinsic } from '../_sdk/tx';


export default class Methods {
	private __nativeContract : ContractPromise;

	constructor(
		nativeContract : ContractPromise,
	) {
		this.__nativeContract = nativeContract;
	}
	/** */
	"flip" (
		__options: GasLimitAndRequiredValue,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "flip", [], __options);
	}

	/** */
	"get" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "get", [], __options);
	}

}