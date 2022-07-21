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

import {Abi} from "@polkadot/api-contract";
import PathAPI from "path";
import {__writeFileSync} from "./_utils";
import * as CONTRACT_TEMPLATES from "../output-generators/contract";
import {Import} from "../types";

export default function generate(abi: Abi, fileName: string, absPathToOutput: string, absPathToABIs: string) {
	const imports: Import[] = [];
	const relPathFromOutL1toABIs = PathAPI.relative(
		PathAPI.resolve(absPathToOutput, "contracts"),
		absPathToABIs
	);

	__writeFileSync(absPathToOutput, `contracts/${fileName}.ts`, CONTRACT_TEMPLATES.FILE(fileName, relPathFromOutL1toABIs, imports));
}