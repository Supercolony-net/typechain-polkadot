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
	"decreaseAllowance": readonly [ AccountId,  (string | number | BN) ];
	"balanceOf": readonly [ AccountId ];
	"allowance": readonly [ AccountId,  AccountId ];
	"increaseAllowance": readonly [ AccountId,  (string | number | BN) ];
	"totalSupply": readonly [ ];
	"transferFrom": readonly [ AccountId,  AccountId,  (string | number | BN),  Array<(number | string | BN)> ];
	"approve": readonly [ AccountId,  (string | number | BN) ];
	"mint": readonly [ AccountId,  (string | number | BN) ];
}