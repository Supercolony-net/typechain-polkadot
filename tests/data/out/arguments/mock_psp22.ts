/* This file is auto-generated */

import type BN from 'bn.js';

export interface ArgumentsTypes {
	"2" : string;
	"0" : string | number | BN | bigint;
	"14" : (number)[];

}

export interface ArgumentsTuples {
	"change_state" : readonly [  ]
	"cap" : readonly [  ]
	"PSP22::balance_of" : readonly [ string ]
	"PSP22::transfer" : readonly [ string, string | number | BN | bigint, (number)[] ]
	"PSP22::approve" : readonly [ string, string | number | BN | bigint ]
	"PSP22::increase_allowance" : readonly [ string, string | number | BN | bigint ]
	"PSP22::total_supply" : readonly [  ]
	"PSP22::decrease_allowance" : readonly [ string, string | number | BN | bigint ]
	"PSP22::transfer_from" : readonly [ string, string, string | number | BN | bigint, (number)[] ]
	"PSP22::allowance" : readonly [ string, string ]
	"PSP22Metadata::token_decimals" : readonly [  ]
	"PSP22Metadata::token_symbol" : readonly [  ]
	"PSP22Metadata::token_name" : readonly [  ]
	"PSP22Wrapper::withdraw_to" : readonly [ string, string | number | BN | bigint ]
	"PSP22Wrapper::deposit_for" : readonly [ string, string | number | BN | bigint ]
	"FlashLender::max_flashloan" : readonly [ string ]
	"FlashLender::flashloan" : readonly [ string, string, string | number | BN | bigint, (number)[] ]
	"FlashLender::flash_fee" : readonly [ string, string | number | BN | bigint ]
	"Pausable::paused" : readonly [  ]
	"Ownable::transfer_ownership" : readonly [ string ]
	"Ownable::owner" : readonly [  ]
	"Ownable::renounce_ownership" : readonly [  ]
	"PSP22Burnable::burn" : readonly [ string, string | number | BN | bigint ]
	"PSP22Mintable::mint" : readonly [ string, string | number | BN | bigint ]

}
