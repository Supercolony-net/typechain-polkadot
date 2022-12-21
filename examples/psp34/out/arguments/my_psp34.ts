/* This file is auto-generated */

import BN from 'bn.js';
import { AccountId, Id } from '../types-arguments/my_psp34';

export interface ArgumentsTypes {
	"8": AccountId;
	"14": Id | null;
	"1": Id;
	"7": Array<(number | string | BN)>;
	"16": boolean;
}

export interface ArgumentsTuples {
	"balanceOf": readonly [ AccountId ];
	"allowance": readonly [ AccountId,  AccountId,  Id | null ];
	"transfer": readonly [ AccountId,  Id,  Array<(number | string | BN)> ];
	"collectionId": readonly [ ];
	"approve": readonly [ AccountId,  Id | null,  boolean ];
	"ownerOf": readonly [ Id ];
	"totalSupply": readonly [ ];
	"mint": readonly [ AccountId,  Id ];
}