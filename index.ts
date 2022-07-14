import * as FsAPI from 'fs';
import * as FsExtraAPI from 'fs-extra';
import * as PathAPI from 'path';
import YARGS from 'yargs';
import type ABI from './src/abi_interface';
//
import * as ARGUMENTS_TEMPLATES from './src/templates/arguments';
import * as OK_RETURNS_TEMPLATES from './src/templates/return-values';
import * as QUERY_TEMPLATES from './src/templates/query';
import * as BUILD_EXTRINSIC_TEMPLATES from './src/templates/build-extrinsic';
import * as TX_SIGN_AND_SEND_TEMPLATES from './src/templates/tx-sign-and-send';
import * as MIXED_METHODS_TEMPLATES from './src/templates/mixed-methods';
import * as CONTRACT_TEMPLATES from './src/templates/contract';
import {typeDecoder} from "./src";


//////

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
	.help().alias('help', 'h')
	.argv;

const argv = _argv as Awaited<typeof _argv>;


////

const cwdPath = process.cwd();
const absPathToABIs = PathAPI.resolve( cwdPath, `./${argv.input}` );
const absPathToOutput = PathAPI.resolve( cwdPath, `./${argv.output}` );


//// Prep of output directory

__assureDirExists(absPathToOutput, '');

// [ raw files' clones ]

__assureDirExists(absPathToOutput, '_sdk');

FsExtraAPI.copySync(
	PathAPI.resolve(__dirname, 'src/templates/raw/_sdk'),
	PathAPI.resolve(absPathToOutput, '_sdk')
);

// [ generated folders ]

__assureDirExists(absPathToOutput, "arguments");
__assureDirExists(absPathToOutput, "return-values");
__assureDirExists(absPathToOutput, "query");
__assureDirExists(absPathToOutput, "build-extrinsic");
__assureDirExists(absPathToOutput, "tx-sign-and-send");
__assureDirExists(absPathToOutput, "mixed-methods");
__assureDirExists(absPathToOutput, "contracts");
__assureDirExists(absPathToOutput, "types");


//// Parsing inputs & generating outputs in a cycle

const fullFileNames = FsAPI.readdirSync(absPathToABIs);

for(const fullFileName of fullFileNames) {
	if( !fullFileName.endsWith('.json') ) continue;
	const fileName = fullFileName.slice(0, -5);
	const _abiStr = FsAPI.readFileSync( PathAPI.resolve(absPathToABIs, fullFileName), 'utf8' );
	const _json = JSON.parse(_abiStr);
	if(!_json.V3) {
		console.error(`File "${fullFileName}" is not a V3 ABI`);
		continue;
	}
	const abi : ABI = _json;

	let _str : string;
	let _fileStr : string;


	const {
		decoder,
		result
	} = typeDecoder(_abiStr);

	// [ types ]

	_str = result.enums.concat(result.composites).map(e => e.body).join('\n\n');

	__writeFileSync(absPathToOutput, `types/${fileName}.d.ts`, _str);

	// [ out/arguments ]

	_str = '';

	const __allArgs = abi.V3.spec.messages.map(m => m.args).flat();
	const __uniqueArgs : typeof __allArgs = [];
	for(const __arg of __allArgs)
		if(!__uniqueArgs.find(__a => __a.type.type === __arg.type.type))
			__uniqueArgs.push(__arg);

	const _argsTypes = __uniqueArgs.map(a => ({
		id: a.type.type,
		tsStr: decoder(a.type.type),
	}));

	let argumentsImports = new Set<string>();

	for (const _argType of _argsTypes) {
		const typeStr = _argType.tsStr;
		if (result.composites.find(e => e.name == typeStr) || result.enums.find(e => e.name == typeStr))
		{
			argumentsImports.add(_argType.tsStr);
		}
	}

	let _argumentImports = `import type { ${Array.from(argumentsImports).join(', ')} } from '../types/${fileName}';`;
	if (argumentsImports.size == 0) {
		_argumentImports = ''
	}

	const _methods = abi.V3.spec.messages.map(__m => {
		return ({
			name: __m.label,
			args: __m.args.map(__a => ({
				name: __a.label,
				type: _argsTypes.find(_a => _a.id == __a.type.type)!,
			}) ),
		}
		)
	});

	_fileStr = ARGUMENTS_TEMPLATES.FILE(
		_argsTypes,
		_methods,
		_argumentImports
	);

	__writeFileSync(absPathToOutput, `arguments/${fileName}.ts`, _fileStr);

	// [ out/return-values ]

	let returnValuesImports = new Set<string>();

	_str = '';

	const _returnTypesIDs = Array.from( new Set(
		abi.V3.spec.messages.filter(m => m.returnType).map(m => m.returnType!.type)
	) );
	for(const id of _returnTypesIDs) {
		_str += OK_RETURNS_TEMPLATES.TYPE_JSDOC();
		_str += OK_RETURNS_TEMPLATES.TYPE(id, decoder(id));
		const typeName = decoder(id);

		if (result.enums.find(e => e.name === typeName) || result.composites.find(e => e.name == typeName)) {
			returnValuesImports.add(typeName);
		}
	}

	let imports = `import type { ${Array.from(returnValuesImports).join(', ')} } from '../types/${fileName}';`;

	if (returnValuesImports.size == 0) {
		imports = '';
	}

	_fileStr = OK_RETURNS_TEMPLATES.FILE(_str, imports);

	__writeFileSync(absPathToOutput, `return-values/${fileName}.ts`, _fileStr);

	// [ out/query ]

	_str = '';

	for(const __message of abi.V3.spec.messages) {
		// if(__message.mutates) continue;
		const __label = __message.label;
		_str += QUERY_TEMPLATES.METHOD_JSDOC(__message.args);
		_str += QUERY_TEMPLATES.METHOD(
			__label,
			__message.args.map(__a => ({
				name: __a.label,
				type: _argsTypes.find(_a => _a.id == __a.type.type)!,
			}) ),
			__message.returnType && {tsStr: decoder(__message.returnType!.type), id: __message.returnType!.type},
			__message.payable,
			__message.mutates
		);
	}


	_fileStr = QUERY_TEMPLATES.FILE(fileName, _str);

	__writeFileSync(absPathToOutput, `query/${fileName}.ts`, _fileStr);

	// [ out/build-extrinsic ]

	_str = '';

	for(const __message of abi.V3.spec.messages) {
		// if(!__message.mutates) continue;
		const __label = __message.label;
		_str += BUILD_EXTRINSIC_TEMPLATES.METHOD_JSDOC(__message.args);
		_str += BUILD_EXTRINSIC_TEMPLATES.METHOD(
			__label,
			__message.args.map(__a => ({
				name: __a.label,
				type: _argsTypes.find(_a => _a.id == __a.type.type)!,
			}) ),
			__message.payable,
		);
	}

	_fileStr = BUILD_EXTRINSIC_TEMPLATES.FILE(fileName, _str);

	__writeFileSync(absPathToOutput, `build-extrinsic/${fileName}.ts`, _fileStr);

	// [ out/tx-sign-and-send ]

	_str = '';

	for(const __message of abi.V3.spec.messages) {
		// if(!__message.mutates) continue;
		const __label = __message.label;
		_str += TX_SIGN_AND_SEND_TEMPLATES.METHOD_JSDOC(__message.args);
		_str += TX_SIGN_AND_SEND_TEMPLATES.METHOD(
			__label,
			__message.args.map(__a => ({
				name: __a.label,
				type: _argsTypes.find(_a => _a.id == __a.type.type)!,
			}) ),
			__message.payable,
		);
	}

	_fileStr = TX_SIGN_AND_SEND_TEMPLATES.FILE(fileName, _str);

	__writeFileSync(absPathToOutput, `tx-sign-and-send/${fileName}.ts`, _fileStr);

	// [ out/mixed-methods ]

	_str = '';

	for(const __message of abi.V3.spec.messages) {
		const __label = __message.label;
		if(__message.mutates) {
			_str += TX_SIGN_AND_SEND_TEMPLATES.METHOD_JSDOC(__message.args);
			_str += TX_SIGN_AND_SEND_TEMPLATES.METHOD(
				__label,
				__message.args.map(__a => ({
					name: __a.label,
					type: _argsTypes.find(_a => _a.id == __a.type.type)!,
				}) ),
				__message.payable,
			);
		}
		else {
			_str += QUERY_TEMPLATES.METHOD_JSDOC(__message.args);
			_str += QUERY_TEMPLATES.METHOD(
				__label,
				__message.args.map(__a => ({
					name: __a.label,
					type: _argsTypes.find(_a => _a.id == __a.type.type)!,
				}) ),
				__message.returnType && {tsStr: decoder(__message.returnType!.type), id: __message.returnType!.type},
				__message.payable,
				__message.mutates
			);
		}
	}

	_fileStr = MIXED_METHODS_TEMPLATES.FILE(fileName, _str);

	__writeFileSync(absPathToOutput, `mixed-methods/${fileName}.ts`, _fileStr);

	// [ out/contracts ]

	const relPathFromOutL1toABIs = PathAPI.relative(
		PathAPI.resolve(absPathToOutput, "contracts"),
		absPathToABIs
	);

	_fileStr = CONTRACT_TEMPLATES.FILE(fileName, relPathFromOutL1toABIs);

	__writeFileSync(absPathToOutput, `contracts/${fileName}.ts`, _fileStr);

}



////// PRIVATE

function __assureDirExists(absPathToBase : string, relPathToDir : string) {
	const absPath = PathAPI.resolve( absPathToBase, `./${relPathToDir}` );
	if( !FsAPI.existsSync(absPath) ) FsAPI.mkdirSync(absPath);
}

function __writeFileSync(absPathToBase : string, relFilePath : string, contents : string) {
	FsAPI.writeFileSync(
		PathAPI.resolve( absPathToBase, `./${relFilePath}` ),
		contents
	);
}