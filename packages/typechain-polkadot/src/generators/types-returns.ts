import {Abi} from "@polkadot/api-contract";
import {__writeFileSync} from "./_utils";
import {TypeParser} from "@supercolony-net/typechain-polkadot-parser";

export default function generate(abi: Abi, fileName: string, absPathToOutput: string) {
	const parser = new TypeParser(abi);

	let result = '';

	parser.tsTypes.forEach(type => {
		if (type.bodyReturnType)
			result += type.bodyReturnType + '\n\n';
	});

	__writeFileSync(
		absPathToOutput,
		`types-returns/${fileName}.ts`,
		`import type BN from 'bn.js';\n\n` + result
	);
}