/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ArgumentsTypes } from '../arguments/my_psp22';
import type OkishReturns from '../return-values/my_psp22';
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
	/**
	 * @arg to
	 * @arg value
	 * @arg data
	 */
	"PSP22::transfer" (
		to : ArgumentsTypes["2"],
		value : ArgumentsTypes["0"],
		data : ArgumentsTypes["9"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["10"] > > {
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp22::transfer", [to, value, data], __options );
	}
	/**
	 * @arg spender
	 * @arg delta_value
	 */
	"PSP22::decrease_allowance" (
		spender : ArgumentsTypes["2"],
		delta_value : ArgumentsTypes["0"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["10"] > > {
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp22::decreaseAllowance", [spender, delta_value], __options );
	}
	/**
	 * @arg owner
	 */
	"PSP22::balance_of" (
		owner : ArgumentsTypes["2"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["0"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22::balanceOf", [owner], __options );
	}
	/**
	 * @arg owner
	 * @arg spender
	 */
	"PSP22::allowance" (
		owner : ArgumentsTypes["2"],
		spender : ArgumentsTypes["2"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["0"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22::allowance", [owner, spender], __options );
	}
	/**
	 * @arg spender
	 * @arg delta_value
	 */
	"PSP22::increase_allowance" (
		spender : ArgumentsTypes["2"],
		delta_value : ArgumentsTypes["0"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["10"] > > {
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp22::increaseAllowance", [spender, delta_value], __options );
	}
	/** */
	"PSP22::total_supply" (
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["0"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22::totalSupply", [], __options );
	}
	/**
	 * @arg from
	 * @arg to
	 * @arg value
	 * @arg data
	 */
	"PSP22::transfer_from" (
		from : ArgumentsTypes["2"],
		to : ArgumentsTypes["2"],
		value : ArgumentsTypes["0"],
		data : ArgumentsTypes["9"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["10"] > > {
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp22::transferFrom", [from, to, value, data], __options );
	}
	/**
	 * @arg spender
	 * @arg value
	 */
	"PSP22::approve" (
		spender : ArgumentsTypes["2"],
		value : ArgumentsTypes["0"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["10"] > > {
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp22::approve", [spender, value], __options );
	}
	/**
	 * @arg account
	 * @arg amount
	 */
	"PSP22Mintable::mint" (
		account : ArgumentsTypes["2"],
		amount : ArgumentsTypes["0"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["10"] > > {
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp22Mintable::mint", [account, amount], __options );
	}

}
