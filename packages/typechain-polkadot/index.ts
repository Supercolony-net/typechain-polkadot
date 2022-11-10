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

/**
 *  ## Typechain-polkadot
 *
 *	User-friendly tool to generate TypeScript types from Polkadot Contract ABIs.
 *
 *
 *	@remarks
 *	This tool generates TypeScript types from Polkadot Contract ABIs. It also provides Runtime-code to interact with the contracts.
 *  To deploy contract you should also provide .contract file with wasm and abi.
 *  If you don't need to deploy it you can just provide .json file with contract ABI.
 *
 *  @example
 *  # Usage from CLI
 *  ```bash
 *     $ npm i @supercolony/typechain-polkadot
 *     $ npx @supercolony/typechain-polkadot --in path/to/abis --out path/to/output/folder
 *  ```
 *
 *  @packageDocumentation
 */


import * as FsAPI from 'fs';
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