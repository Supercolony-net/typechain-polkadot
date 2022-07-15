/* This file is auto-generated */

import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import { ContractPromise } from '@polkadot/api-contract';
import ABI from '../../artifacts/investment.json';
import QueryMethods from '../query/investment';
import BuildExtrinsicMethods from '../build-extrinsic/investment';
import TxSignAndSendMethods from '../tx-sign-and-send/investment';
import MixedMethods from '../mixed-methods/investment';


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