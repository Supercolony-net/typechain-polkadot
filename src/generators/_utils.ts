import path from "path";
import fs from "fs";
import Handlebars from "handlebars";
import toCamelCase from 'camelcase';
import {Method} from "../types";

export function decorateJsDoc(content : string[], tabsN = 1) {
	const tabs = '	'.repeat(tabsN);
	if(content.length < 1) return tabs + "/** */";
	return tabs + "/**\n"
		+ content.map(str => `${tabs} * ${str}\n`).join('')
		+ tabs + " */\n";
}

export function buildIndentedText(text : string[], newLineAfter = true, tabsN = 1) {
	return text.map(str => str ? '	'.repeat(tabsN) + str : '')
		.join('\n')
		+ ( newLineAfter ? '\n' : '' );
}


export function readTemplate (template: string): string {
	// Inside the api repo itself, it will be 'auto'
	const rootDir = 'src/templates';

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
		return `txSignAndSend( this.__nativeContract, this.__keyringPair,`;
	}
	if(fn.methodType == 'extrinsic') {
		return `buildSubmittableExtrinsic( this.__nativeContract,`;
	}
});

Handlebars.registerHelper( 'constructReturnType', function(fn: Method) {
	if(fn.methodType == 'query') {
		if(fn.returnType) {
			return `: Promise< QueryReturnType< OkishReturns["${fn.returnType.id}"] > >`;
		}
		else{
			return `: Promise< QueryReturnType< null > >`;
		}
	}
	return '';
});