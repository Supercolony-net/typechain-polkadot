/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ArgumentsTypes } from '../arguments/contract_with_complex_types';
import type OkishReturns from '../return-values/contract_with_complex_types';
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
	"change_state" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "changeState", [], __options);
	}

	/** */
	"cap" (
		__options: GasLimit,
	): Promise< QueryReturnType< OkishReturns["0"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "cap", [], __options);
	}

	/** */
	"get_complex_struct_1" (
		__options: GasLimit,
	): Promise< QueryReturnType< OkishReturns["14"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "getComplexStruct1", [], __options);
	}

	/** */
	"get_complex_struct_2" (
		__options: GasLimit,
	): Promise< QueryReturnType< OkishReturns["18"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "getComplexStruct2", [], __options);
	}

	/**
	 * @arg: args: [
	 * 0: s,
	 * ]
	 */
	"get_complex_struct_3" (
		s: ArgumentsTypes[14],
		__options: GasLimit,
	): Promise< QueryReturnType< OkishReturns["18"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "getComplexStruct3", [s], __options);
	}

	/**
	 * @arg: args: [
	 * 0: s,
	 * ]
	 */
	"get_complex_struct_4" (
		s: ArgumentsTypes[18],
		__options: GasLimit,
	): Promise< QueryReturnType< OkishReturns["14"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "getComplexStruct4", [s], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22::approve", [spender, value], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22::decreaseAllowance", [spender, deltaValue], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22::transferFrom", [from, to, value, data], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22::transfer", [to, value, data], __options);
	}

	/** */
	"PSP22::total_supply" (
		__options: GasLimit,
	): Promise< QueryReturnType< OkishReturns["0"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22::totalSupply", [], __options);
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
	): Promise< QueryReturnType< OkishReturns["0"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22::allowance", [owner, spender], __options);
	}

	/**
	 * @arg: args: [
	 * 0: owner,
	 * ]
	 */
	"PSP22::balance_of" (
		owner: ArgumentsTypes[2],
		__options: GasLimit,
	): Promise< QueryReturnType< OkishReturns["0"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22::balanceOf", [owner], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22::increaseAllowance", [spender, deltaValue], __options);
	}

	/** */
	"PSP22Metadata::token_symbol" (
		__options: GasLimit,
	): Promise< QueryReturnType< OkishReturns["11"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22Metadata::tokenSymbol", [], __options);
	}

	/** */
	"PSP22Metadata::token_name" (
		__options: GasLimit,
	): Promise< QueryReturnType< OkishReturns["11"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22Metadata::tokenName", [], __options);
	}

	/** */
	"PSP22Metadata::token_decimals" (
		__options: GasLimit,
	): Promise< QueryReturnType< OkishReturns["4"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22Metadata::tokenDecimals", [], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22Wrapper::withdrawTo", [account, amount], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22Wrapper::depositFor", [account, amount], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "flashLender::maxFlashloan", [token], __options);
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
	): Promise< QueryReturnType< OkishReturns["20"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "flashLender::flashFee", [token, amount], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "flashLender::flashloan", [receiverAccount, token, amount, data], __options);
	}

	/** */
	"Pausable::paused" (
		__options: GasLimit,
	): Promise< QueryReturnType< OkishReturns["10"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "pausable::paused", [], __options);
	}

	/** */
	"Ownable::owner" (
		__options: GasLimit,
	): Promise< QueryReturnType< OkishReturns["2"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options);
	}

	/** */
	"Ownable::renounce_ownership" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::renounceOwnership", [], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::transferOwnership", [newOwner], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22Burnable::burn", [account, amount], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22Mintable::mint", [account, amount], __options);
	}

}