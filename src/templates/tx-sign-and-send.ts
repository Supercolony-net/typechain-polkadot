/* eslint-disable indent */

import toCamelCase from 'camelcase';
import { decorateJsDoc, buildIndentedText } from './_utils';



//////

export const FILE = (fileName : string, methodsStr : string) => `/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ArgumentsTypes } from '../arguments/${fileName}';
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
${methodsStr}
}
`;

export function METHOD_JSDOC(args : { label : string; }[]) {
	if(args.length < 1) return "	/** */\n";
	//
	return decorateJsDoc([
		...args.map((a, i) => `@arg ${a.label}`),
	]);
}

export function METHOD(
	name : string,
	args : {
		name : string;
		type : {
			id : number | string;
		};
	}[],
	payable : boolean,
) {
	//
	return buildIndentedText([
		`"${name}" (`,
		// `	args : ArgumentsTuples["${name}"],`,
		...args.map(arg => `	${arg.name} : ArgumentsTypes["${arg.type.id}"],`),
		`	__options ${ payable ? `: GasLimitAndRequiredValue,` : `? : GasLimit,` }`,
		`) {`,
		`	return txSignAndSend( this.__nativeContract, this.__keyringPair, "${toCamelCase(name)}", [${args.map(a => a.name).join(', ')}], __options );`,
		`}`,
	]);
}