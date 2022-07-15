/* eslint-disable indent */

import { decorateJsDoc, buildIndentedText } from './_utils';


////

// ARGUMENTS

export function FILE(
	argsTypes : {
		id : number | string;
		tsStr : string;
	}[],
	methods : {
		name : string;
		args : {
			name : string;
			type : {
				id : number | string;
				tsStr : string;
			};
		}[]
	}[],
	additionalImports : string = '',
) {
	//
	return `/* This file is auto-generated */

import type BN from 'bn.js';
${additionalImports}

export interface ArgumentsTypes {
${
	buildIndentedText(
		argsTypes.map(arg => `"${arg.id}" : ${arg.tsStr};`)
	)
}
}

export interface ArgumentsTuples {
${
	buildIndentedText(
		methods.map(m => `"${m.name}" : readonly [ ${ m.args.map(a => a.type.tsStr).join(', ') } ]`)
	)
}
}
`;
}