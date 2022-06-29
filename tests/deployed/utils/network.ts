import 'dotenv/config';

export const accounts = (networkName: string | null): unknown => {
	let mnemonic: string | undefined
	let derivationPath: string | undefined
	if (networkName != null) {
		mnemonic = process.env['MNEMONIC_' + networkName.toUpperCase()]
		derivationPath = process.env['DERIVATION_PATH_' + networkName.toUpperCase()]
	} else {
		mnemonic = process.env.MNEMONIC
		derivationPath = process.env.DERIVATION_PATH
	}

	if (!mnemonic) {
		console.error(`Mnemonic not set! Please create env vars for network ${networkName}, or set the default ones.`)
		process.exit(1)
	} else {
		return [
			{
				mnemonic: mnemonic,
				path: derivationPath
			} as unknown
		]
	}
}
