import { patract } from 'redspot'
import type {
	// ApiPromise,
	Signer,
} from 'redspot/types'
import { AccountId } from '@polkadot/types/interfaces'


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

	const contract = await contractFactory.deploy('new', name, symbol, decimals, {gasLimit: '9000000000'})

	return contract.address
}

export default deploy