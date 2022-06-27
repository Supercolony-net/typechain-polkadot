/* eslint-disable indent */

import toCamelCase from 'camelcase';
import { decorateJsDoc, buildIndentedText } from './_utils';



//////

export const FILE = (fileName : string, methodsStr : string) => `/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ArgumentsTypes } from '../arguments/${fileName}';
import type { GasLimit, GasLimitAndRequiredValue } from '../_sdk/types';
import { buildSubmittableExtrinsic } from '../_sdk/tx';


export default class Methods {
	private __nativeContract : ContractPromise;

	constructor(
		nativeContract : ContractPromise,
	) {
		this.__nativeContract = nativeContract;
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
		`	return buildSubmittableExtrinsic(this.__nativeContract, "${toCamelCase(name)}", [${args.map(a => a.name).join(', ')}], __options);`,
		`}`,
	]);
}