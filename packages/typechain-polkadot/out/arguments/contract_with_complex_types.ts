/* This file is auto-generated */

import BN from 'bn.js';
import { ComplexStruct1, ModForComplexStructOverflow_ComplexStruct1, AccountId } from '../types-arguments/contract_with_complex_types';

export interface ArgumentsTypes {
	"14": ComplexStruct1;
	"18": ModForComplexStructOverflow_ComplexStruct1;
	"2": AccountId;
	"0": (string | number | BN);
	"19": Array<(number | string | BN)>;
	"11": string | null;
	"4": (number | string | BN);
}

export interface ArgumentsTuples {
	"change_state": readonly [ ];
	"cap": readonly [ ];
	"get_complex_struct_1": readonly [ ];
	"get_complex_struct_2": readonly [ ];
	"get_complex_struct_3": readonly [ ComplexStruct1 ];
	"get_complex_struct_4": readonly [ ModForComplexStructOverflow_ComplexStruct1 ];
	"PSP22::approve": readonly [ AccountId,  (string | number | BN) ];
	"PSP22::decrease_allowance": readonly [ AccountId,  (string | number | BN) ];
	"PSP22::transfer_from": readonly [ AccountId,  AccountId,  (string | number | BN),  Array<(number | string | BN)> ];
	"PSP22::transfer": readonly [ AccountId,  (string | number | BN),  Array<(number | string | BN)> ];
	"PSP22::total_supply": readonly [ ];
	"PSP22::allowance": readonly [ AccountId,  AccountId ];
	"PSP22::balance_of": readonly [ AccountId ];
	"PSP22::increase_allowance": readonly [ AccountId,  (string | number | BN) ];
	"PSP22Metadata::token_symbol": readonly [ ];
	"PSP22Metadata::token_name": readonly [ ];
	"PSP22Metadata::token_decimals": readonly [ ];
	"PSP22Wrapper::withdraw_to": readonly [ AccountId,  (string | number | BN) ];
	"PSP22Wrapper::deposit_for": readonly [ AccountId,  (string | number | BN) ];
	"FlashLender::max_flashloan": readonly [ AccountId ];
	"FlashLender::flash_fee": readonly [ AccountId,  (string | number | BN) ];
	"FlashLender::flashloan": readonly [ AccountId,  AccountId,  (string | number | BN),  Array<(number | string | BN)> ];
	"Pausable::paused": readonly [ ];
	"Ownable::owner": readonly [ ];
	"Ownable::renounce_ownership": readonly [ ];
	"Ownable::transfer_ownership": readonly [ AccountId ];
	"PSP22Burnable::burn": readonly [ AccountId,  (string | number | BN) ];
	"PSP22Mintable::mint": readonly [ AccountId,  (string | number | BN) ];
}