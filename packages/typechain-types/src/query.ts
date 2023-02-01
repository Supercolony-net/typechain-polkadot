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
import {Result, ResultBuilder, ReturnNumber} from "./types";
import {Weight, WeightV2} from '@polkadot/types/interfaces';
import {ApiPromise} from "@polkadot/api";
import { BN_ONE, BN_ZERO, BN_HUNDRED } from '@polkadot/util';
import {BN} from "bn.js";
import {convertWeight} from "@polkadot/api-contract/base/util";

const MAX_CALL_GAS = new BN(5_000_000_000_000).isub(BN_ONE);

type QueryReturnType<T> = {
	value : T;
	gasConsumed : Weight;
	gasRequired : Weight;
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
	api: ApiPromise,
	nativeContract : ContractPromise,
	callerAddress : string,
	title : string,
	args ? : readonly RequestArgumentType[],
	gasLimitAndValue ? : GasLimitAndValue,
	handler: (json: AnyJson) => T = (json: AnyJson): T => {
		return json as unknown as T;
	},
) : Promise< QueryReturnType<T> > {
	const { output, gasConsumed, gasRequired } = await queryOutput(
		api, nativeContract, callerAddress,
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
		value: handler(output.toJSON()),
		gasConsumed,
		gasRequired,
	};
}

/**
 * For mutating methods, that return { ok, err } responses.
 *
 * @throws { QueryOkCallError }
 */
export async function queryOkJSON<T>(
	api: ApiPromise,
	nativeContract : ContractPromise,
	callerAddress : string,
	//
	title : string,
	args ? : readonly RequestArgumentType[],
	gasLimitAndValue ? : GasLimitAndValue,
	handler: (json: AnyJson) => T = (json: AnyJson): T => {
		return json as unknown as T;
	},
) : Promise< QueryReturnType<T> > {
	const { output, gasConsumed, gasRequired } = await queryOutput(
		api, nativeContract, callerAddress,
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

	return {
		value: handler(_value),
		gasConsumed,
		gasRequired,
	};
}

/**
 * @throws { QueryCallError }
 */
export async function queryOutput(
	api: ApiPromise,
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
	const _gasLimitAndValue = await _genValidGasLimitAndValue(api, gasLimitAndValue);

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
		gasRequired,
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
		gasConsumed: gasConsumed,
		gasRequired: gasRequired,
	};
}

async function _genValidGasLimitAndValue(api: ApiPromise, gasLimitAndValue ? : GasLimitAndValue) : Promise<GasLimitAndValue> {
	if(gasLimitAndValue == null) {
		return {
			// @ts-ignore
			gasLimit: api.registry.createType('WeightV2', {
				refTime: convertWeight(
					api.consts.system.blockWeights
						? (api.consts.system.blockWeights as unknown as { maxBlock: WeightV2 }).maxBlock
						: api.consts.system.maximumBlockWeight as Weight
				).v1Weight.muln(64).div(BN_HUNDRED),
				proofSize: MAX_CALL_GAS,
			}) as WeightV2,
			value: BN_ZERO
		};
	}

	let { value, gasLimit } = gasLimitAndValue;

	if(!value) value = BN_ZERO;
	// @ts-ignore
	if(gasLimit == null) gasLimit = api.registry.createType('WeightV2', {
		refTime: convertWeight(
			api.consts.system.blockWeights
				? (api.consts.system.blockWeights as unknown as { maxBlock: WeightV2 }).maxBlock
				: api.consts.system.maximumBlockWeight as Weight
		).v1Weight.muln(64).div(BN_HUNDRED),
		proofSize: MAX_CALL_GAS,
	}) as WeightV2;

	return { value, gasLimit };
}

export function handleReturnType(result: any, typeDescription: any): any {
	if (typeof result === 'undefined' || typeof typeDescription === 'undefined') return result;
	if (result === null || typeDescription == null) return result;
	if(typeDescription.isResult) {
		return new Result(
			handleReturnType(result.ok, typeDescription.body.ok),
			handleReturnType(result.err, typeDescription.body.err)
		);
	}
	if(typeDescription.name === 'ReturnNumber') return new ReturnNumber(result as (string | number));
	if(typeof result !== 'object' || typeof typeDescription !== 'object' || typeDescription.isPrimitive) return result;
	if(typeDescription.name === 'Array') {
		Object.entries(result).forEach(([key, value]) => {
			result[key] = handleReturnType(value, typeDescription.body[0]);
		});
		return result;
	}
	Object.entries(result).forEach((obj) => {
		result[obj[0]] = handleReturnType(obj[1], typeDescription.body[obj[0]]);
	});
	return result;
}

export function handleEventReturn(result: any, eventDescription: any): any {
	if (typeof result === 'undefined') return result;

	Object.entries(result).forEach((obj) => {
		result[obj[0]] = handleReturnType(obj[1], eventDescription.body[obj[0]]);
	});

	return result;
}