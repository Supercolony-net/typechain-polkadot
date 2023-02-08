# Plugins in typechain-polkadot

## About

Typechain-polkadot supports plugin system, that allows you to extend the functionality of typechain-polkadot.

## How to create a plugin

To create a plugin you need to create a class that implements `Plugin` interface.

```typescript
export interface TypechainPlugin {
	name: string;
	outputDir: string;
	overrides ?: boolean
	generate: (
		abi: Abi,
		fileName: string,
		absPathToABIs: string,
		absPathToOutput: string
	) => void;
	beforeRun ?: (
		absPathToABIs: string,
		absPathToOutput: string
	) => void;
}
```

Where:
`name` - name of the plugin
`outputDir` - directory where the plugin will generate files
`overrides` - if `true` then the plugin will override the files with the same name
`generate` - function that will be called for each contract
`beforeRun` - function that will be called before the generation of contracts

## How to use a plugin
