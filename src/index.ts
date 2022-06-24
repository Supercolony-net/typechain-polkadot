import type ABI from './abi_interface';
// import __TEST_ABI from '../artifacts/mock_psp22.json';



////


export function _decodeOneArgumentType(__typeId : number, __types : ABI['V3']['types']) {
	const __type = __types.find(t => t.id === __typeId);
	if(__type == null) return {
		id: __typeId,
		tsStr: 'never',
	};
	let _tsStr : string | undefined;
	if(__type.type.def.primitive) {
		switch(__type.type.def.primitive) {
			case 'str': _tsStr = 'string'; break;
			case 'bool': _tsStr = 'boolean'; break;
			case 'u8': _tsStr = 'number'; break;
			case 'u64': _tsStr = 'number'; break; // (?) | BN | bigint
			case 'u128': _tsStr = 'string | number | BN | bigint'; break;
			default: _tsStr = 'never';
		}
	}
	else if(__type.type.def.composite) {
		if(__type.type.def.composite.fields[0]?.typeName === '[u8; 32]')
			_tsStr = 'string';
	}
	else if(__type.type.def.array) {
		const __array_len = __type.type.def.array.len;
		const __array_typeId = __type.type.def.array.type;
		const __array_type = __types.find(__t => __t.id === __array_typeId);
		if(__array_type?.type.def.primitive === 'u8')
			_tsStr = "`0x${string}`";
	}
	else if(__type.type.def.sequence) {
		const __sequence_of_typeId = __type.type.def.sequence.type;
		_tsStr = `(${ _decodeOneArgumentType(__sequence_of_typeId, __types).tsStr })[]`;
	}
	else if(__type.type.def.tuple) {
		const _tuple_types = __type.type.def.tuple.map(tId => _decodeOneArgumentType(tId, __types) );
		_tsStr = `[ ${ _tuple_types.map(t => t.tsStr).join(', ') } ]`;
	}
	//
	/*
	else if(__type.type.def.variant && __type.type.params) {
		const __params = __type.type.params;
		const __params_T_typeId = __params.find(__p => __p.name === 'T')!.type;
		const __params_T_type = __types.find(t => t.id === __params_T_typeId);
		if(__params_T_type?.type.def.sequence) {
			const __params_T_type_sequence_typeId = __params_T_type.type.def.sequence.type;
			const __params_T_type_sequence_type = __types.find(t => t.id === __params_T_type_sequence_typeId);
			if(__params_T_type_sequence_type?.type.def.primitive === 'u128')
				_tsStr = "string[]";
		}
	}
	*/

	return {
		id: __type.id,
		tsStr: _tsStr || 'never',
	};
}

export function _decodeOneOkReturnType(
	__typeId : number,
	__types : ABI['V3']['types'],
) : {
	id : number,
	tsStr : string,
	// okErrType ? : true,
} {
	const __type = __types.find(t => t.id === __typeId);
	if(__type == null) return {
		id: __typeId,
		tsStr: 'never',
	};
	let _tsStr : string | undefined;
	//
	/*
	if(__type.type.params) {
		const __params = __type.type.params;
		const __params_T_typeId = __params.find(__p => __p.name === 'T')!.type;
		const __params_T_type = __types.find(t => t.id === __params_T_typeId);
		if(__params_T_type?.type.def.sequence) {
			const __params_T_type_sequence_typeId = __params_T_type.type.def.sequence.type;
			const __params_T_type_sequence_type = __types.find(t => t.id === __params_T_type_sequence_typeId);
			if(__params_T_type_sequence_type?.type.def.primitive === 'u128')
				_tsStr = "string[]";
		}
	} else
	*/
	if(__type.type.params) {
		const _okTypeId = __type.type.params.find(p => p.name === 'T')!.type;
		_tsStr = _decodeOneOkReturnType_(_okTypeId, __types).tsStr;
	}
	else if(__type.type.def.variant) {
		//
	}
	else return {
		id: __type.id,
		// okErrType: true,
		tsStr: _decodeOneOkReturnType_(__type.id, __types).tsStr,
	};

	return {
		id: __type.id,
		tsStr: _tsStr || 'never',
	};
}


//// PRIVATE

function _decodeOneOkReturnType_(__typeId : number, __types : ABI['V3']['types']) {
	const __type = __types.find(t => t.id === __typeId);
	if(__type == null) return {
		id: __typeId,
		tsStr: 'never',
	};
	let _tsStr : string | undefined;
	if(__type.type.def.primitive) {
		switch(__type.type.def.primitive) {
			case 'str': _tsStr = 'string'; break;
			case 'bool': _tsStr = 'boolean'; break;
			case 'u8': _tsStr = 'number'; break;
			/**
			 * Seen as number in "Pool::get_reserves" in both output.[toString | toJSON]()
			 */
			case 'u64': _tsStr = 'number'; break;
			/**
			 * Seen as `0x${string}` in "Pool::get_reserves" in both output.[toString | toJSON]()
			 * Seen as number in "Router::get_amounts_in" in both output.[toString | toJSON]()
			 */
			case 'u128': _tsStr = "`0x${string}` | number"; break;
			default: _tsStr = 'never';
		}
	}
	else if(__type.type.def.composite) {
		if(__type.type.def.composite.fields[0]?.typeName === '[u8; 32]')
			_tsStr = 'string';
	}
	else if(__type.type.def.array) {
		const __array_len = __type.type.def.array.len;
		const __array_typeId = __type.type.def.array.type;
		const __array_type = __types.find(__t => __t.id === __array_typeId);
		if(__array_type?.type.def.primitive === 'u8')
			_tsStr = "`0x${string}`";
	}
	else if(__type.type.def.sequence) {
		const __sequence_of_typeId = __type.type.def.sequence.type;
		_tsStr = `(${ _decodeOneOkReturnType_(__sequence_of_typeId, __types).tsStr })[]`;
	}
	else if(__type.type.def.tuple) {
		if(__type.type.def.tuple.length) {
			const _tuple_types = __type.type.def.tuple.map(tId => _decodeOneOkReturnType_(tId, __types) );
			_tsStr = `[ ${ _tuple_types.map(t => t.tsStr).join(', ') } ]`;
		}
		else {
			_tsStr = 'null'; // Seen in "Router::swap_tokens_for_exact_tokens"
		}
	}

	return {
		id: __type.id,
		tsStr: _tsStr || 'never',
	};
}