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

import type { ContractPromise } from "@polkadot/api-contract";
import type { ContractCallOutcome } from '@polkadot/api-contract/types';
import type { AnyJson } from '@polkadot/types-codec/types';
import type {
	RequestArgumentType, GasLimitAndValue,
	QueryCallError, QueryOkCallError,
} from './types';

const DEF_GAS_LIMIT_AND_VALUE : GasLimitAndValue = {
	value: 0,
	gasLimit: 1000000 * 1000000,
};

type QueryReturnType<T> = {
	value : T;
	gasConsumed : bigint;
};

export type {
	QueryReturnType,
};

export {
	_genValidGasLimitAndValue,
};

/**
 * @throws { QueryCallError }
 */
export async function queryJSON<T>(
	nativeContract : ContractPromise,
	callerAddress : string,
	title : string,
	args ? : readonly RequestArgumentType[],
	gasLimitAndValue ? : GasLimitAndValue,
) : Promise< QueryReturnType<T> > {
	const { output, gasConsumed } = await queryOutput(
		nativeContract, callerAddress,
		title, args, gasLimitAndValue,
	);

	let _value = output.toJSON();

	if(_value && typeof _value === 'object') {
		if('err' in _value) {
			const error : QueryOkCallError = {
				issue: 'READ_ERR_IN_BODY',
				_err: _value.err,
			};
			throw error;
		}
		if('ok' in _value) _value = _value.ok;
	}

	return {
		value: output.toJSON() as unknown as T,
		gasConsumed,
	};
}

/**
 * For mutating methods, that return { ok, err } responses.
 *
 * @throws { QueryOkCallError }
 */
export async function queryOkJSON<T extends AnyJson>(
	nativeContract : ContractPromise,
	callerAddress : string,
	//
	title : string,
	args ? : readonly RequestArgumentType[],
	gasLimitAndValue ? : GasLimitAndValue,
) : Promise< QueryReturnType<T> > {
	const { output, gasConsumed } = await queryOutput(
		nativeContract, callerAddress,
		title, args, gasLimitAndValue,
	);
	const _value = output.toJSON();

	if(_value == null || typeof _value !== 'object') {
		const error : QueryOkCallError = {
			issue: 'BODY_ISNT_OKERR',
			value: _value,
		};
		throw error;
	}

	if('err' in _value) {
		const error : QueryOkCallError = {
			issue: 'READ_ERR_IN_BODY',
			_err: _value.err,
		};
		throw error;
	}

	if( !('ok' in _value) ) {
		const error : QueryOkCallError = {
			issue: 'BODY_ISNT_OKERR',
			value: _value,
		};
		throw error;
	}

	return {
		value: _value.ok as T,
		gasConsumed,
	};
}

/**
 * @throws { QueryCallError }
 */
export async function queryOutput(
	nativeContract : ContractPromise,
	callerAddress : string,
	//
	title : string,
	args ? : readonly RequestArgumentType[],
	gasLimitAndValue ? : GasLimitAndValue,
) {
	const contractAddress = nativeContract.address.toString();
	if (nativeContract.query[title] == null) {
		const error : QueryCallError = {
			issue: 'METHOD_DOESNT_EXIST',
			texts: [`Method name: '${title}'`],
		};
		throw error;
	}

	const _args = args || [];
	const _gasLimitAndValue = _genValidGasLimitAndValue(gasLimitAndValue);

	let response : ContractCallOutcome;
	let error : QueryCallError | undefined;
	try {
		response = await nativeContract.query[title]!(
			callerAddress,
			_gasLimitAndValue,
			..._args,
		);
	}
	catch(caughtError) {
		error = {
			issue: 'FAIL_AT_CALL',
			caughtError,
		};
		console.error(
			`\nContract.queryString(${title}) error:`,
			`\n > error:`, error,
			'\n',
		);
		throw error;
	}

	const {
		gasConsumed,
		result,
		output,
	} = response;

	const resValueStr = output ? output.toString() : null;
	const resValueJSON = output ? output.toJSON() : null;

	if(result.isErr) error = {
		issue: 'FAIL_AFTER_CALL::IS_ERROR',
		_resultIsOk: result.isOk,
		_asError: result.isErr ? result.asErr : undefined,
	};

	if(result.isOk === false) error = {
		issue: 'FAIL_AFTER_CALL::RESULT_NOT_OK',
		_asError: result.isErr ? result.asErr : undefined,
	};

	if(output == null) error = {
		issue: 'OUTPUT_IS_NULL',
	};

	if(error) throw error;

	return {
		output: output!,
		gasConsumed: gasConsumed.toBigInt(),
	};
}

function _genValidGasLimitAndValue(gasLimitAndValue ? : GasLimitAndValue) : GasLimitAndValue{
	if(gasLimitAndValue == null) return DEF_GAS_LIMIT_AND_VALUE;

	let { value, gasLimit } = gasLimitAndValue;

	if(!value) value = 0;
	if(gasLimit == null) gasLimit = 1000000 * 1000000;

	return { value, gasLimit };
}