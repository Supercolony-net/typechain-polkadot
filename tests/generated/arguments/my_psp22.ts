/* This file is auto-generated */

import type BN from 'bn.js';
import { AccountId } from '../types-arguments/my_psp22';

export interface ArgumentsTypes {
	"2": AccountId;
	"0": (string | number | BN);
	"9": Array<(number | string | BN)>;
}

export interface ArgumentsTuples {
	"PSP22::transfer": readonly [ AccountId,  (string | number | BN),  Array<(number | string | BN)> ];
	"PSP22::decrease_allowance": readonly [ AccountId,  (string | number | BN) ];
	"PSP22::balance_of": readonly [ AccountId ];
	"PSP22::allowance": readonly [ AccountId,  AccountId ];
	"PSP22::increase_allowance": readonly [ AccountId,  (string | number | BN) ];
	"PSP22::total_supply": readonly [ ];
	"PSP22::transfer_from": readonly [ AccountId,  AccountId,  (string | number | BN),  Array<(number | string | BN)> ];
	"PSP22::approve": readonly [ AccountId,  (string | number | BN) ];
	"PSP22Mintable::mint": readonly [ AccountId,  (string | number | BN) ];
}