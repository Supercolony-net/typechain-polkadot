/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ArgumentsTypes } from '../arguments/my_psp22';
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
	 * 0: to,
	 * 1: value,
	 * 2: data,
	 * ]
	 */
	"transfer" (
		to: ArgumentsTypes[2],
		value: ArgumentsTypes[0],
		data: ArgumentsTypes[9],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22::transfer", [to, value, data], __options);
	}

	/**
	 * @arg: args: [
	 * 0: spender,
	 * 1: deltaValue,
	 * ]
	 */
	"decrease_allowance" (
		spender: ArgumentsTypes[2],
		deltaValue: ArgumentsTypes[0],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22::decreaseAllowance", [spender, deltaValue], __options);
	}

	/**
	 * @arg: args: [
	 * 0: owner,
	 * ]
	 */
	"balance_of" (
		owner: ArgumentsTypes[2],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22::balanceOf", [owner], __options);
	}

	/**
	 * @arg: args: [
	 * 0: owner,
	 * 1: spender,
	 * ]
	 */
	"allowance" (
		owner: ArgumentsTypes[2],
		spender: ArgumentsTypes[2],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22::allowance", [owner, spender], __options);
	}

	/**
	 * @arg: args: [
	 * 0: spender,
	 * 1: deltaValue,
	 * ]
	 */
	"increase_allowance" (
		spender: ArgumentsTypes[2],
		deltaValue: ArgumentsTypes[0],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22::increaseAllowance", [spender, deltaValue], __options);
	}

	/** */
	"total_supply" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22::totalSupply", [], __options);
	}

	/**
	 * @arg: args: [
	 * 0: from,
	 * 1: to,
	 * 2: value,
	 * 3: data,
	 * ]
	 */
	"transfer_from" (
		from: ArgumentsTypes[2],
		to: ArgumentsTypes[2],
		value: ArgumentsTypes[0],
		data: ArgumentsTypes[9],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22::transferFrom", [from, to, value, data], __options);
	}

	/**
	 * @arg: args: [
	 * 0: spender,
	 * 1: value,
	 * ]
	 */
	"approve" (
		spender: ArgumentsTypes[2],
		value: ArgumentsTypes[0],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22::approve", [spender, value], __options);
	}

	/**
	 * @arg: args: [
	 * 0: account,
	 * 1: amount,
	 * ]
	 */
	"mint" (
		account: ArgumentsTypes[2],
		amount: ArgumentsTypes[0],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22Mintable::mint", [account, amount], __options);
	}

}