/* eslint-disable indent */






export const FILE = (content : string, additionalImports: string = '') => `/* This file is auto-generated */

import type BN from 'bn.js';
${additionalImports}

export default interface OkishReturnValueTypes {
${content}
};

`;

export function TYPE_JSDOC() {
	return "	/** */\n";
}

export const TYPE = (id : number | string, tsStr : string) =>
`	"${id}" : ${tsStr};
`;