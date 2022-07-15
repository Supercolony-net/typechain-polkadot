/* This file is auto-generated */

import type BN from 'bn.js';
import { AccountId } from '../types-arguments/mock_psp22';


export interface ArgumentsTypes {
	"2": AccountId;
	"0": (string | number | BN);
	"13": Array<(number | string | BN)>;
}

export interface ArgumentsTuples {
	"mint_to": readonly [ AccountId,  (string | number | BN) ];
	"PSP22::allowance": readonly [ AccountId,  AccountId ];
	"PSP22::transfer_from": readonly [ AccountId,  AccountId,  (string | number | BN),  Array<(number | string | BN)> ];
	"PSP22::transfer": readonly [ AccountId,  (string | number | BN),  Array<(number | string | BN)> ];
	"PSP22::total_supply": readonly [ ];
	"PSP22::decrease_allowance": readonly [ AccountId,  (string | number | BN) ];
	"PSP22::approve": readonly [ AccountId,  (string | number | BN) ];
	"PSP22::increase_allowance": readonly [ AccountId,  (string | number | BN) ];
	"PSP22::balance_of": readonly [ AccountId ];
	"PSP22Metadata::token_decimals": readonly [ ];
	"PSP22Metadata::token_name": readonly [ ];
	"PSP22Metadata::token_symbol": readonly [ ];
	"PSP22Mintable::mint": readonly [ AccountId,  (string | number | BN) ];
	"WNative::deposit": readonly [ ];
	"WNative::withdraw": readonly [ (string | number | BN) ];
}