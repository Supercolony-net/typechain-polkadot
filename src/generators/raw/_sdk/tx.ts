import type { ContractPromise } from "@polkadot/api-contract";
import type { RequestArgumentType, GasLimitAndValue, MethodDoesntExistError } from './types';
import { _genValidGasLimitAndValue } from './query';
import { u8aToBn } from '@polkadot/util';
import type { SubmittableExtrinsic } from '@polkadot/api/submittable/types';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { Registry } from '@polkadot/types-codec/types';


type SignAndSendSuccessResponse = {
	from : string;
	txHash : string;
	blockHash ? : string;
};

type SignAndSendError = {
	text ? : string;
};

export type {
	SignAndSendSuccessResponse,
};

export function txSignAndSend(
	nativeContract : ContractPromise,
	keyringPair : KeyringPair,
	//
	title : string,
	args ? : readonly RequestArgumentType[],
	gasLimitAndValue ? : GasLimitAndValue,
) {
	const submittableExtrinsic = buildSubmittableExtrinsic(
		nativeContract,
		title, args, gasLimitAndValue,
	);
	return _signAndSend(submittableExtrinsic, keyringPair);
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
export function _signAndSend(
	submittableExtrinsic : SubmittableExtrinsic<'promise'>,
	keyringPair : KeyringPair
) {
	const response : SignAndSendSuccessResponse = {
		from: keyringPair.address,
		txHash: submittableExtrinsic.hash.toHex(),
	};

	return new Promise<SignAndSendSuccessResponse>((resolve, reject) => {
		let unsub : () => void;

		submittableExtrinsic.signAndSend(
			keyringPair,
			submittableResult => {
				const { events, status } = submittableResult;

				if(status.isInBlock) response.blockHash = status.asInBlock.toHex();
				if(status.isInBlock || status.isFinalized) {
					const systemEvents = events.filter(record => record.event.section === 'system');

					const successEvent = systemEvents.find(({ event:{ method } }) => method === 'ExtrinsicSuccess');
					if(successEvent) {
						resolve(response);
						unsub();
						return;
					}

					const failEvent = systemEvents.find(({ event:{ method } }) => method === 'ExtrinsicFailed');
					if(failEvent) {
						const _decodedText = _decodeSignAndSendErrorText(failEvent.event.data, failEvent.event.data.registry);
						const {
							phase,
							event: { section, method, data },
						} = failEvent;
						const _stringifiable = [
							`<Tx event> ${phase}: ${section}.${method}:: ${data}`,
							_decodedText,
						].filter(Boolean);
						reject(_stringifiable);
						unsub();
						return;
					}
				}
				else if(submittableResult.isError) {
					reject('Unrecognized signAndSend() error');
					unsub();
				}
			}
		).then(_unsub => {
			unsub = _unsub;
		}, error => {
			reject('Uncaught signAndSend() error:' + error);
		});
	});
}

function _decodeSignAndSendErrorText(data :any[], registry : Registry) {
	try {
		const mod = data.find(item => item.module || item.isModule)?.asModule;
		const u8a = new Uint8Array([ mod.error[0], mod.error[1], mod.error[2], mod.error[3] ]);
		const metaError = registry.findMetaError(new Uint8Array([
			mod.index.toNumber(),
			u8aToBn(u8a).toNumber(),
		]));
		const text = `${metaError.section}.${metaError.name}${Array.isArray(metaError.docs)
			? `(${metaError.docs.join('')})`
			: metaError.docs || ''}`;
		return text;
	}
	catch(swallow) {}
	return;
}