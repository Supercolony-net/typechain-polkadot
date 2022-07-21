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
		tsStr: parser.getType(a.type.lookupIndex as number).tsArgTypePrefixed,
	}));

	let _methodsNames = abi.messages.map((m, i) => {
		return {
			original: m.identifier,
			cut: m.identifier.split("::").pop()!
		};
	});

	_methodsNames = _methodsNames.map((m) => {
		const _overloadsCount = _methodsNames.filter(__m => __m.cut === m.cut).length;
		if(_overloadsCount > 1) {
			return {
				original: m.original,
				cut: m.original,
			};
		} else {
			return m;
		}
	});

	const imports: Import[] = [];
	const methods: Method[] = [];

	for(const __message of abi.messages) {
		const _methodName = _methodsNames.find(__m => __m.original === __message.identifier)!;
		if(__message.isMutating) {
			methods.push({
				name: _methodName.cut,
				originalName: _methodName.original,
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
				name: _methodName.cut,
				originalName: _methodName.original,
				args: __message.args.map(__a => ({
					name: __a.name,
					type: _argsTypes.find(_a => _a.id === __a.type.lookupIndex)!,
				})),
				returnType: __message.returnType && {
					tsStr: parser.getType(__message.returnType!.lookupIndex as number).tsReturnTypePrefixed,
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