import type { ContractPromise } from "@polkadot/api-contract";
import type { AnyJson } from '@polkadot/types-codec/types';
import type { RequestArgumentType, GasLimitAndValue } from './types';
import { Weight } from '@polkadot/types/interfaces';
import { ApiPromise } from "@polkadot/api";
type QueryReturnType<T> = {
    value: T;
    gasConsumed: Weight;
    gasRequired: Weight;
};
export type { QueryReturnType, };
export { _genValidGasLimitAndValue, };
/**
 * @throws { QueryCallError }
 */
export declare function queryJSON<T>(api: ApiPromise, nativeContract: ContractPromise, callerAddress: string, title: string, args?: readonly RequestArgumentType[], gasLimitAndValue?: GasLimitAndValue, handler?: (json: AnyJson) => T): Promise<QueryReturnType<T>>;
/**
 * For mutating methods, that return { ok, err } responses.
 *
 * @throws { QueryOkCallError }
 */
export declare function queryOkJSON<T>(api: ApiPromise, nativeContract: ContractPromise, callerAddress: string, title: string, args?: readonly RequestArgumentType[], gasLimitAndValue?: GasLimitAndValue, handler?: (json: AnyJson) => T): Promise<QueryReturnType<T>>;
/**
 * @throws { QueryCallError }
 */
export declare function queryOutput(api: ApiPromise, nativeContract: ContractPromise, callerAddress: string, title: string, args?: readonly RequestArgumentType[], gasLimitAndValue?: GasLimitAndValue): Promise<{
    output: import("@polkadot/types-codec/types").Codec;
    gasConsumed: Weight;
    gasRequired: Weight;
}>;
declare function _genValidGasLimitAndValue(api: ApiPromise, gasLimitAndValue?: GasLimitAndValue): Promise<GasLimitAndValue>;
export declare function handleReturnType(result: any, typeDescription: any): any;
export declare function handleEventReturn(result: any, eventDescription: any): any;
//# sourceMappingURL=query.d.ts.map