/* eslint-disable indent */

import {readTemplate} from './_utils';
import Handlebars from "handlebars";
import {Import, Method} from "../types";

const generateForMetaTemplate = Handlebars.compile(readTemplate('tx-sign-and-send'));

export const FILE = (fileName : string, methods : Method[], additionalImports: Import[]) => generateForMetaTemplate({fileName, methods, additionalImports});
