/* This file is auto-generated */

import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import { ContractPromise } from '@polkadot/api-contract';
import ABI from '../../deployed/artifacts/my_psp34.json';
import QueryMethods from '../query/my_psp34';
import BuildExtrinsicMethods from '../build-extrinsic/my_psp34';
import TxSignAndSendMethods from '../tx-sign-and-send/my_psp34';
import MixedMethods from '../mixed-methods/my_psp34';


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
		this.tx = new TxSignAndSendMethods(nativeContract, signer);
		this.methods = new MixedMethods(nativeContract, signer);
	}
}