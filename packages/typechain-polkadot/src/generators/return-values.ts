import {Abi} from "@polkadot/api-contract";
import {__writeFileSync} from "./_utils";
import * as OK_RETURNS_TEMPLATES from "../output-generators/return-values";
import {TypeParser} from "@supercolony-net/typechain-polkadot-parser";

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