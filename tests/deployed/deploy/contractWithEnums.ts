import { patract } from 'redspot';
import type {
	Signer,
} from 'redspot/types';
import { AccountId } from '@polkadot/types/interfaces';


const { getContractFactory } = patract;

async function deploy(
	deployerSigner: Signer,
): Promise<AccountId> {
	const contractFactory = await getContractFactory('contract_with_enums', deployerSigner);

	const contract = await contractFactory.deploy('new', {gasLimit: '900000000', value: 0});

	return contract.address;
}

export default deploy;