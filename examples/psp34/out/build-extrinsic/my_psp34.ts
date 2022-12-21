/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ArgumentsTypes } from '../arguments/my_psp34';
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
	 * 0: owner,
	 * ]
	 */
	"balanceOf" (
		owner: ArgumentsTypes[8],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp34::balanceOf", [owner], __options);
	}

	/**
	 * @arg: args: [
	 * 0: owner,
	 * 1: operator,
	 * 2: id,
	 * ]
	 */
	"allowance" (
		owner: ArgumentsTypes[8],
		operator: ArgumentsTypes[8],
		id: ArgumentsTypes[14],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp34::allowance", [owner, operator, id], __options);
	}

	/**
	 * @arg: args: [
	 * 0: to,
	 * 1: id,
	 * 2: data,
	 * ]
	 */
	"transfer" (
		to: ArgumentsTypes[8],
		id: ArgumentsTypes[1],
		data: ArgumentsTypes[7],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp34::transfer", [to, id, data], __options);
	}

	/** */
	"collectionId" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp34::collectionId", [], __options);
	}

	/**
	 * @arg: args: [
	 * 0: operator,
	 * 1: id,
	 * 2: approved,
	 * ]
	 */
	"approve" (
		operator: ArgumentsTypes[8],
		id: ArgumentsTypes[14],
		approved: ArgumentsTypes[16],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp34::approve", [operator, id, approved], __options);
	}

	/**
	 * @arg: args: [
	 * 0: id,
	 * ]
	 */
	"ownerOf" (
		id: ArgumentsTypes[1],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp34::ownerOf", [id], __options);
	}

	/** */
	"totalSupply" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp34::totalSupply", [], __options);
	}

	/**
	 * @arg: args: [
	 * 0: account,
	 * 1: id,
	 * ]
	 */
	"mint" (
		account: ArgumentsTypes[8],
		id: ArgumentsTypes[1],
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "psp34Mintable::mint", [account, id], __options);
	}

}