import {__assureDirExists} from "./generators/_utils";
import * as FsExtraAPI from "fs-extra";
import PathAPI from "path";

export function generateProjectStructure(absPathToOutput: string) {
	__assureDirExists(absPathToOutput, '');
	__assureDirExists(absPathToOutput, '_sdk');
	FsExtraAPI.copySync(
		PathAPI.resolve(__dirname, './output-generators/raw/_sdk'),
		PathAPI.resolve(absPathToOutput, '_sdk')
	);
	__assureDirExists(absPathToOutput, "arguments");
	__assureDirExists(absPathToOutput, "return-values");
	__assureDirExists(absPathToOutput, "query");
	__assureDirExists(absPathToOutput, "build-extrinsic");
	__assureDirExists(absPathToOutput, "tx-sign-and-send");
	__assureDirExists(absPathToOutput, "mixed-methods");
	__assureDirExists(absPathToOutput, "contracts");
	__assureDirExists(absPathToOutput, "types-arguments");
	__assureDirExists(absPathToOutput, "types-returns");
	__assureDirExists(absPathToOutput, "constructors");
}