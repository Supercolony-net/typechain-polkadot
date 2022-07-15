import { patract } from 'redspot'
import type {
    // ApiPromise,
    Signer,
} from 'redspot/types'
import { AccountId } from '@polkadot/types/interfaces'


const { getContractFactory } = patract

async function deploy(
    deployerSigner: Signer,
): Promise<AccountId> {
    const contractFactory = await getContractFactory('my_psp34', deployerSigner)


    const contract = await contractFactory.deploy('new', {gasLimit: '900000000', value: 0})

    return contract.address
}

export default deploy