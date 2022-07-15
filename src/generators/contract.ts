/* eslint-disable indent */

import Handlebars from "handlebars";
import {readTemplate} from "./_utils";
import {Import} from "../types";

const generateForMetaTemplate = Handlebars.compile(readTemplate("contract"));

export const FILE = (fileName : string, abiDirRelPath : string, additionalImports: Import[]) => generateForMetaTemplate({fileName, abiDirRelPath, additionalImports});