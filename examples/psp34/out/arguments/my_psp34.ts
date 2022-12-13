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
	"balance_of": readonly [ AccountId ];
	"allowance": readonly [ AccountId,  AccountId,  Id | null ];
	"transfer": readonly [ AccountId,  Id,  Array<(number | string | BN)> ];
	"collection_id": readonly [ ];
	"approve": readonly [ AccountId,  Id | null,  boolean ];
	"owner_of": readonly [ Id ];
	"total_supply": readonly [ ];
	"mint": readonly [ AccountId,  Id ];
}