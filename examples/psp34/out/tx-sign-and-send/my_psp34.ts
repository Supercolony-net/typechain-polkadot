/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_psp34';
import type BN from 'bn.js';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";


export default class Methods {
	private __nativeContract : ContractPromise;
	private __keyringPair : KeyringPair;
	private __apiPromise: ApiPromise;

	constructor(
		apiPromise: ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
	}

	/**
	* balanceOf
	*
	* @param { ArgumentTypes.AccountId } owner,
	*/
	"balanceOf" (
		owner: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34::balanceOf", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_psp34");
		}, [owner], __options);
	}

	/**
	* allowance
	*
	* @param { ArgumentTypes.AccountId } owner,
	* @param { ArgumentTypes.AccountId } operator,
	* @param { ArgumentTypes.Id | null } id,
	*/
	"allowance" (
		owner: ArgumentTypes.AccountId,
		operator: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id | null,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34::allowance", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_psp34");
		}, [owner, operator, id], __options);
	}

	/**
	* transfer
	*
	* @param { ArgumentTypes.AccountId } to,
	* @param { ArgumentTypes.Id } id,
	* @param { Array<(number | string | BN)> } data,
	*/
	"transfer" (
		to: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id,
		data: Array<(number | string | BN)>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34::transfer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_psp34");
		}, [to, id, data], __options);
	}

	/**
	* collectionId
	*
	*/
	"collectionId" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34::collectionId", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_psp34");
		}, [], __options);
	}

	/**
	* approve
	*
	* @param { ArgumentTypes.AccountId } operator,
	* @param { ArgumentTypes.Id | null } id,
	* @param { boolean } approved,
	*/
	"approve" (
		operator: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id | null,
		approved: boolean,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34::approve", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_psp34");
		}, [operator, id, approved], __options);
	}

	/**
	* ownerOf
	*
	* @param { ArgumentTypes.Id } id,
	*/
	"ownerOf" (
		id: ArgumentTypes.Id,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34::ownerOf", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_psp34");
		}, [id], __options);
	}

	/**
	* totalSupply
	*
	*/
	"totalSupply" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34::totalSupply", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_psp34");
		}, [], __options);
	}

	/**
	* mint
	*
	* @param { ArgumentTypes.AccountId } account,
	* @param { ArgumentTypes.Id } id,
	*/
	"mint" (
		account: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34Mintable::mint", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "my_psp34");
		}, [account, id], __options);
	}

}