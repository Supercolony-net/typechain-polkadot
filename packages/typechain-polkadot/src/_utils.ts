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

import {__assureDirExists} from "./generators/_utils";
import * as FsExtraAPI from "fs-extra";
import PathAPI from "path";

/**
 * Generates a directories' hierarchy for the given path
 * @param absPathToOutput - The absolute path to the output directory
 */
export function generateProjectStructure(absPathToOutput: string) {
	__assureDirExists(absPathToOutput, '');
	__assureDirExists(absPathToOutput, '_sdk');
	FsExtraAPI.copySync(
		PathAPI.resolve(__dirname, './output-generators/raw/_sdk'),
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
	__assureDirExists(absPathToOutput, "constructors");
}