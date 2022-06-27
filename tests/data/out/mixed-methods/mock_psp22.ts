/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ArgumentsTypes } from '../arguments/mock_psp22';
import type OkishReturns from '../return-values/mock_psp22';
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
	/** */
	"change_state" (
		__options ? : GasLimit,
	) {
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "changeState", [], __options );
	}
	/** */
	"cap" (
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["0"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "cap", [], __options );
	}
	/**
	 * @arg args : [
	 * ```json
	 * 	0: owner
	 * ```
	 * ]
	 */
	"PSP22::balance_of" (
		owner : ArgumentsTypes["2"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["0"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22::balanceOf", [owner], __options );
	}
	/**
	 * @arg args : [
	 * ```json
	 * 	0: to
	 * 	1: value
	 * 	2: data
	 * ```
	 * ]
	 */
	"PSP22::transfer" (
		to : ArgumentsTypes["2"],
		value : ArgumentsTypes["0"],
		data : ArgumentsTypes["14"],
		__options ? : GasLimit,
	) {
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "psp22::transfer", [to, value, data], __options );
	}
	/**
	 * @arg args : [
	 * ```json
	 * 	0: spender
	 * 	1: value
	 * ```
	 * ]
	 */
	"PSP22::approve" (
		spender : ArgumentsTypes["2"],
		value : ArgumentsTypes["0"],
		__options ? : GasLimit,
	) {
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "psp22::approve", [spender, value], __options );
	}
	/**
	 * @arg args : [
	 * ```json
	 * 	0: spender
	 * 	1: delta_value
	 * ```
	 * ]
	 */
	"PSP22::increase_allowance" (
		spender : ArgumentsTypes["2"],
		delta_value : ArgumentsTypes["0"],
		__options ? : GasLimit,
	) {
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "psp22::increaseAllowance", [spender, delta_value], __options );
	}
	/** */
	"PSP22::total_supply" (
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["0"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22::totalSupply", [], __options );
	}
	/**
	 * @arg args : [
	 * ```json
	 * 	0: spender
	 * 	1: delta_value
	 * ```
	 * ]
	 */
	"PSP22::decrease_allowance" (
		spender : ArgumentsTypes["2"],
		delta_value : ArgumentsTypes["0"],
		__options ? : GasLimit,
	) {
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "psp22::decreaseAllowance", [spender, delta_value], __options );
	}
	/**
	 * @arg args : [
	 * ```json
	 * 	0: from
	 * 	1: to
	 * 	2: value
	 * 	3: data
	 * ```
	 * ]
	 */
	"PSP22::transfer_from" (
		from : ArgumentsTypes["2"],
		to : ArgumentsTypes["2"],
		value : ArgumentsTypes["0"],
		data : ArgumentsTypes["14"],
		__options ? : GasLimit,
	) {
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "psp22::transferFrom", [from, to, value, data], __options );
	}
	/**
	 * @arg args : [
	 * ```json
	 * 	0: owner
	 * 	1: spender
	 * ```
	 * ]
	 */
	"PSP22::allowance" (
		owner : ArgumentsTypes["2"],
		spender : ArgumentsTypes["2"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["0"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22::allowance", [owner, spender], __options );
	}
	/** */
	"PSP22Metadata::token_decimals" (
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["4"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22Metadata::tokenDecimals", [], __options );
	}
	/** */
	"PSP22Metadata::token_symbol" (
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["11"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22Metadata::tokenSymbol", [], __options );
	}
	/** */
	"PSP22Metadata::token_name" (
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["11"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22Metadata::tokenName", [], __options );
	}
	/**
	 * @arg args : [
	 * ```json
	 * 	0: account
	 * 	1: amount
	 * ```
	 * ]
	 */
	"PSP22Wrapper::withdraw_to" (
		account : ArgumentsTypes["2"],
		amount : ArgumentsTypes["0"],
		__options ? : GasLimit,
	) {
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "psp22Wrapper::withdrawTo", [account, amount], __options );
	}
	/**
	 * @arg args : [
	 * ```json
	 * 	0: account
	 * 	1: amount
	 * ```
	 * ]
	 */
	"PSP22Wrapper::deposit_for" (
		account : ArgumentsTypes["2"],
		amount : ArgumentsTypes["0"],
		__options ? : GasLimit,
	) {
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "psp22Wrapper::depositFor", [account, amount], __options );
	}
	/**
	 * @arg args : [
	 * ```json
	 * 	0: token
	 * ```
	 * ]
	 */
	"FlashLender::max_flashloan" (
		token : ArgumentsTypes["2"],
		__options ? : GasLimit,
	) {
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "flashLender::maxFlashloan", [token], __options );
	}
	/**
	 * @arg args : [
	 * ```json
	 * 	0: receiver_account
	 * 	1: token
	 * 	2: amount
	 * 	3: data
	 * ```
	 * ]
	 */
	"FlashLender::flashloan" (
		receiver_account : ArgumentsTypes["2"],
		token : ArgumentsTypes["2"],
		amount : ArgumentsTypes["0"],
		data : ArgumentsTypes["14"],
		__options ? : GasLimit,
	) {
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "flashLender::flashloan", [receiver_account, token, amount, data], __options );
	}
	/**
	 * @arg args : [
	 * ```json
	 * 	0: token
	 * 	1: amount
	 * ```
	 * ]
	 */
	"FlashLender::flash_fee" (
		token : ArgumentsTypes["2"],
		amount : ArgumentsTypes["0"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["17"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "flashLender::flashFee", [token, amount], __options );
	}
	/** */
	"Pausable::paused" (
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["10"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "pausable::paused", [], __options );
	}
	/**
	 * @arg args : [
	 * ```json
	 * 	0: new_owner
	 * ```
	 * ]
	 */
	"Ownable::transfer_ownership" (
		new_owner : ArgumentsTypes["2"],
		__options ? : GasLimit,
	) {
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "ownable::transferOwnership", [new_owner], __options );
	}
	/** */
	"Ownable::owner" (
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["2"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options );
	}
	/** */
	"Ownable::renounce_ownership" (
		__options ? : GasLimit,
	) {
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "ownable::renounceOwnership", [], __options );
	}
	/**
	 * @arg args : [
	 * ```json
	 * 	0: account
	 * 	1: amount
	 * ```
	 * ]
	 */
	"PSP22Burnable::burn" (
		account : ArgumentsTypes["2"],
		amount : ArgumentsTypes["0"],
		__options ? : GasLimit,
	) {
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "psp22Burnable::burn", [account, amount], __options );
	}
	/**
	 * @arg args : [
	 * ```json
	 * 	0: account
	 * 	1: amount
	 * ```
	 * ]
	 */
	"PSP22Mintable::mint" (
		account : ArgumentsTypes["2"],
		amount : ArgumentsTypes["0"],
		__options ? : GasLimit,
	) {
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "psp22Mintable::mint", [account, amount], __options );
	}

}
