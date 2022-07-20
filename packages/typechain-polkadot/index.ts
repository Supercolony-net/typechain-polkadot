import * as FsAPI from 'fs';
import * as FsExtraAPI from 'fs-extra';
import * as PathAPI from 'path';
import YARGS from 'yargs';

import GenerateArguments from './src/generators/arguments';
import GenerateReturnValues from './src/generators/return-values';
import GenerateQuery from './src/generators/query';
import GenerateBuildExtrinsic from './src/generators/build-extrinsic';
import GenerateTxSignAndSend from './src/generators/tx-sign-and-send';
import GenerateMixedMethods from './src/generators/mixed-methods';
import GenerateContracts from './src/generators/contract';
import GenerateTypesArguments from './src/generators/types-arguments';
import GenerateTypesReturns from './src/generators/types-returns';
import GenerateConstructors from './src/generators/constructors';

import {preprocessABI} from "./src/output-generators/_utils";
import {generateProjectStructure} from "./src/_utils";

const _argv = YARGS
	.option('input', {
		alias: ['in'],
		demandOption: "Please, specify, where to take ABIs",
		description: 'Input relative path',
		type: 'string',
	})
	.option('output', {
		demandOption: "Please, specify, where to put generated files",
		alias: ['out'],
		description: 'Output relative path',
		type: 'string',
	})
	.help().alias( 'h', 'help')
	.argv;

const argv = _argv as Awaited<typeof _argv>;

const cwdPath = process.cwd();
const absPathToABIs = PathAPI.resolve( cwdPath, `./${argv.input}` );
const absPathToOutput = PathAPI.resolve( cwdPath, `./${argv.output}` );

generateProjectStructure(absPathToOutput);

const fullFileNames = FsAPI.readdirSync(absPathToABIs);

for(const fullFileName of fullFileNames) {
	if( !fullFileName.endsWith('.json') ) continue;

	const fileName = fullFileName.slice(0, -5);
	const _abiStr = FsAPI.readFileSync( PathAPI.resolve(absPathToABIs, fullFileName), 'utf8' );
	const abi = preprocessABI(_abiStr);

	GenerateTypesArguments(
		abi,
		fileName,
		absPathToOutput
	);

	GenerateTypesReturns(
		abi,
		fileName,
		absPathToOutput
	);

	GenerateArguments(
		abi,
		fileName,
		absPathToOutput
	);

	GenerateReturnValues(
		abi,
		fileName,
		absPathToOutput
	);

	GenerateQuery(
		abi,
		fileName,
		absPathToOutput
	);

	GenerateBuildExtrinsic(
		abi,
		fileName,
		absPathToOutput
	);

	GenerateTxSignAndSend(
		abi,
		fileName,
		absPathToOutput
	);

	GenerateMixedMethods(
		abi,
		fileName,
		absPathToOutput
	);

	GenerateContracts(
		abi,
		fileName,
		absPathToOutput,
		absPathToABIs
	);

	GenerateConstructors(
		abi,
		fileName,
		absPathToOutput,
		absPathToABIs
	);
}