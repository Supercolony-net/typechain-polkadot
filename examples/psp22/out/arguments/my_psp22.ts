/* This file is auto-generated */

import type BN from 'bn.js';
import type { AccountId } from '../types/my_psp22';

export interface ArgumentsTypes {
	"2" : AccountId;
	"0" : (string | number);
	"9" : Array<number>;

}

export interface ArgumentsTuples {
	"PSP22::transfer" : readonly [ AccountId, (string | number), Array<number> ]
	"PSP22::decrease_allowance" : readonly [ AccountId, (string | number) ]
	"PSP22::balance_of" : readonly [ AccountId ]
	"PSP22::allowance" : readonly [ AccountId, AccountId ]
	"PSP22::increase_allowance" : readonly [ AccountId, (string | number) ]
	"PSP22::total_supply" : readonly [  ]
	"PSP22::transfer_from" : readonly [ AccountId, AccountId, (string | number), Array<number> ]
	"PSP22::approve" : readonly [ AccountId, (string | number) ]
	"PSP22Mintable::mint" : readonly [ AccountId, (string | number) ]

}
