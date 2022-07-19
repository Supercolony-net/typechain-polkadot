/* eslint-disable indent */

import Handlebars from "handlebars";
import {readTemplate} from "./_utils";
import {Import, Type} from "../types";

const generateForMetaTemplate = Handlebars.compile(readTemplate("return-values"));

export const FILE = (types : Type[], additionalImports: Import[]) => generateForMetaTemplate({types, additionalImports});