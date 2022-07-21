import type { ContractPromise } from "@polkadot/api-contract";
import type {
	RequestArgumentType, GasLimitAndValue, MethodDoesntExistError,
} from './types';
import {
	_genValidGasLimitAndValue,
} from './query';
import type {
	SubmittableExtrinsic,
} from '@polkadot/api/submittable/types';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { Registry } from '@polkadot/types-codec/types';
import type {ApiPromise, SubmittableResult} from "@polkadot/api";
import type {DecodedEvent} from "@polkadot/api-contract/types";

type SignAndSendSuccessResponse = {
	from: string;
	txHash?: string;
	blockHash?: string;
	result?: SubmittableResult;
	error?: {
		message?: any;
		data?: any;
	};
	events?: DecodedEvent[];
};

export type {
	SignAndSendSuccessResponse,
};

export function txSignAndSend(
	nativeAPI: ApiPromise,
	nativeContract : ContractPromise,
	keyringPair : KeyringPair,
	title : string,
	args ? : readonly RequestArgumentType[],
	gasLimitAndValue ? : GasLimitAndValue,
) {
	const submittableExtrinsic = buildSubmittableExtrinsic(
		nativeContract,
		title, args, gasLimitAndValue,
	);
	return _signAndSend(nativeAPI.registry, submittableExtrinsic, keyringPair);
}

export function buildSubmittableExtrinsic(
	nativeContract : ContractPromise,
	title : string,
	args ? : readonly RequestArgumentType[],
	gasLimitAndValue ? : GasLimitAndValue,
) {
	if(nativeContract.tx[title] == null) {
		const error : MethodDoesntExistError = {
			issue: 'METHOD_DOESNT_EXIST',
			texts: [`Method name: '${title}'`],
		};
		throw error;
	}

	const _args = args || [];
	const _gasLimitAndValue = _genValidGasLimitAndValue(gasLimitAndValue);

	const submittableExtrinsic = nativeContract.tx[title]!(
		_gasLimitAndValue,
		..._args,
	);

	return submittableExtrinsic;
}

/**
 * (i) For reference, see:
 * 	- https://polkadot.js.org/docs/api/cookbook/tx#how-do-i-get-the-decoded-enum-for-an-extrinsicfailed-event
 * 	- `@redspot/patract/buildTx`
 */
export async function _signAndSend(
	registry: Registry,
	extrinsic: SubmittableExtrinsic<'promise'>,
	signer: KeyringPair,
): Promise<SignAndSendSuccessResponse> {
	const signerAddress = signer.address;

	return new Promise((resolve, reject) => {
		const actionStatus = {
			from: signerAddress.toString(),
			txHash: extrinsic.hash.toHex(),
		} as SignAndSendSuccessResponse;

		extrinsic
			.signAndSend(
				signer,
				(result: SubmittableResult) => {
					if (result.status.isInBlock) {
						actionStatus.blockHash = result.status.asInBlock.toHex();
					}

					if (result.status.isFinalized || result.status.isInBlock) {
						result.events
							.filter(
								({ event: { section } }: any): boolean => section === 'system'
							)
							.forEach((event: any): void => {
								const {
									event: { data, method },
								} = event;

								if (method === 'ExtrinsicFailed') {
									const [dispatchError] = data;
									let message = dispatchError.type;

									if (dispatchError.isModule) {
										try {
											const mod = dispatchError.asModule;
											const error = registry.findMetaError(
												new Uint8Array([
													mod.index.toNumber(),
													mod.error.toNumber()
												])
											);
											message = `${error.section}.${error.name}${
												Array.isArray(error.docs)
													? `(${error.docs.join('')})`
													: error.docs || ''
											}`;
										} catch (error) {
											// swallow
										}
									}

									actionStatus.error = {
										message,
									};

									reject(actionStatus);
								} else if (method === 'ExtrinsicSuccess') {
									actionStatus.result = result;
									resolve(actionStatus as SignAndSendSuccessResponse);
								}
							});
					} else if (result.isError) {
						actionStatus.error = {
							data: result,
						};
						actionStatus.events = undefined;

						reject(actionStatus);
					}
				}
			)
			.catch((error: any) => {
				actionStatus.error = {
					message: error.message,
				};

				reject(actionStatus);
			});
	});
}