// Copyright (c) 2012-2022 Supercolony
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the"Software"),
// to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import BN from 'bn.js';
// @ts-ignore
import type { ContractExecResultErr } from '@polkadot/types/interfaces/contracts/types';
import type {AnyJson} from "@polkadot/types-codec/types";
import fs from "fs";
import {WeightV2} from "@polkadot/types/interfaces";

export type RequestArgumentType = number | string | boolean | bigint
	| (string | number)[]
	| BN | null | AnyJson | Object;

export interface GasLimit {
	/**
	 * Defaults to `-1`
	 */
	gasLimit ? : WeightV2 | null;
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

export class Result<T, E> {
	constructor(ok?: T, err?: E) {
		this.ok = ok;
		this.err = err;
	}

	ok ?: T;
	err ?: E;

	unwrap(): T {
		if (this.ok) {
			return this.ok;
		}

		throw this.err;
	}

	unwrapRecursively(): T {
		if (this.ok) {
			if (this.ok instanceof Result) {
				return this.ok.unwrapRecursively();
			}

			return this.ok;
		}

		if(this.err)throw this.err;

		return this.ok;
	}
}

export class ResultBuilder{
	static Ok<T, E>(value : T) : Result<T, E> {
		return new Result<T, E>(value, undefined);
	}
	static Err<T, E>(error : E) : Result<T, E> {
		return new Result<T, E>(undefined, error);
	}
}

export class ReturnNumber {
	readonly rawNumber: BN;

	constructor(
		value: number | string | BN,
	) {
		if (typeof value == "string") {
			this.rawNumber = new BN(value.substring(2), 16);
		} else {
			this.rawNumber = new BN(value);
		}
	}

	toString() {
		return this.rawNumber.toString();
	}

	toHuman() {
		return this.toString();
	}

	toNumber() {
		return this.rawNumber.toNumber();
	}

	static ToBN(value: number | string) {
		return new ReturnNumber(value).rawNumber;
	}
}

export interface ReturnedEvent {
	name: string;
	args: Record<string, AnyJson>;
}