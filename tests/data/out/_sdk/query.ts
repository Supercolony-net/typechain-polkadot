import type { ContractPromise } from "@polkadot/api-contract";
import type { ContractCallOutcome } from '@polkadot/api-contract/types';
import type { AnyJson } from '@polkadot/types-codec/types';
import type {
	RequestArgumentType, GasLimitAndValue,
	QueryCallError, QueryOkCallError,
} from './types';

const DEF_GAS_LIMIT_AND_VALUE : GasLimitAndValue = {
	value: 0,
	gasLimit: -1,
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
export async function queryJSON<T extends AnyJson>(
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

	let _value = output.toJSON();

	// [ ok-err case ]
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
		value: _value as T,
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

	console.log(
		`\nContract.queryString(${title}) call:`,
		`\n > contract address:`, contractAddress,
		`\n > caller:`, callerAddress,
		`\n > arguments:`, _args,
		`\n > gasLimitAndValue:`, _gasLimitAndValue,
		'\n',
	);

	let response : ContractCallOutcome;
	let error : QueryCallError | undefined;
	try {
		response = await nativeContract.query[title]!(
			callerAddress,
			_gasLimitAndValue,
			..._args,
		);
		// as ContractCallOutcome; // Fix for typing in TS version, used by 'tsdx'. Othervise fails on 'build'
	}
	catch(caughtError) {
		error = {
			issue: 'FAIL_AT_CALL',
			// method: title,
			// args: _args,
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

	console.log(
		`\nContract.queryString(${title}) response:`,
		`\n > status: [isOk: ${result.isOk}; isErr: ${result.isErr}] `, // result.isErr ? result.asErr : '',
		`\n > gasConsumed:`, gasConsumed.toBigInt(),
		`\n > !!output:`, !!output,
		// `\n > output:`, output,
		`\n > typeof output.toJSON():`, typeof resValueJSON,
		`\n > output.toString():`, resValueStr,
		`\n > output.toJSON():`, resValueJSON,
		'\n',
	);

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

//// PRIVATE

function _genValidGasLimitAndValue(gasLimitAndValue ? : GasLimitAndValue) : GasLimitAndValue{
	if(gasLimitAndValue == null) return DEF_GAS_LIMIT_AND_VALUE;

	let { value, gasLimit } = gasLimitAndValue;

	if(!value) value = 0;
	if(gasLimit == null) gasLimit = -1;

	return { value, gasLimit };
}