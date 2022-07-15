/* eslint-disable indent */

import toCamelCase from 'camelcase';
import { decorateJsDoc } from './_utils';



//////

export const FILE = (fileName : string, methodsStr : string) => `/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ArgumentsTypes } from '../arguments/${fileName}';
import type OkishReturns from '../return-values/${fileName}';
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
${methodsStr}
}
`;