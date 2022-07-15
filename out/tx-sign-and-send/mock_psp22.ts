/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ArgumentsTypes } from '../arguments/mock_psp22';
import type { GasLimit, GasLimitAndRequiredValue } from '../_sdk/types';
import { txSignAndSend } from '../_sdk/tx';


export default class Methods {
	private __nativeContract : ContractPromise;
	private __keyringPair : KeyringPair;

	constructor(
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
	}

	/**
	 * @arg: args: [
	 * 0: account,
	 * 1: amount,
	 * ]
	 */
	"mint_to" (
		account: ArgumentsTypes[2],
		amount: ArgumentsTypes[0],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "mintTo", [account, amount], __options);
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
	){
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "psp22::allowance", [owner, spender], __options);
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
		data: ArgumentsTypes[13],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "psp22::transferFrom", [from, to, value, data], __options);
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
		data: ArgumentsTypes[13],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "psp22::transfer", [to, value, data], __options);
	}

	/** */
	"PSP22::total_supply" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "psp22::totalSupply", [], __options);
	}

	/**
	 * @arg: args: [
	 * 0: spender,
	 * 1: delta_value,
	 * ]
	 */
	"PSP22::decrease_allowance" (
		spender: ArgumentsTypes[2],
		delta_value: ArgumentsTypes[0],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "psp22::decreaseAllowance", [spender, delta_value], __options);
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
	){
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "psp22::approve", [spender, value], __options);
	}

	/**
	 * @arg: args: [
	 * 0: spender,
	 * 1: delta_value,
	 * ]
	 */
	"PSP22::increase_allowance" (
		spender: ArgumentsTypes[2],
		delta_value: ArgumentsTypes[0],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "psp22::increaseAllowance", [spender, delta_value], __options);
	}

	/**
	 * @arg: args: [
	 * 0: owner,
	 * ]
	 */
	"PSP22::balance_of" (
		owner: ArgumentsTypes[2],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "psp22::balanceOf", [owner], __options);
	}

	/** */
	"PSP22Metadata::token_decimals" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "psp22Metadata::tokenDecimals", [], __options);
	}

	/** */
	"PSP22Metadata::token_name" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "psp22Metadata::tokenName", [], __options);
	}

	/** */
	"PSP22Metadata::token_symbol" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "psp22Metadata::tokenSymbol", [], __options);
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
	){
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "psp22Mintable::mint", [account, amount], __options);
	}

	/** */
	"WNative::deposit" (
		__options ? : GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "wNative::deposit", [], __options);
	}

	/**
	 * @arg: args: [
	 * 0: value,
	 * ]
	 */
	"WNative::withdraw" (
		value: ArgumentsTypes[0],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__nativeContract, this.__keyringPair, "wNative::withdraw", [value], __options);
	}

}