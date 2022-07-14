/* This file is auto-generated */

import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import { ContractPromise } from '@polkadot/api-contract';
import ABI from '../../deployed/artifacts/contract_with_enums.json';
import QueryMethods from '../query/contract_with_enums';
import BuildExtrinsicMethods from '../build-extrinsic/contract_with_enums';
import TxSignAndSendMethods from '../tx-sign-and-send/contract_with_enums';
import MixedMethods from '../mixed-methods/contract_with_enums';


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