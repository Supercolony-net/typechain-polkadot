import { network } from 'redspot'
import {addPairWithAmount, attachContract} from './helpers'
import { Keyring } from '@polkadot/keyring'
import { encodeAddress } from '@polkadot/util-crypto'
import * as dotenv from 'dotenv'

import deployPSP22_Token from './001_PSP22'
import setup from './setup'
import type * as ConfigTypes from './config/types'
import * as LOCAL_CONFIG from './config/config.local'
import * as TESTNET_CONFIG from './config/config.testnet'
import {
	WNATIVE,
	TOKENS, ALL_TOKENS,
} from './config/tokens';
import {contracts} from "@polkadot/types/interfaces/definitions";


dotenv.config({ path: __dirname + '/.env' })
const { api } = network


async function run() {
	await api.isReady

	// console.log('# ADDRESSES\n')

	let deployerConfig : ConfigTypes.Account
	let usersConfig : ConfigTypes.Account[]
	deployerConfig = LOCAL_CONFIG.DEPLOYER
	usersConfig = LOCAL_CONFIG.USERS


	// console.log('## ACCOUNTS\n')

	const keyring = new Keyring({ type: 'sr25519' })
	const deployer = keyring.addFromUri(deployerConfig.mnemonicSeed)

	const deployerSigner = network.createSigner(
		deployer
	)
	// console.log('DEPLOYER: ' + deployerSigner.address)

	// console.log('\n## CONTRACTS\n')

	const wNativeAddress = await deployPSP22_Token(deployerSigner, WNATIVE)
	WNATIVE.address = encodeAddress(wNativeAddress)

	// @ts-ignore
	WNATIVE.contract = await attachContract('mock_psp22', WNATIVE.address, deployerSigner);

	// console.log(`WNATIVE PSP22 TOKEN: `, WNATIVE.address)
	/*
	console.log(
		`PSP22 TOKENS: {\n${
			TOKENS.map(t => `\t${t.symbol}: '${t.address!}',`).join('\n')
		}\n}`
	)

	*/
	console.log(`export const TOKEN = '${WNATIVE.address!}';`);

	for(const user of usersConfig) {
		const { mintAmounts } = user
		if(mintAmounts == null) continue
		const userAddress = keyring.addFromUri(user.mnemonicSeed).address
		const contract = WNATIVE.contract!;
		await contract.tx.mint(userAddress, mintAmounts[WNATIVE.symbol]!)
	}

	await api.disconnect()
}


run().catch(error => {
	console.error('Error caught: ', error)
	process.exit(1)
})
