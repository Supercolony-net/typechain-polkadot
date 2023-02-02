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
import {__writeFileSync} from "./_utils";
import * as CONTRACT_TEMPLATES from "../output-generators/constructors";
import {Method} from "../types";
import {TypeParser} from "@727-ventures/typechain-polkadot-parser";
import PathAPI from "path";

/**
 * Generates the constructors/<fileName>.ts file.
 *
 * @param abi - The ABI of the contract
 * @param fileName - The name of the file to write to
 * @param absPathToOutput - The absolute path to the output directory
 * @param absPathToABIs - The absolute path to the ABIs directory
 */
export default function generate(abi: Abi, fileName: string, absPathToOutput: string, absPathToABIs: string) {
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

	const _methodsNames = abi.constructors.map((m, i) => {
		return {
			original: m.identifier,
			cut: m.identifier.split("::").pop()!,
		};
	});

	const methods: Method[] = [];
	for(const __message of abi.constructors) {
		const _methodName = _methodsNames.find(__m => __m.original === __message.identifier)!;
		methods.push({
			name: _methodName.cut,
			originalName: _methodName.original,
			args: __message.args.map(__a => ({
				name: __a.name,
				type: _argsTypes.find(_a => _a.id === __a.type.lookupIndex)!,
			})),
			payable: __message.isPayable,
			methodType: 'constructor',
		});
	}

	const relPathFromOutL1toABIs = PathAPI.relative(
		PathAPI.resolve(absPathToOutput, "contracts"),
		absPathToABIs
	);

	__writeFileSync(
		absPathToOutput,
		`constructors/${fileName}.ts`,
		CONTRACT_TEMPLATES.FILE(fileName, relPathFromOutL1toABIs, methods)
	);
}
