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

/* eslint-disable indent */

import Handlebars from "handlebars";
import {readTemplate} from "./_utils";
import {Import, Method} from "../types";

const generateForMetaTemplate = Handlebars.compile(readTemplate("constructors"));

/**
 * Generates file content for constructors/<fileName>.ts using Handlebars
 *
 * @param {string} fileName - The name of the file to write to
 * @param {string} contractDirRelPath - The relative path to the contract directory
 * @param {Method[]} methods - The methods to generate for the file
 * @returns {string} Generated file content
 */
export const FILE = (fileName : string, contractDirRelPath : string, methods: Method[]) => generateForMetaTemplate({fileName, contractDirRelPath, methods});