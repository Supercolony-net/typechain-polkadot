/* eslint-disable indent */

import {readTemplate} from './_utils';
import Handlebars from 'handlebars';
import {Import, Method, Type} from "../types";

const generateForMetaTemplate = Handlebars.compile(readTemplate('arguments'));

export function FILE(
	argsTypes: Type[],
	methods : Method[],
	additionalImports : Import[],
) {
	return generateForMetaTemplate({
		argsTypes,
		methods,
		additionalImports,
	});
}