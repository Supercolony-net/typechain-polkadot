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
	 * @arg: args: [
	 * 0: to,
	 * 1: value,
	 * 2: data,
	 * ]
	 */
	"PSP22::transfer" (
		to: ArgumentsTypes[2],
		value: ArgumentsTypes[0],
		data: ArgumentsTypes[9],
		__options ? : GasLimit,
	): Promise< QueryReturnType< OkishReturns["10"] > >{
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp22::transfer", [to, value, data], __options);
	}

	/**
	 * @arg: args: [
	 * 0: spender,
	 * 1: deltaValue,
	 * ]
	 */
	"PSP22::decrease_allowance" (
		spender: ArgumentsTypes[2],
		deltaValue: ArgumentsTypes[0],
		__options ? : GasLimit,
	): Promise< QueryReturnType< OkishReturns["10"] > >{
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp22::decreaseAllowance", [spender, deltaValue], __options);
	}

	/**
	 * @arg: args: [
	 * 0: owner,
	 * ]
	 */
	"PSP22::balance_of" (
		owner: ArgumentsTypes[2],
		__options ? : GasLimit,
	): Promise< QueryReturnType< OkishReturns["0"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22::balanceOf", [owner], __options);
	}

	/**
	 * @arg: args: [
	 * 0: owner,
	 * 1: spender,
	 * ]
	 */
	"PSP22::allowance" (
		owner: ArgumentsTypes[2],
		spender: ArgumentsTypes[2],
		__options ? : GasLimit,
	): Promise< QueryReturnType< OkishReturns["0"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22::allowance", [owner, spender], __options);
	}

	/**
	 * @arg: args: [
	 * 0: spender,
	 * 1: deltaValue,
	 * ]
	 */
	"PSP22::increase_allowance" (
		spender: ArgumentsTypes[2],
		deltaValue: ArgumentsTypes[0],
		__options ? : GasLimit,
	): Promise< QueryReturnType< OkishReturns["10"] > >{
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp22::increaseAllowance", [spender, deltaValue], __options);
	}

	/** */
	"PSP22::total_supply" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< OkishReturns["0"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22::totalSupply", [], __options);
	}

	/**
	 * @arg: args: [
	 * 0: from,
	 * 1: to,
	 * 2: value,
	 * 3: data,
	 * ]
	 */
	"PSP22::transfer_from" (
		from: ArgumentsTypes[2],
		to: ArgumentsTypes[2],
		value: ArgumentsTypes[0],
		data: ArgumentsTypes[9],
		__options ? : GasLimit,
	): Promise< QueryReturnType< OkishReturns["10"] > >{
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp22::transferFrom", [from, to, value, data], __options);
	}

	/**
	 * @arg: args: [
	 * 0: spender,
	 * 1: value,
	 * ]
	 */
	"PSP22::approve" (
		spender: ArgumentsTypes[2],
		value: ArgumentsTypes[0],
		__options ? : GasLimit,
	): Promise< QueryReturnType< OkishReturns["10"] > >{
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp22::approve", [spender, value], __options);
	}

	/**
	 * @arg: args: [
	 * 0: account,
	 * 1: amount,
	 * ]
	 */
	"PSP22Mintable::mint" (
		account: ArgumentsTypes[2],
		amount: ArgumentsTypes[0],
		__options ? : GasLimit,
	): Promise< QueryReturnType< OkishReturns["10"] > >{
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp22Mintable::mint", [account, amount], __options);
	}

}