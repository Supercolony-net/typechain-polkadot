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

import path from "path";
import fs from "fs";
import Handlebars from "handlebars";
import toCamelCase from 'camelcase';
import {Method} from "../types";

export function readTemplate (template: string): string {
	// Inside the api repo itself, it will be 'auto'
	const rootDir = __dirname + '/../templates';

	// NOTE With cjs in a subdir, search one lower as well
	const file = ['', '/raw/_sdk']
		.map((p) => path.join(rootDir, p, `${template}.hbs`))
		.find((p) => fs.existsSync(p));

	if (!file) {
		throw new Error(`Unable to locate ${template}.hbs from ${rootDir}`);
	}

	return fs.readFileSync(file).toString();
}

Handlebars.registerHelper('toCamelCase', toCamelCase);

Handlebars.registerHelper( 'constructReturn', function(fn: Method) {
	if(fn.methodType == 'query') {
		return `${fn.mutating ? 'queryOkJSON' : 'queryJSON'}( this.__nativeContract, this.__callerAddress,`;
	}
	if(fn.methodType == 'tx') {
		return `txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair,`;
	}
	if(fn.methodType == 'extrinsic') {
		return `buildSubmittableExtrinsic( this.__nativeContract,`;
	}
});

Handlebars.registerHelper( 'constructReturnType', function(fn: Method) {
	if(fn.methodType == 'query') {
		if(fn.returnType) {
			return `: Promise< QueryReturnType< ${fn.returnType.tsStr} > >`;
		}
		else{
			return `: Promise< QueryReturnType< null > >`;
		}
	}
	return '';
});

import {Abi} from "@polkadot/api-contract";

export function preprocessABI(_abiStr: string): Abi {
	const abiJson = JSON.parse(_abiStr);

	for (const method of abiJson.V3.spec.messages) {
		for (const arg of method.args) {
			for (let i = 0; i < arg.type.displayName.length; i++) {
				arg.type.displayName[i] = `_${arg.type.displayName[i]}`;
			}
		}
	}

	for (const method of abiJson.V3.spec.constructors) {
		for (const arg of method.args) {
			for (let i = 0; i < arg.type.displayName.length; i++) {
				arg.type.displayName[i] = `_${arg.type.displayName[i]}`;
			}
		}
	}

	const typeNamesCount = new Map<string, number>();

	for (const {type} of abiJson.V3.types) {
		if (type.path === undefined) continue;
		if (type.path[type.path.length - 1] == 'Mapping') continue;

		if (type.path.length > 0) {
			const value = typeNamesCount.get(type.path[type.path.length - 1]) || 0;
			typeNamesCount.set(
				type.path[type.path.length - 1],
				value + 1
			);
		}
	}

	let __i = 0;
	for (const {type} of abiJson.V3.types) {
		__i++;
		if (type.path === undefined) continue;
		if (type.path[type.path.length - 1] == 'Mapping') continue;

		const count = typeNamesCount.get(type.path[type.path.length - 1]);
		if (type.path.length > 0 && (count ? count : 0) > 1) {
			if (type.path.length > 3) {
				abiJson.V3.types[__i - 1].type.path[type.path.length - 1] = `${type.path[type.path.length - 2]}_${type.path[type.path.length - 1]}`;
			}
		}
	}

	const _abiStrWithUnderscores = JSON.stringify(abiJson, null, 2);

	return new Abi(_abiStrWithUnderscores);
}