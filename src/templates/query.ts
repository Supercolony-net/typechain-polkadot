/* eslint-disable indent */

import toCamelCase from 'camelcase';
import { decorateJsDoc, buildIndentedText } from './_utils';



//////

export const FILE = (fileName : string, methodsStr : string) => `/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ArgumentsTypes } from '../arguments/${fileName}';
import type OkishReturns from '../return-values/${fileName}';
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
	returnType : undefined | null | {
		id : string | number,
		tsStr : string,
	},
	payable : boolean,
	mutating ? : boolean
) {
	const returnTypeStr = returnType
		? `OkishReturns["${returnType.id}"]`
		: 'null';
	//
	return buildIndentedText([
		`"${name}" (`,
		// `	args : ArgumentsTuples["${name}"],`,
		...args.map(arg => `	${arg.name} : ArgumentsTypes["${arg.type.id}"],`),
		`	__options ${ payable ? `: GasLimitAndRequiredValue,` : `? : GasLimit,` }`,
		`) : Promise< QueryReturnType< ${returnTypeStr} > > {`,
		`	return ${mutating ? 'queryOkJSON' : 'queryJSON'}( this.__nativeContract, this.__callerAddress, "${toCamelCase(name)}", [${args.map(a => a.name).join(', ')}], __options );`,
		`}`,
	]);
}
