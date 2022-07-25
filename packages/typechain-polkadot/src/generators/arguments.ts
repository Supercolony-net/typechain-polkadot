// Copyright (c) 2012-2022 Supercolony
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the"Software"),
// to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import {Abi} from "@polkadot/api-contract";
import * as ARGUMENTS_TEMPLATES from "../output-generators/arguments";
import {__writeFileSync} from "./_utils";
import {TypeParser} from "@supercolony-net/typechain-polkadot-parser";

/**
 * Generates the arguments/<fileName>.ts file.
 *
 * @param abi - The ABI of the contract
 * @param fileName - The name of the file to write to
 * @param absPathToOutput - The absolute path to the output directory
 */
export default function generate(abi: Abi, fileName: string, absPathToOutput: string) {
	const parser = new TypeParser(abi);

	const __allArgs = abi.messages.concat(abi.constructors).map(m => m.args).flat();
	const __uniqueArgs : typeof __allArgs = [];
	for(const __arg of __allArgs)
		if(!__uniqueArgs.find(__a => __a.type.lookupIndex === __arg.type.lookupIndex))
			__uniqueArgs.push(__arg);

	const _argsTypes = __uniqueArgs.map(a => ({
		id: a.type.lookupIndex!,
		tsStr: parser.getType(a.type.lookupIndex as number).tsArgType,
	}));

	const argumentsImports = new Set<string>();

	for (const _argType of _argsTypes) {
		const typeStr = _argType.tsStr;
		if (parser.tsTypes.find(e => (e.tsArgType == typeStr && e.bodyArgType)))
		{
			argumentsImports.add(_argType.tsStr);
		}
	}

	const imports = [];
	if(argumentsImports.size) {
		imports.push({
			values: Array.from(argumentsImports),
			path: `../types-arguments/${fileName}`,
		});
	}

	const methods = abi.messages.map(__m => {
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