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

import * as FsExtraAPI from "fs-extra";
import PathAPI from "path";
import FsAPI from "fs";

/**
 * Assures that the given directory exists
 * @param absPathToBase - The absolute path to the base directory
 * @param relPathToDir - The relative path to the directory
 */
export function assureDirExists(absPathToBase : string, relPathToDir : string) {
	const absPath = PathAPI.resolve( absPathToBase, `./${relPathToDir}` );
	if( !FsAPI.existsSync(absPath) ) FsAPI.mkdirSync(absPath);
}

/**
 * Writes a file to the given path
 * @param absPathToBase - The absolute path to the base directory
 * @param relFilePath - The relative path to the file
 * @param contents - The contents of the file
 */
export function writeFileSync(absPathToBase : string, relFilePath : string, contents : string) {
	FsAPI.writeFileSync(
		PathAPI.resolve( absPathToBase, `./${relFilePath}` ),
		contents
	);
}

/**
 * Generates a directories' hierarchy for the given path
 * @param absPathToOutput - The absolute path to the output directory
 */
export function generateProjectStructure(absPathToOutput: string) {
	assureDirExists(absPathToOutput, '');
	assureDirExists(absPathToOutput, 'shared');
	FsExtraAPI.copySync(
		PathAPI.resolve(__dirname, '../templates/raw/shared'),
		PathAPI.resolve(absPathToOutput, 'shared')
	);
}