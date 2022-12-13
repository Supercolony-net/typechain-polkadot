/* This file is auto-generated */

import BN from 'bn.js';
import { AccountId } from '../types-arguments/my_psp22';

export interface ArgumentsTypes {
	"2": AccountId;
	"0": (string | number | BN);
	"9": Array<(number | string | BN)>;
}

export interface ArgumentsTuples {
	"transfer": readonly [ AccountId,  (string | number | BN),  Array<(number | string | BN)> ];
	"decrease_allowance": readonly [ AccountId,  (string | number | BN) ];
	"balance_of": readonly [ AccountId ];
	"allowance": readonly [ AccountId,  AccountId ];
	"increase_allowance": readonly [ AccountId,  (string | number | BN) ];
	"total_supply": readonly [ ];
	"transfer_from": readonly [ AccountId,  AccountId,  (string | number | BN),  Array<(number | string | BN)> ];
	"approve": readonly [ AccountId,  (string | number | BN) ];
	"mint": readonly [ AccountId,  (string | number | BN) ];
}