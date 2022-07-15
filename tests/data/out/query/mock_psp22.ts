/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ArgumentsTypes } from '../arguments/mock_psp22';
import type OkishReturns from '../return-values/mock_psp22';
import type { GasLimit, GasLimitAndRequiredValue } from '../_sdk/types';
import type { QueryReturnType } from '../_sdk/query';
import { queryJSON, queryOkJSON } from '../_sdk/query';


export default class Methods {
	private __nativeContract : ContractPromise;
	private __callerAddress : string;

	constructor(
		nativeContract : ContractPromise,
		callerAddress : string,
	) {
		this.__nativeContract = nativeContract;
		this.__callerAddress = callerAddress;
	}
	/** */
	"change_state" (
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["12"] > > {
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "changeState", [], __options );
	}
	/** */
	"cap" (
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["0"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "cap", [], __options );
	}
	/**
	 * @arg owner
	 */
	"PSP22::balance_of" (
		owner : ArgumentsTypes["2"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["0"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22::balanceOf", [owner], __options );
	}
	/**
	 * @arg to
	 * @arg value
	 * @arg data
	 */
	"PSP22::transfer" (
		to : ArgumentsTypes["2"],
		value : ArgumentsTypes["0"],
		data : ArgumentsTypes["14"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["12"] > > {
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp22::transfer", [to, value, data], __options );
	}
	/**
	 * @arg spender
	 * @arg value
	 */
	"PSP22::approve" (
		spender : ArgumentsTypes["2"],
		value : ArgumentsTypes["0"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["12"] > > {
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp22::approve", [spender, value], __options );
	}
	/**
	 * @arg spender
	 * @arg delta_value
	 */
	"PSP22::increase_allowance" (
		spender : ArgumentsTypes["2"],
		delta_value : ArgumentsTypes["0"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["12"] > > {
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp22::increaseAllowance", [spender, delta_value], __options );
	}
	/** */
	"PSP22::total_supply" (
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["0"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22::totalSupply", [], __options );
	}
	/**
	 * @arg spender
	 * @arg delta_value
	 */
	"PSP22::decrease_allowance" (
		spender : ArgumentsTypes["2"],
		delta_value : ArgumentsTypes["0"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["12"] > > {
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp22::decreaseAllowance", [spender, delta_value], __options );
	}
	/**
	 * @arg from
	 * @arg to
	 * @arg value
	 * @arg data
	 */
	"PSP22::transfer_from" (
		from : ArgumentsTypes["2"],
		to : ArgumentsTypes["2"],
		value : ArgumentsTypes["0"],
		data : ArgumentsTypes["14"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["12"] > > {
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp22::transferFrom", [from, to, value, data], __options );
	}
	/**
	 * @arg owner
	 * @arg spender
	 */
	"PSP22::allowance" (
		owner : ArgumentsTypes["2"],
		spender : ArgumentsTypes["2"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["0"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22::allowance", [owner, spender], __options );
	}
	/** */
	"PSP22Metadata::token_decimals" (
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["4"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22Metadata::tokenDecimals", [], __options );
	}
	/** */
	"PSP22Metadata::token_symbol" (
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["11"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22Metadata::tokenSymbol", [], __options );
	}
	/** */
	"PSP22Metadata::token_name" (
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["11"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "psp22Metadata::tokenName", [], __options );
	}
	/**
	 * @arg account
	 * @arg amount
	 */
	"PSP22Wrapper::withdraw_to" (
		account : ArgumentsTypes["2"],
		amount : ArgumentsTypes["0"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["12"] > > {
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp22Wrapper::withdrawTo", [account, amount], __options );
	}
	/**
	 * @arg account
	 * @arg amount
	 */
	"PSP22Wrapper::deposit_for" (
		account : ArgumentsTypes["2"],
		amount : ArgumentsTypes["0"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["12"] > > {
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp22Wrapper::depositFor", [account, amount], __options );
	}
	/**
	 * @arg token
	 */
	"FlashLender::max_flashloan" (
		token : ArgumentsTypes["2"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["0"] > > {
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "flashLender::maxFlashloan", [token], __options );
	}
	/**
	 * @arg receiver_account
	 * @arg token
	 * @arg amount
	 * @arg data
	 */
	"FlashLender::flashloan" (
		receiver_account : ArgumentsTypes["2"],
		token : ArgumentsTypes["2"],
		amount : ArgumentsTypes["0"],
		data : ArgumentsTypes["14"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["15"] > > {
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "flashLender::flashloan", [receiver_account, token, amount, data], __options );
	}
	/**
	 * @arg token
	 * @arg amount
	 */
	"FlashLender::flash_fee" (
		token : ArgumentsTypes["2"],
		amount : ArgumentsTypes["0"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["17"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "flashLender::flashFee", [token, amount], __options );
	}
	/** */
	"Pausable::paused" (
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["10"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "pausable::paused", [], __options );
	}
	/**
	 * @arg new_owner
	 */
	"Ownable::transfer_ownership" (
		new_owner : ArgumentsTypes["2"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["18"] > > {
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "ownable::transferOwnership", [new_owner], __options );
	}
	/** */
	"Ownable::owner" (
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["2"] > > {
		return queryJSON( this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options );
	}
	/** */
	"Ownable::renounce_ownership" (
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["18"] > > {
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "ownable::renounceOwnership", [], __options );
	}
	/**
	 * @arg account
	 * @arg amount
	 */
	"PSP22Burnable::burn" (
		account : ArgumentsTypes["2"],
		amount : ArgumentsTypes["0"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["12"] > > {
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp22Burnable::burn", [account, amount], __options );
	}
	/**
	 * @arg account
	 * @arg amount
	 */
	"PSP22Mintable::mint" (
		account : ArgumentsTypes["2"],
		amount : ArgumentsTypes["0"],
		__options ? : GasLimit,
	) : Promise< QueryReturnType< OkishReturns["12"] > > {
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "psp22Mintable::mint", [account, amount], __options );
	}

}
