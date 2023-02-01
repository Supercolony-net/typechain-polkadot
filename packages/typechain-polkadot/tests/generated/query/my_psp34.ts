/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ArgumentsTypes } from '../arguments/my_psp34';
import type OkishReturns from '../return-values/my_psp34';
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
	 * 0: owner,
	 * ]
	 */
	"PSP34::balance_of" (
		owner: ArgumentsTypes[8],
		__options ? : GasLimit,
	): Promise< QueryReturnType< OkishReturns["4"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp34::balanceOf", [owner], __options);
	}

	/**
	 * @arg: args: [
	 * 0: owner,
	 * 1: operator,
	 * 2: id,
	 * ]
	 */
	"PSP34::allowance" (
		owner: ArgumentsTypes[8],
		operator: ArgumentsTypes[8],
		id: ArgumentsTypes[14],
		__options ? : GasLimit,
	): Promise< QueryReturnType< OkishReturns["16"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp34::allowance", [owner, operator, id], __options);
	}

	/**
	 * @arg: args: [
	 * 0: to,
	 * 1: id,
	 * 2: data,
	 * ]
	 */
	"PSP34::transfer" (
		to: ArgumentsTypes[8],
		id: ArgumentsTypes[1],
		data: ArgumentsTypes[7],
		__options ? : GasLimit,
	): Promise< QueryReturnType< OkishReturns["17"] > >{
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp34::transfer", [to, id, data], __options);
	}

	/** */
	"PSP34::collection_id" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< OkishReturns["1"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp34::collectionId", [], __options);
	}

	/**
	 * @arg: args: [
	 * 0: operator,
	 * 1: id,
	 * 2: approved,
	 * ]
	 */
	"PSP34::approve" (
		operator: ArgumentsTypes[8],
		id: ArgumentsTypes[14],
		approved: ArgumentsTypes[16],
		__options ? : GasLimit,
	): Promise< QueryReturnType< OkishReturns["17"] > >{
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp34::approve", [operator, id, approved], __options);
	}

	/**
	 * @arg: args: [
	 * 0: id,
	 * ]
	 */
	"PSP34::owner_of" (
		id: ArgumentsTypes[1],
		__options ? : GasLimit,
	): Promise< QueryReturnType< OkishReturns["20"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp34::ownerOf", [id], __options);
	}

	/** */
	"PSP34::total_supply" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< OkishReturns["6"] > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp34::totalSupply", [], __options);
	}

	/**
	 * @arg: args: [
	 * 0: account,
	 * 1: id,
	 * ]
	 */
	"PSP34Mintable::mint" (
		account: ArgumentsTypes[8],
		id: ArgumentsTypes[1],
		__options ? : GasLimit,
	): Promise< QueryReturnType< OkishReturns["17"] > >{
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp34Mintable::mint", [account, id], __options);
	}

}