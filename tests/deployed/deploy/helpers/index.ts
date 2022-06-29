import Contract from '@redspot/patract/contract'
import BN from 'bn.js'
// @ts-ignore
import { artifacts, network, patract } from 'redspot'
import { KeyringPair } from '@polkadot/keyring/types'
import { buildTx } from '@redspot/patract/buildTx'
import { THREE_DAYS } from './constants'
import { TransactionParams } from '@redspot/patract/types'
import camelCase from 'lodash/camelCase'
import { expect } from './chai'
import { Keyring } from '@polkadot/keyring'

const { getContractFactory, getRandomSigner } = patract

const { api, getAddresses } = network

export const TRAIT_PREFIXES = [
  'ablpTokenLogic',
  'ablpToken',
  'ablpTokenData',
  'pool',
  'poolFactoryData',
  'poolFactoryLogic',
  'poolFactory',
  'poolData',
  'amountDistribution',
  'amountDistributionData',
  'router',
  'routerData',
  'wNative',
  'tradeMath',
  'psp22',
  'psp22Internal',
  'psp22Mintable',
  'psp22Burnable',
  'psp22Metadata',
  'ownable',
  'accessControl',
]

export const patchContractMethods = (contract: Contract): Contract => {
  patchMethods(contract.query)
  patchMethods(contract.tx)

  // @ts-ignore
  contract['tx'] = new Proxy(contract.tx, {
	get(target, prop: string) {
	  return async function (...args: TransactionParams) {
		if (!contract.query[prop]) {
		  throw Error(`No property: ${prop} in contract ABI`)
		}
		const result = await contract.query[prop](...args)
		const output = result.output?.toJSON()

		if ((output && output['ok'] !== undefined) || output === undefined) {
		  return await target[prop](...args)
		} else {
		  const errorMessage = output ? output['err'] : 'Unknown Error'
		  const error = Error(`${JSON.stringify(errorMessage)}`)
		  error['errorMessage'] = errorMessage
		  throw error
		}
	  }
	},
  })
  return contract
}

const patchMethods = (object) => {
  for (const prop in object) {
	for (const trait of TRAIT_PREFIXES) {
	  if (prop.startsWith(trait)) {
		const newPropName = camelCase(prop.replace(trait, ''))
		object[newPropName] = object[prop]
	  }
	}
  }
}

export const getDefaultAccounts = async () => {
  const acc = await getKeyringPairs()
  return [
	acc.alice.address,
	acc.alice.address,
	acc.benny.address,
	acc.annie.address,
	acc.chris.address
  ]
}

export const attachContract = async (name, address) => {
  return await getContract(name, address, '', false)
}

export const setupContract = async (name, constructor, ...args) => {
  return await getContract(name, bnArg(0, 32), constructor, true, ...args)
}

export const getContract = async (name, address, constructor, isSetup, ...args) => {
  const defaultAccounts = await getDefaultAccounts()
  const contractFactory = await getContractFactory(name, defaultAccounts[0])
  const contract = isSetup ?
	  await contractFactory.deploy(constructor, ...args) :
	  await contractFactory.attach(address)
  const abi = artifacts.readArtifact(name)
  patchContractMethods(contract)
  return {
	defaultSigner: defaultAccounts[0],
	alice: defaultAccounts[1],
	accounts: { alice: defaultAccounts[1], benny: defaultAccounts[2], annie: defaultAccounts[3], chris: defaultAccounts[4] },
	contractFactory,
	contract,
	abi,
	query: contract.query,
	tx: contract.tx,
  }
}

export const getKeyringPairs = async () => {
  return {
	alice: await addPairWithAmount(new Keyring({ type: 'ecdsa' }).addFromUri('//Alice'), new BN('50000000000')),
	benny: await addPairWithAmount(new Keyring({ type: 'ecdsa' }).addFromUri('//Benny'), new BN('50000000000')),
	annie: await addPairWithAmount(new Keyring({ type: 'ecdsa' }).addFromUri('//Annie'), new BN('50000000000')),
	chris: await addPairWithAmount(new Keyring({ type: 'ecdsa' }).addFromUri('//Chris'), new BN('50000000000')),
  }
}

export const addPairWithAmount = async (pair: KeyringPair, amount: BN): Promise<KeyringPair> => {
  await api.isReady
  const one = new BN(10).pow(new BN(api.registry.chainDecimals[0]))
  const redspotPair = network.addPair(pair)
  await buildTx(api.registry, api.tx.balances.transfer(redspotPair.address, one.mul(amount)), (await getAddresses())[0])
  return redspotPair
}

export const bnArg = (value: number | string | number[] | Uint8Array | Buffer | BN, length = 32) =>
  new BN(value, undefined, 'le').toArray('le', length)

export const fromSigner = (contract: Contract, address: string): Contract => {
  return patchContractMethods(contract.connect(address))
}

export const getTimestamp = async () => {
  await api.isReady
  let now = await api.query.timestamp.now()
  // @ts-ignore
  return now.toNumber() + THREE_DAYS
}

export const expectRevert = <T>(promise: Promise<T>, errorMessage: string | Record<string, any> = '') => {
  return promise
	.then(() => expect.fail('Should be reverted.'))
	.catch((e) => {
	  if (!e.errorMessage) {
		throw e
	  } else if (!errorMessage) {
		console.warn('Error checking was skipped. Please specify errorMessing during `expectRevert`.')
		expect(true)
	  } else if (typeof errorMessage === 'object') {
		expect(e.errorMessage).to.deep.equal(errorMessage)
	  } else {
		if (typeof e.errorMessage === 'object') {
		  expect(e.errorMessage).to.deep.equal({ [camelCase(errorMessage)]: null })
		} else {
		  expect(e.errorMessage).to.equal(errorMessage)
		}
	  }
	})
}
