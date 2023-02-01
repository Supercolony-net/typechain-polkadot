/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_psp34';
import type * as ReturnTypes from '../types-returns/my_psp34';
import type BN from 'bn.js';
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";


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

	/**
	* balanceOf
	*
	* @param { ArgumentTypes.AccountId } owner,
	* @returns { number }
	*/
	"balanceOf" (
		owner: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< number > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp34::balanceOf", [owner], __options);
	}

	/**
	* allowance
	*
	* @param { ArgumentTypes.AccountId } owner,
	* @param { ArgumentTypes.AccountId } operator,
	* @param { ArgumentTypes.Id | null } id,
	* @returns { boolean }
	*/
	"allowance" (
		owner: ArgumentTypes.AccountId,
		operator: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id | null,
		__options: GasLimit,
	): Promise< QueryReturnType< boolean > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp34::allowance", [owner, operator, id], __options);
	}

	/**
	* transfer
	*
	* @param { ArgumentTypes.AccountId } to,
	* @param { ArgumentTypes.Id } id,
	* @param { Array<(number | string | BN)> } data,
	* @returns { void }
	*/
	"transfer" (
		to: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id,
		data: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34::transfer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_psp34");
		}, [to, id, data], __options);
	}

	/**
	* collectionId
	*
	* @returns { ReturnTypes.Id }
	*/
	"collectionId" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnTypes.Id > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp34::collectionId", [], __options, (result) => { return handleReturnType(result, getTypeDescription(1, 'my_psp34')); });
	}

	/**
	* approve
	*
	* @param { ArgumentTypes.AccountId } operator,
	* @param { ArgumentTypes.Id | null } id,
	* @param { boolean } approved,
	* @returns { void }
	*/
	"approve" (
		operator: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id | null,
		approved: boolean,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34::approve", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_psp34");
		}, [operator, id, approved], __options);
	}

	/**
	* ownerOf
	*
	* @param { ArgumentTypes.Id } id,
	* @returns { ReturnTypes.AccountId | null }
	*/
	"ownerOf" (
		id: ArgumentTypes.Id,
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId | null > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp34::ownerOf", [id], __options, (result) => { return handleReturnType(result, getTypeDescription(20, 'my_psp34')); });
	}

	/**
	* totalSupply
	*
	* @returns { ReturnNumber }
	*/
	"totalSupply" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__nativeContract, this.__callerAddress, "psp34::totalSupply", [], __options, (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* mint
	*
	* @param { ArgumentTypes.AccountId } account,
	* @param { ArgumentTypes.Id } id,
	* @returns { void }
	*/
	"mint" (
		account: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34Mintable::mint", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_psp34");
		}, [account, id], __options);
	}

}