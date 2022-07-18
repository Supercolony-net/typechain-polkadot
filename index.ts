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
import * as FsAPI from 'fs';
import * as FsExtraAPI from 'fs-extra';
import * as PathAPI from 'path';
import YARGS from 'yargs';
import type ABI from './src/abi_interface';
import * as ARGUMENTS_TEMPLATES from './src/generators/arguments';
import * as OK_RETURNS_TEMPLATES from './src/generators/return-values';
import * as QUERY_TEMPLATES from './src/generators/query';
import * as BUILD_EXTRINSIC_TEMPLATES from './src/generators/build-extrinsic';
import * as TX_SIGN_AND_SEND_TEMPLATES from './src/generators/tx-sign-and-send';
import * as MIXED_METHODS_TEMPLATES from './src/generators/mixed-methods';
import * as CONTRACT_TEMPLATES from './src/generators/contract';
import {typeDecoder} from "./src";
import {Type, Method, Import} from "./src/types";
import {preprocessABI} from "./src/generators/_utils";

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

const cwdPath = process.cwd();
const absPathToABIs = PathAPI.resolve( cwdPath, `./${argv.input}` );
const absPathToOutput = PathAPI.resolve( cwdPath, `./${argv.output}` );


// Prep of output directory

__assureDirExists(absPathToOutput, '');
__assureDirExists(absPathToOutput, '_sdk');
FsExtraAPI.copySync(
    PathAPI.resolve(__dirname, 'src/generators/raw/_sdk'),
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

const fullFileNames = FsAPI.readdirSync(absPathToABIs);

for(const fullFileName of fullFileNames) {
    if( !fullFileName.endsWith('.json') ) continue;
    const fileName = fullFileName.slice(0, -5);
    const abiStr = FsAPI.readFileSync( PathAPI.resolve(absPathToABIs, fullFileName), 'utf8' );
    const abiJSON = JSON.parse(abiStr);
    if(!abiJSON.V3) {
        console.error(`File "${fullFileName}" is not a V3 ABI`);
        continue;
    }
    const abi : ABI = abiJSON;

    let methods: Method[] = [];
    let types: Type[] = [];
    let _argsTypes: Type[] = [];
    let imports: Import[] = [];

    const { decoder: decoderArgs, result: resultArgs } = typeDecoder(preprocessABI(abiStr), 'arguments');
    const { decoder: decoderReturns, result: resultReturns } = typeDecoder(preprocessABI(abiStr), 'returns');

    // [ types-arguments ]

    __writeFileSync(
        absPathToOutput,
        `types-arguments/${fileName}.ts`,
        `import type BN from 'bn.js';\n\n` + resultArgs.enums.concat(resultArgs.composites).map(e => e.body).join('\n\n')
    );

    // [ types-returns ]

    __writeFileSync(
        absPathToOutput,
        `types-returns/${fileName}.ts`,
        resultReturns.enums.concat(resultReturns.composites).map(e => e.body).join('\n\n')
    );

    // [ out/arguments ]

    const __allArgs = abi.V3.spec.messages.map(m => m.args).flat();
    const __uniqueArgs : typeof __allArgs = [];
    for(const __arg of __allArgs)
        if(!__uniqueArgs.find(__a => __a.type.type === __arg.type.type))
            __uniqueArgs.push(__arg);

    _argsTypes = __uniqueArgs.map(a => ({
        id: a.type.type,
        tsStr: decoderArgs(a.type.type),
    }));

    methods = abi.V3.spec.messages.map(__m => ({
        name: __m.label,
        args: __m.args.map(__a => ({
            name: __a.label,
            type: _argsTypes.find(_a => _a.id == __a.type.type)!,
        })),
    }));

    const argumentsImports = new Set<string>();

    for (const _argType of _argsTypes) {
        const typeStr = _argType.tsStr;
        if (resultArgs.composites.find(e => e.name == typeStr) || resultArgs.enums.find(e => e.name == typeStr))
        {
            argumentsImports.add(_argType.tsStr);
        }
    }

    imports = [];
    if(argumentsImports.size) {
        imports.push({
            values: Array.from(argumentsImports),
            path: `../types-arguments/${fileName}`,
        });
    }

    methods = abi.V3.spec.messages.map(__m => {
        return ({
            name: __m.label,
            args: __m.args.map(__a => ({
                name: __a.label,
                type: _argsTypes.find(_a => _a.id == __a.type.type)!,
            })),
        });
    });

    __writeFileSync(absPathToOutput, `arguments/${fileName}.ts`, ARGUMENTS_TEMPLATES.FILE(
        _argsTypes,
        methods,
        imports
    ));

    // [ out/return-values ]

    const returnValuesImports = new Set<string>();

    const _returnTypesIDs = Array.from( new Set(
        abi.V3.spec.messages.filter(m => m.returnType).map(m => m.returnType!.type)
    ) );

    imports = [];
    types = [];

    let typesStr = '';

    for(const id of _returnTypesIDs) {
        const typeName = decoderReturns(id);
        typesStr += typeName + '##';

        types.push({
            id: id,
            tsStr: typeName,
        });
    }

    for(const _enum of resultReturns.enums) {
        if(typesStr.includes(_enum.name))returnValuesImports.add(_enum.name);
    }

    for(const composite of resultReturns.composites) {
        if(typesStr.includes(composite.name))returnValuesImports.add(composite.name);
    }
    if(returnValuesImports.size) {
        imports.push({
            values: Array.from(returnValuesImports),
            path: `../types-returns/${fileName}`,
        });
    }

    __writeFileSync(absPathToOutput, `return-values/${fileName}.ts`, OK_RETURNS_TEMPLATES.FILE(types, imports));

    // [ out/query ]
    imports = [];
    methods = [];
    for(const __message of abi.V3.spec.messages) {
        methods.push({
            name: __message.label,
            args: __message.args.map(__a => ({
                name: __a.label,
                type: _argsTypes.find(_a => _a.id == __a.type.type)!,
            })),
            returnType: __message.returnType && {
                tsStr: decoderReturns(__message.returnType!.type),
                id: __message.returnType!.type,
            },
            payable: __message.payable,
            mutating: __message.mutates,
            methodType: 'query',
        });
    }

    __writeFileSync(absPathToOutput, `query/${fileName}.ts`, QUERY_TEMPLATES.FILE(fileName, methods, imports));

    // [ out/build-extrinsic ]

    imports = [];
    methods = [];
    for(const __message of abi.V3.spec.messages) {
        methods.push({
            name: __message.label,
            args: __message.args.map(__a => ({
                name: __a.label,
                type: _argsTypes.find(_a => _a.id == __a.type.type)!,
            })),
            payable: __message.payable,
            methodType: 'extrinsic',
        });
    }

    __writeFileSync(absPathToOutput, `build-extrinsic/${fileName}.ts`, BUILD_EXTRINSIC_TEMPLATES.FILE(fileName, methods, imports));

    // [ out/tx-sign-and-send ]

    imports = [];
    methods = [];
    for(const __message of abi.V3.spec.messages) {
        methods.push({
            name: __message.label,
            args: __message.args.map(__a => ({
                name: __a.label,
                type: _argsTypes.find(_a => _a.id == __a.type.type)!,
            })),
            payable: __message.payable,
            methodType: 'tx',
        });
    }

    __writeFileSync(absPathToOutput, `tx-sign-and-send/${fileName}.ts`, TX_SIGN_AND_SEND_TEMPLATES.FILE(fileName, methods, imports));

    // [ out/mixed-methods ]

    imports = [];
    methods = [];
    for(const __message of abi.V3.spec.messages) {
        if(__message.mutates) {
            methods.push({
                name: __message.label,
                args: __message.args.map(__a => ({
                    name: __a.label,
                    type: _argsTypes.find(_a => _a.id == __a.type.type)!,
                })),
                payable: __message.payable,
                methodType: 'tx',
            });
        }
        else {
            methods.push({
                name: __message.label,
                args: __message.args.map(__a => ({
                    name: __a.label,
                    type: _argsTypes.find(_a => _a.id == __a.type.type)!,
                })),
                returnType: __message.returnType && {
                    tsStr: decoderReturns(__message.returnType!.type),
                    id: __message.returnType!.type,
                },
                payable: __message.payable,
                mutating: __message.mutates,
                methodType: 'query',
            });
        }
    }

    __writeFileSync(absPathToOutput, `mixed-methods/${fileName}.ts`, MIXED_METHODS_TEMPLATES.FILE(fileName, methods, imports));

    // [ out/contracts ]

    imports = [];
    const relPathFromOutL1toABIs = PathAPI.relative(
        PathAPI.resolve(absPathToOutput, "contracts"),
        absPathToABIs
    );

    __writeFileSync(absPathToOutput, `contracts/${fileName}.ts`, CONTRACT_TEMPLATES.FILE(fileName, relPathFromOutL1toABIs, imports));
}

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