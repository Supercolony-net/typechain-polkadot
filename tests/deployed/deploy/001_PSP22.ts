import { patract } from 'redspot'
import type {
	// ApiPromise,
	Signer,
} from 'redspot/types'
import { AccountId } from '@polkadot/types/interfaces'
import {BN} from "bn.js";
import {bnToBn} from "@polkadot/util";


const { getContractFactory } = patract

async function deploy(
	// api: ApiPromise,
	deployerSigner: Signer,
	info: {
		name: string;
		symbol: string;
		decimals ? : number;
	},
): Promise<AccountId> {
	const contractFactory = await getContractFactory('mock_psp22', deployerSigner)

	const {
		name, symbol,
		decimals = 18
	} = info

	const contract = await contractFactory.deploy('new', bnToBn(10000).mul(bnToBn(decimals)), name, symbol, decimals, bnToBn(100000).mul(bnToBn(decimals)), {gasLimit: '90000000000'})

	return contract.address
}

export default deploy