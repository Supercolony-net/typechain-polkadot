import type BN from 'bn.js';
// @ts-ignore
import type { ContractExecResultErr } from '@polkadot/types/interfaces/contracts/types';
import type {AnyJson} from "@polkadot/types-codec/types";



//////

export type RequestArgumentType = number | string | boolean | bigint
	| (string | number)[]
	| BN | null | AnyJson | Object;
	// | BigNumber

export interface GasLimit {
	/**
	 * Defaults to `-1`
	 */
	gasLimit ? : bigint | BN | string | number;
}

export interface GasLimitAndValue extends GasLimit {
	/**
	 * Only required for 'payable' methods
	 * Defaults to `0`
	 */
	value ? : bigint | BN | string | number;
};

export interface GasLimitAndRequiredValue extends GasLimit {
	/**
	 * Only required for 'payable' methods
	 * Defaults to `0`
	 */
	value : bigint | BN | string | number;
}

export interface ConstructorOptions extends GasLimitAndValue {
	storageDepositLimit ? : bigint | BN | string | number;
}

//

export interface ErrorWithTexts {
	texts ? : string[];
};

export type MethodDoesntExistError = ErrorWithTexts & {
	issue : 'METHOD_DOESNT_EXIST',
};


export type QueryCallError = MethodDoesntExistError | ErrorWithTexts & (
	{
		issue : 'FAIL_AT_CALL';
		caughtError : unknown;
	} | {
		issue : 'FAIL_AFTER_CALL::IS_ERROR';
		_resultIsOk : boolean;
		_asError ? : ContractExecResultErr;
	} | {
		issue : 'FAIL_AFTER_CALL::RESULT_NOT_OK';
		_asError ? : ContractExecResultErr;
	} | {
		issue : 'OUTPUT_IS_NULL',
	}
);

export type QueryOkCallError = QueryCallError | {
	issue : 'READ_ERR_IN_BODY',
	_err : any;
} | {
	issue : 'BODY_ISNT_OKERR',
	value : any;
};