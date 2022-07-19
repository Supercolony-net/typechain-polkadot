import {Abi} from "@polkadot/api-contract";
import * as ARGUMENTS_TEMPLATES from "../output-generators/arguments";
import {__writeFileSync} from "./_utils";
import {TypeParser} from "@supercolony-net/typechain-polkadot-parser";

export default function generate(abi: Abi, fileName: string, absPathToOutput: string) {
	const parser = new TypeParser(abi);

	const __allArgs = abi.messages.concat(abi.constructors).map(m => m.args).flat();
	const __uniqueArgs : typeof __allArgs = [];
	for(const __arg of __allArgs)
		if(!__uniqueArgs.find(__a => __a.type.lookupIndex === __arg.type.lookupIndex))
			__uniqueArgs.push(__arg);

	let _argsTypes = __uniqueArgs.map(a => ({
		id: a.type.lookupIndex!,
		tsStr: parser.getType(a.type.lookupIndex as number).tsArgType
	}));

	const argumentsImports = new Set<string>();

	for (const _argType of _argsTypes) {
		const typeStr = _argType.tsStr;
		if (parser.tsTypes.find(e => (e.tsArgType == typeStr && e.bodyArgType)))
		{
			argumentsImports.add(_argType.tsStr);
		}
	}

	let imports = [];
	if(argumentsImports.size) {
		imports.push({
			values: Array.from(argumentsImports),
			path: `../types-arguments/${fileName}`,
		});
	}

	let methods = abi.messages.map(__m => {
		return ({
			name: __m.identifier,
			args: __m.args.map(__a => ({
				name: __a.name,
				type: _argsTypes.find(_a => _a.id == __a.type.lookupIndex)!,
			})),
		});
	});

	__writeFileSync(absPathToOutput, `arguments/${fileName}.ts`, ARGUMENTS_TEMPLATES.FILE(
		_argsTypes,
		methods,
		imports
	));
}