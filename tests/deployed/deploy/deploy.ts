import { network } from 'redspot'
import { addPairWithAmount } from './helpers'
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
	TOKENS,
} from './config/tokens';


dotenv.config({ path: __dirname + '/.env' })
const { api } = network


async function run() {
	await api.isReady

	// console.log('# ADDRESSES\n')

	let deployerConfig : ConfigTypes.Account
	let usersConfig : ConfigTypes.Account[]
	if (network.name == 'development') {
		deployerConfig = LOCAL_CONFIG.DEPLOYER
		usersConfig = LOCAL_CONFIG.USERS
	}
	else {
		deployerConfig = TESTNET_CONFIG.DEPLOYER
		usersConfig = TESTNET_CONFIG.USERS
	}

	// console.log('## ACCOUNTS\n')

	const deployerSigner = network.createSigner(
		await addPairWithAmount(
			new Keyring().addFromUri(deployerConfig.mnemonicSeed, {}, deployerConfig.type || 'ecdsa'),
			deployerConfig.amount
		)
	)
	// console.log('DEPLOYER: ' + deployerSigner.address)

	for(let i = 0; i < usersConfig.length; i++) {
		const user = usersConfig[i]
		const keyringPair = await addPairWithAmount(
			new Keyring({ type: user.type || 'ecdsa' }).addFromUri(user.mnemonicSeed),
			user.amount
		)
		user.address = keyringPair.address
		const title = user.title || i+1;
		// console.log(`USER '${title}': ` + user.address)
	}

	// console.log('\n## CONTRACTS\n')

	const wNativeAddress = await deployPSP22_Token(deployerSigner, WNATIVE)
	WNATIVE.address = encodeAddress(wNativeAddress)
	for(const token of TOKENS) {
		const _accountId = await deployPSP22_Token(deployerSigner, token)
		token.address = encodeAddress(_accountId)
	}
	// console.log(`WNATIVE PSP22 TOKEN: `, WNATIVE.address)
	/*
	console.log(
		`PSP22 TOKENS: {\n${
			TOKENS.map(t => `\t${t.symbol}: '${t.address!}',`).join('\n')
		}\n}`
	)
	*/
	const token = TOKENS[0]!;
	console.log(`export const TOKEN = '${token.address!}';`);

	await setup(
		deployerSigner,
		usersConfig
	)

	await api.disconnect()
}


run().catch(error => {
	console.error('Error caught: ', error)
	process.exit(1)
})
