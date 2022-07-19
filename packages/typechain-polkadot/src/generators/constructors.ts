import {Abi} from "@polkadot/api-contract";
import {__writeFileSync} from "./_utils";
import * as CONTRACT_TEMPLATES from "../output-generators/constructors";
import {Method} from "../types";
import {TypeParser} from "@supercolony-net/typechain-polkadot-parser";
import PathAPI from "path";

export default function generate(abi: Abi, fileName: string, absPathToOutput: string, absPathToABIs: string) {
	const relPathFromOutL1toABIs = PathAPI.relative(
		process.cwd(),
		absPathToABIs
	);

	const parser = new TypeParser(abi);

	const __allArgs = abi.constructors.map(m => m.args).flat();
	const __uniqueArgs : typeof __allArgs = [];
	for(const __arg of __allArgs)
		if(!__uniqueArgs.find(__a => __a.type.lookupIndex === __arg.type.lookupIndex))
			__uniqueArgs.push(__arg);


	const _argsTypes = __uniqueArgs.map(a => ({
		id: a.type.lookupIndex!,
		tsStr: parser.getType(a.type.lookupIndex as number).tsArgType,
	}));

	const methods: Method[] = [];
	for(const __message of abi.constructors) {
		methods.push({
			name: __message.identifier,
			args: __message.args.map(__a => ({
				name: __a.name,
				type: _argsTypes.find(_a => _a.id === __a.type.lookupIndex)!,
			})),
			payable: __message.isPayable,
			methodType: 'constructor',
		});
	}

	__writeFileSync(
		absPathToOutput,
		`constructors/${fileName}.ts`,
		CONTRACT_TEMPLATES.FILE(fileName, `./${relPathFromOutL1toABIs}/${fileName}.contract`, methods)
	);
}