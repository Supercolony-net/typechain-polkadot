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
import * as OK_RETURNS_TEMPLATES from "../output-generators/return-values";
import {TypeParser} from "@727-ventures/typechain-polkadot-parser";

/**
 * Generates the return-values/<fileName>.ts file.
 *
 * @param abi - The ABI of the contract
 * @param fileName - The name of the file to write to
 * @param absPathToOutput - The absolute path to the output directory
 */
export default function generate(abi: Abi, fileName: string, absPathToOutput: string) {
	const parser = new TypeParser(abi);

	const returnValuesImports = new Set<string>();

	const _returnTypesIDs = Array.from( new Set(
		abi.messages.concat(abi.constructors).filter(m => m.returnType).map(m => m.returnType!.lookupIndex!)
	) );

	const imports = [];
	const types = [];

	let typesStr: string = '';

	for(const id of _returnTypesIDs) {
		const typeName = parser.getType(id).tsReturnType;
		typesStr += typeName + '##';

		types.push({
			id: id,
			tsStr: typeName,
		});
	}

	for(const _type of parser.tsTypes) {
		if(_type.bodyReturnType && typesStr.includes(_type.tsReturnType))
			returnValuesImports.add(_type.tsReturnType);
	}


	if(returnValuesImports.size) {
		imports.push({
			values: Array.from(returnValuesImports),
			path: `../types-returns/${fileName}`,
		});
	}

	__writeFileSync(absPathToOutput, `return-values/${fileName}.ts`, OK_RETURNS_TEMPLATES.FILE(types, imports));
}