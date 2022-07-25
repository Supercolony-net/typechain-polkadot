import Handlebars from "handlebars";
import {readTemplate} from "./_utils";
import {Import} from "../types";
import {TypeInfo} from "@supercolony-net/typechain-polkadot-parser/src/types/TypeInfo";

const generateForMetaTemplate = Handlebars.compile(readTemplate("types-arguments"));

export const FILE = (tsTypes : TypeInfo[], additionalImports: Import[]) => generateForMetaTemplate({tsTypes, additionalImports});