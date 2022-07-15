import {CodePromise} from "@polkadot/api-contract";
import type {KeyringPair} from "@polkadot/keyring/types";
import Files from "fs";
import type {ApiPromise} from "@polkadot/api";
import {_signAndSend, SignAndSendSuccessResponse} from "../_sdk/tx";
import type {ConstructorOptions} from "../_sdk/types";
import type { ArgumentsTypes } from '../arguments/investment';

export default class Constructors {
	readonly nativeAPI: ApiPromise;
	readonly signer: KeyringPair;

	constructor(
		nativeAPI: ApiPromise,
		signer: KeyringPair,
	) {
		this.nativeAPI = nativeAPI;
		this.signer = signer;
	}

    	/**
    	 * @arg: args: [
    	 * 0: escrow - 0,
    	 * 1: lendingTokens - 24,
    	 * 2: fundingNft - 0,
    	 * 3: governance - 0,
    	 * 4: projectManager - 0,
    	 * 5: baseAmountForEachPartition - 5,
    	 * ]
    	 */
    	async "new" (
    		escrow: ArgumentsTypes[0],
    		lendingTokens: ArgumentsTypes[24],
    		fundingNft: ArgumentsTypes[0],
    		governance: ArgumentsTypes[0],
    		projectManager: ArgumentsTypes[0],
    		baseAmountForEachPartition: ArgumentsTypes[5],
    		__options ? : ConstructorOptions,
    	) {
    		const __contract = JSON.parse(Files.readFileSync("./artifacts/investment.contract").toString());

			const code = new CodePromise(this.nativeAPI, __contract, __contract.source.wasm);

			const gasLimit = 100000 * 1000000 || __options?.gasLimit;
			const storageDepositLimit = __options?.storageDepositLimit;

			const tx = code.tx["new"]!({ gasLimit, storageDepositLimit, value: __options?.value }, escrow,  lendingTokens,  fundingNft,  governance,  projectManager,  baseAmountForEachPartition );

			let response;
			try {
				response = await _signAndSend(this.nativeAPI.registry, tx, this.signer);
			}
			catch (error) {
				console.log(error);
			}

			return {
				result: response as SignAndSendSuccessResponse,
				// @ts-ignore
				address: (response as SignAndSendSuccessResponse)!.result!.contract.address.toString(),
			}
    	}

}