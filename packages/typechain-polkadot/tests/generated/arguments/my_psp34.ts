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
	"PSP34::balance_of": readonly [ AccountId ];
	"PSP34::allowance": readonly [ AccountId,  AccountId,  Id | null ];
	"PSP34::transfer": readonly [ AccountId,  Id,  Array<(number | string | BN)> ];
	"PSP34::collection_id": readonly [ ];
	"PSP34::approve": readonly [ AccountId,  Id | null,  boolean ];
	"PSP34::owner_of": readonly [ Id ];
	"PSP34::total_supply": readonly [ ];
	"PSP34Mintable::mint": readonly [ AccountId,  Id ];
}