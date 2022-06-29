import { patract } from 'redspot'
import Contract from '@redspot/patract/contract'
import { BN, hexToBigInt, } from '@polkadot/util'
import { Signer } from 'redspot/types'
import { AccountId } from '@polkadot/types/interfaces'
import { fromSigner, patchContractMethods } from './helpers'
import { encodeAddress } from '@polkadot/util-crypto'
import type * as ConfigTypes from './config/types'
import {
	ALL_TOKENS,
} from './config/tokens'


const { getContractFactory } = patract

async function attachContract(name: string, address: string, signer: Signer) {
	const contractFactory = await getContractFactory(name, signer)
	const contract = await contractFactory.attach(address)
	patchContractMethods(contract)

	return contract
}

export default async function setup(
	deployerSigner: Signer,
	usersConfig: ConfigTypes.Account[],
): Promise<void> {
	for(let token of ALL_TOKENS) {
		const contract = await attachContract('mock_psp22', token.address!, deployerSigner)
		token.contract = contract
	}

	//// [ minting amounts of tokens to users ]
	for(const user of usersConfig) {
		const { mintAmounts } = user
		if(mintAmounts == null) continue
		const userAddress = user.address!
		const symbols = Object.keys(mintAmounts) as ConfigTypes.TOKEN_SYMBOL[]
		for(let symbol of symbols) {
			const token = ALL_TOKENS.find(t => t.symbol === symbol)
			if(token) {
				const contract = token.contract!
				const amount = mintAmounts[symbol]!
				await contract.tx.mint(userAddress, amount)
			}
		}
	}

}