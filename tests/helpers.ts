import BN from 'bn.js';
import {
	hexToU8a,
	u8aToHex, u8aConcat, u8aToU8a,
	bnToHex, bnToU8a,
} from '@polkadot/util';
import * as PD_UtilCrypto from '@polkadot/util-crypto';
import * as ADDRESSES from './data/addresses';
import PoolABI from './data/abi/pool_contract.json';


//////

export const POOL_WEIGHT = '900000000000000000';

export const WN_MTST_POOL_KEY = genPoolKey(
	ADDRESSES.WN_TOKEN,
	ADDRESSES.MTST_TOKEN,
	new BN(POOL_WEIGHT)
);
export const MTST_ABHID_POOL_KEY = genPoolKey(
	ADDRESSES.MTST_TOKEN,
	ADDRESSES.ABHID_TOKEN,
	new BN(POOL_WEIGHT)
);

/**
 * @arg factoryAddress // : SS58 string
*/
export function getPoolAddress(
	factoryAddress: string,
	token0: string,
	token1: string,
	weight: BN,
) {
	const poolKey = token0 < token1
		? genPoolKey(token0, token1, weight)
		: genPoolKey(token1, token0, weight);

	const hex_address = _getCreate2Address(
		factoryAddress,
		poolKey,
		PoolABI.source.hash,
	);

	const address = _HEX_to_SS58(hex_address);

	return address;
}

/**
 * @arg token0Address // : SS58 string
 * @arg token1Address // : SS58 string
 * @arg w
 * @returns salt // : prefixed HEX string
 */
export function genPoolKey(
	token0Address: string,
	token1Address: string,
	w: BN
) {
	// w = w instanceof BN ? w : new BN(w.toString());
	return PD_UtilCrypto.blake2AsHex(u8aToU8a(u8aConcat(
		_SS58_to_U8A(token0Address),
		_SS58_to_U8A(token1Address),
		_U128_to_U8A(w)
	)));
}

export function getDeadline(userDeadline = 20): number {
	const deadline = new Date();
	deadline.setMinutes(deadline.getMinutes() + userDeadline);
	return deadline.getTime();
}



////// PRIVATE


// TYPES CONVERTION

/**
 * @returns // : Uint8Array(length)
 */
function _get_u8a_of_length(u8a: Uint8Array, length: number) {
	if (u8a.length >= length) return u8a;
	const result = new Uint8Array(length);
	result.set(u8a);

	return result;
}

function _HEX_to_SS58(hex_address: string) {
	return PD_UtilCrypto.encodeAddress(hex_address);
}

/**
 * @returns // : Uint8Array(32)
 */
function _SS58_to_U8A(ss58_address: string) {
	/*
	const dummy_api = new ApiPromise();
	const result = dummy_api.createType('AccountId', ss58_address).toU8a(); // (?) : Uint8Array(32) ?
	*/
	const result = _get_u8a_of_length(
		PD_UtilCrypto.decodeAddress(ss58_address), // (?) : Uint8Array(32) ?
		32
	);

	return result;
}

/**
 * @returns // : Uint8Array(16)
 */
function _U128_to_U8A(u128: BN) {
	/* [1]
	const dummy_api = new ApiPromise();
	const result = dummy_api.createType('u128', u128).toU8a(); // : Uint8Array(16)
	*/
	/* [2]
	const result = _get_u8a_of_length(
		bnToU8a(u128), // : Uint8Array(dynamic size)
		16
	);
	*/
	/* [3] */
	const result = bnToU8a(u128, { bitLength: 128 });

	return result;
}

/** get_account_id by Pierre
 * @arg deployer // : SS58 string
 * @arg wasmHash // : prefixed HEX string
 * @arg salt // : prefixed HEX string
 * @returns
 */
function _getCreate2Address(
	deployer : string,
	salt : string,
	wasmHash : string
) {
	const addressToU8a = _SS58_to_U8A(deployer);
	const hashToU8a = hexToU8a(wasmHash);
	const saltToU8a = hexToU8a(salt);

	const concat = new Uint8Array([...addressToU8a, ...hashToU8a, ...saltToU8a]);

	const result_hex = PD_UtilCrypto.blake2AsHex(concat);

	return result_hex;
}



/* RUBBISH

*/