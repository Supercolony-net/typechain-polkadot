/* eslint-disable indent */

import Handlebars from "handlebars";
import {readTemplate} from "./_utils";
import {Import, Method} from "../types";

const generateForMetaTemplate = Handlebars.compile(readTemplate("constructors"));

export const FILE = (fileName : string, pathToContractFile : string, methods: Method[]) => generateForMetaTemplate({fileName, pathToContractFile: pathToContractFile, methods});