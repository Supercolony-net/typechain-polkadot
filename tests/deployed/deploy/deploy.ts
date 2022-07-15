import { network } from 'redspot'
import {addPairWithAmount, attachContract} from './helpers'
import { Keyring } from '@polkadot/keyring'
import { encodeAddress } from '@polkadot/util-crypto'
import * as dotenv from 'dotenv'

import deployPSP22_Token from './001_PSP22'
import deployPSP34_Token from './002_PSP34'
import deployContractWithEnums from './003_ContractWithEnums'

import type * as ConfigTypes from './config/types'
import * as LOCAL_CONFIG from './config/config.local'
import {
	WNATIVE,
} from './config/tokens';


dotenv.config({ path: __dirname + '/.env' })
const { api } = network


async function run() {
	await api.isReady

	let deployerConfig : ConfigTypes.Account
	let usersConfig : ConfigTypes.Account[]
	usersConfig = LOCAL_CONFIG.USERS

	const keyring = new Keyring({ type: 'sr25519' })

	const deployerSigner = network.getSigners()[0]

	const wNativeAddress = await deployPSP22_Token(deployerSigner)
	WNATIVE.address = encodeAddress(wNativeAddress)

	// @ts-ignore
	WNATIVE.contract = await attachContract('my_psp22', WNATIVE.address, deployerSigner);

	console.log(`export const TOKEN = '${WNATIVE.address!}';`);

	for(const user of usersConfig) {
		const { mintAmounts } = user
		if(mintAmounts == null) continue
		const userAddress = keyring.addFromUri(user.mnemonicSeed).address
		const contract = WNATIVE.contract!;
		await contract.tx["psp22Mintable::mint"](userAddress, mintAmounts[WNATIVE.symbol]!)
	}

	const psp34Address = await deployPSP34_Token(deployerSigner);

	console.log(`export const PSP34_TOKEN = '${psp34Address}';`);

	const contactWithEnumsAddress = await deployContractWithEnums(deployerSigner);

	console.log(`export const CONTRACT_WITH_ENUMS = '${contactWithEnumsAddress}';`);

	await api.disconnect()
}


run().catch(error => {
	console.error('Error caught: ', error)
	process.exit(1)
})
