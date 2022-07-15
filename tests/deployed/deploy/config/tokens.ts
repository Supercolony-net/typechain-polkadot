import { BN } from 'bn.js';
import {
	Token,
} from './types';


////

const WNATIVE_SYMBOL = 'W_N' as const;

type SECONDARY_TOKEN_SYMBOL = 'TOKEN1' | 'TOKEN2'

type TOKEN_SYMBOL = typeof WNATIVE_SYMBOL | SECONDARY_TOKEN_SYMBOL

export const WNATIVE : Token = {
	symbol: WNATIVE_SYMBOL,
	name: 'WNATIVE'
};

export const TOKENS : Token[] = [
	{
		symbol: 'TOKEN1',
		name: 'PSP22 Token 1',
	},
	{
		symbol: 'TOKEN2',
		name: 'PSP22 Token 2',
	},
];

export const ALL_TOKENS : Token[] = [
	WNATIVE,
	...TOKENS,
];


//// EXPORT

export type {
	SECONDARY_TOKEN_SYMBOL,
	TOKEN_SYMBOL,
};

/*
export {
	WNATIVE,
	TOKENS,
	ALL_TOKENS,
};
*/