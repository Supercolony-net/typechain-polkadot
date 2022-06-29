/* This file is auto-generated */

import type BN from 'bn.js';

export interface ArgumentsTypes {
	"2" : string;
	"0" : string | number | BN | bigint;
	"13" : (number)[];

}

export interface ArgumentsTuples {
	"mint_to" : readonly [ string, string | number | BN | bigint ]
	"PSP22::allowance" : readonly [ string, string ]
	"PSP22::transfer_from" : readonly [ string, string, string | number | BN | bigint, (number)[] ]
	"PSP22::transfer" : readonly [ string, string | number | BN | bigint, (number)[] ]
	"PSP22::total_supply" : readonly [  ]
	"PSP22::decrease_allowance" : readonly [ string, string | number | BN | bigint ]
	"PSP22::approve" : readonly [ string, string | number | BN | bigint ]
	"PSP22::increase_allowance" : readonly [ string, string | number | BN | bigint ]
	"PSP22::balance_of" : readonly [ string ]
	"PSP22Metadata::token_decimals" : readonly [  ]
	"PSP22Metadata::token_name" : readonly [  ]
	"PSP22Metadata::token_symbol" : readonly [  ]
	"PSP22Mintable::mint" : readonly [ string, string | number | BN | bigint ]
	"WNative::deposit" : readonly [  ]
	"WNative::withdraw" : readonly [ string | number | BN | bigint ]

}
