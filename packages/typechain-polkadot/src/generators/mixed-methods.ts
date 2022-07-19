import {Abi} from "@polkadot/api-contract";
import {__writeFileSync} from "./_utils";
import * as MIXED_METHODS_TEMPLATES from "../output-generators/mixed-methods";
import {Import, Method} from "../types";
import {TypeParser} from "@supercolony-net/typechain-polkadot-parser";

export default function generate(abi: Abi, fileName: string, absPathToOutput: string) {
	const parser = new TypeParser(abi);

	const __allArgs = abi.messages.map(m => m.args).flat();
	const __uniqueArgs : typeof __allArgs = [];
	for(const __arg of __allArgs)
		if(!__uniqueArgs.find(__a => __a.type.lookupIndex === __arg.type.lookupIndex))
			__uniqueArgs.push(__arg);

	const _argsTypes = __uniqueArgs.map(a => ({
		id: a.type.lookupIndex!,
		tsStr: parser.getType(a.type.lookupIndex as number).tsArgType,
	}));

	const imports: Import[] = [];
	const methods: Method[] = [];

	for(const __message of abi.messages) {
		if(__message.isMutating) {
			methods.push({
				name: __message.identifier,
				args: __message.args.map(__a => ({
					name: __a.name,
					type: _argsTypes.find(_a => _a.id === __a.type.lookupIndex)!,
				})),
				payable: __message.isPayable,
				methodType: 'tx',
			});
		}
		else {
			methods.push({
				name: __message.identifier,
				args: __message.args.map(__a => ({
					name: __a.name,
					type: _argsTypes.find(_a => _a.id === __a.type.lookupIndex)!,
				})),
				returnType: __message.returnType && {
					tsStr: parser.getType(__message.returnType!.lookupIndex as number).tsReturnType,
					id: __message.returnType!.lookupIndex!,
				},
				payable: __message.isPayable,
				mutating: __message.isMutating,
				methodType: 'query',
			});
		}
	}

	__writeFileSync(absPathToOutput, `mixed-methods/${fileName}.ts`, MIXED_METHODS_TEMPLATES.FILE(fileName, methods, imports));
}