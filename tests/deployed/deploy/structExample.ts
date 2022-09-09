import { patract } from 'redspot';
import type {
    Signer,
} from 'redspot/types';
import { AccountId } from '@polkadot/types/interfaces';


const { getContractFactory } = patract;

async function deploy(
    deployerSigner: Signer,
): Promise<AccountId> {
    const contractFactory = await getContractFactory('struct_example', deployerSigner);

    const contract = await contractFactory.deploy('new');

    return contract.address;
}

export default deploy;