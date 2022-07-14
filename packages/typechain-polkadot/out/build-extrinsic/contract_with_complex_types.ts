/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ArgumentsTypes } from '../arguments/contract_with_complex_types';
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
	"change_state" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "changeState", [], __options);
	}

	/** */
	"cap" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "cap", [], __options);
	}

	/** */
	"get_complex_struct_1" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "getComplexStruct1", [], __options);
	}

	/** */
	"get_complex_struct_2" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "getComplexStruct2", [], __options);
	}

	/**
	 * @arg: args: [
	 * 0: s,
	 * ]
	 */
	"get_complex_struct_3" (
		s: ArgumentsTypes[14],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "getComplexStruct3", [s], __options);
	}

	/**
	 * @arg: args: [
	 * 0: s,
	 * ]
	 */
	"get_complex_struct_4" (
		s: ArgumentsTypes[18],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "getComplexStruct4", [s], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22::approve", [spender, value], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22::decreaseAllowance", [spender, deltaValue], __options);
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
		data: ArgumentsTypes[19],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22::transferFrom", [from, to, value, data], __options);
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
		data: ArgumentsTypes[19],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22::transfer", [to, value, data], __options);
	}

	/** */
	"PSP22::total_supply" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22::totalSupply", [], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22::allowance", [owner, spender], __options);
	}

	/**
	 * @arg: args: [
	 * 0: owner,
	 * ]
	 */
	"PSP22::balance_of" (
		owner: ArgumentsTypes[2],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22::balanceOf", [owner], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22::increaseAllowance", [spender, deltaValue], __options);
	}

	/** */
	"PSP22Metadata::token_symbol" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22Metadata::tokenSymbol", [], __options);
	}

	/** */
	"PSP22Metadata::token_name" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22Metadata::tokenName", [], __options);
	}

	/** */
	"PSP22Metadata::token_decimals" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22Metadata::tokenDecimals", [], __options);
	}

	/**
	 * @arg: args: [
	 * 0: account,
	 * 1: amount,
	 * ]
	 */
	"PSP22Wrapper::withdraw_to" (
		account: ArgumentsTypes[2],
		amount: ArgumentsTypes[0],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22Wrapper::withdrawTo", [account, amount], __options);
	}

	/**
	 * @arg: args: [
	 * 0: account,
	 * 1: amount,
	 * ]
	 */
	"PSP22Wrapper::deposit_for" (
		account: ArgumentsTypes[2],
		amount: ArgumentsTypes[0],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22Wrapper::depositFor", [account, amount], __options);
	}

	/**
	 * @arg: args: [
	 * 0: token,
	 * ]
	 */
	"FlashLender::max_flashloan" (
		token: ArgumentsTypes[2],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "flashLender::maxFlashloan", [token], __options);
	}

	/**
	 * @arg: args: [
	 * 0: token,
	 * 1: amount,
	 * ]
	 */
	"FlashLender::flash_fee" (
		token: ArgumentsTypes[2],
		amount: ArgumentsTypes[0],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "flashLender::flashFee", [token, amount], __options);
	}

	/**
	 * @arg: args: [
	 * 0: receiverAccount,
	 * 1: token,
	 * 2: amount,
	 * 3: data,
	 * ]
	 */
	"FlashLender::flashloan" (
		receiverAccount: ArgumentsTypes[2],
		token: ArgumentsTypes[2],
		amount: ArgumentsTypes[0],
		data: ArgumentsTypes[19],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "flashLender::flashloan", [receiverAccount, token, amount, data], __options);
	}

	/** */
	"Pausable::paused" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "pausable::paused", [], __options);
	}

	/** */
	"Ownable::owner" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "ownable::owner", [], __options);
	}

	/** */
	"Ownable::renounce_ownership" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "ownable::renounceOwnership", [], __options);
	}

	/**
	 * @arg: args: [
	 * 0: newOwner,
	 * ]
	 */
	"Ownable::transfer_ownership" (
		newOwner: ArgumentsTypes[2],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "ownable::transferOwnership", [newOwner], __options);
	}

	/**
	 * @arg: args: [
	 * 0: account,
	 * 1: amount,
	 * ]
	 */
	"PSP22Burnable::burn" (
		account: ArgumentsTypes[2],
		amount: ArgumentsTypes[0],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22Burnable::burn", [account, amount], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp22Mintable::mint", [account, amount], __options);
	}

}