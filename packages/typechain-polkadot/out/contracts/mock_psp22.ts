/* This file is auto-generated */

import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import { ContractPromise } from '@polkadot/api-contract';
import ABI from '../../artifacts/mock_psp22.json';
import QueryMethods from '../query/mock_psp22';
import BuildExtrinsicMethods from '../build-extrinsic/mock_psp22';
import TxSignAndSendMethods from '../tx-sign-and-send/mock_psp22';
import MixedMethods from '../mixed-methods/mock_psp22';


export default class Contract {
	readonly query : QueryMethods;
	readonly buildExtrinsic : BuildExtrinsicMethods;
	readonly tx : TxSignAndSendMethods;
	readonly methods : MixedMethods;

	constructor(
		address : string,
		signer : KeyringPair,
		nativeAPI : ApiPromise,
	) {
		const nativeContract = new ContractPromise(nativeAPI, ABI, address);

		this.query = new QueryMethods(nativeContract, signer.address);
		this.buildExtrinsic = new BuildExtrinsicMethods(nativeContract);
		this.tx = new TxSignAndSendMethods(nativeAPI, nativeContract, signer);
		this.methods = new MixedMethods(nativeAPI, nativeContract, signer);
	}
}