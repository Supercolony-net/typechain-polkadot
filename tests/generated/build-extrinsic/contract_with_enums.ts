/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ArgumentsTypes } from '../arguments/contract_with_enums';
import type { GasLimit, GasLimitAndRequiredValue } from '../_sdk/types';
import { buildSubmittableExtrinsic } from '../_sdk/tx';


export default class Methods {
	private __nativeContract : ContractPromise;

	constructor(
		nativeContract : ContractPromise,
	) {
		this.__nativeContract = nativeContract;
	}
	/**
	 * @arg: args: [
	 * 0: _type,
	 * ]
	 */
	"get_message" (
		_type: ArgumentsTypes[0],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "getMessage", [_type], __options);
	}

}