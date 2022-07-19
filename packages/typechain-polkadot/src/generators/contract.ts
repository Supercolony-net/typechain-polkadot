import {Abi} from "@polkadot/api-contract";
import PathAPI from "path";
import {__writeFileSync} from "./_utils";
import * as CONTRACT_TEMPLATES from "../output-generators/contract";
import {Import} from "../types";

export default function generate(abi: Abi, fileName: string, absPathToOutput: string, absPathToABIs: string) {
	let imports: Import[] = [];
	const relPathFromOutL1toABIs = PathAPI.relative(
		PathAPI.resolve(absPathToOutput, "contracts"),
		absPathToABIs
	);

	__writeFileSync(absPathToOutput, `contracts/${fileName}.ts`, CONTRACT_TEMPLATES.FILE(fileName, relPathFromOutL1toABIs, imports));
}