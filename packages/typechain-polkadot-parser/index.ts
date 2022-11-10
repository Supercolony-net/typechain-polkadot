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

/**
 *  ## Typechain-Polkadot-Parser
 *
 *	Utility-package for parsing types from ABIs for @727-ventures/typechain-polkadot.
 *
 *
 *	@remarks
 *	This tool generates TypeScript types from Polkadot Contract ABIs.
 *
 *  @packageDocumentation
 */

import {Abi} from "@polkadot/api-contract";
import {
	generateClassEnum,
	generateEnum,
	generateInterfaceArgs, generateInterfaceReturns,
	parsePrimitiveArgs,
	parsePrimitiveReturns, preprocessABI,
} from "./src/utils";
import {PortableType} from "@polkadot/types/interfaces/metadata/types";
import {Vec} from "@polkadot/types-codec/base/Vec";
import {TypeInfo} from "./src/types/TypeInfo";

export class TypeParser {
	readonly tsTypes: Array<TypeInfo> = [];
	private abiTypes: Vec<PortableType>;

	/**
	 * @constructor
	 * @param abi: The ABI to parse (should be preprocessed with preprocessABI (see in {@link ./src/utils:preprocessABI}))
	 *
	 * @remark When you are creating instances of this class calling constructor, types are automatically parsing.
	 */
	constructor(abi: Abi) {
		this.abiTypes = abi.metadata.types;

		this.tsTypes = this.abiTypes.map((_, i) => {
			return this.generateType(i);
		});
	}

	/**
	 * getType
	 *
	 * @param {number} id - The index of the type in the ABI
	 * @returns {TypeInfo} TypeInfo
	 */
	public getType(id: number): TypeInfo {
		return this.tsTypes[id]!;
	}

	/**
	 * generateType
	 *
	 * @param typeId - The in
	 *
	 * @returns {TypeInfo} TypeInfo
	 *
	 * @remarks
	 * This function generates TypeInfo for the given typeId using recursive algorithm.
	 */
	private generateType = (typeId: number): TypeInfo => {
		const type = this.abiTypes[typeId]!.type;

		switch (type.def.type) {
			case 'Composite':
				return this.generateComposite(typeId);
			case 'Variant':
				return this.generateVariant(typeId);
			case 'Sequence':
				return this.generateSequence(typeId);
			case 'Array':
				return this.generateArray(typeId);
			case 'Tuple':
				return this.generateTuple(typeId);
			case 'Primitive':
				return this.generatePrimitive(typeId);
			default:
				throw new Error(`Unknown type ${type.def.type}`);
		}
	};

	/**
	 * Function to generate TypeInfo for Composite type
	 *
	 * @param typeId - The index of the type in the ABI
	 */
	private generateComposite = (typeId: number): TypeInfo => {
		const type = this.abiTypes[typeId]!.type;

		const composite = type.def.asComposite;
		const compositeName = type.path[type.path.length - 1]!.toString();

		if (compositeName == 'Mapping')
			return TypeInfo.EMPTY_TYPE_INFO;

		// @ts-ignore
		if (composite.fields.length == 1 && composite.fields[0].typeName == "[u8; 32]") {
			return new TypeInfo(
				typeId,
				compositeName,
				compositeName,
				`export type ${compositeName} = string`,
				`export type ${compositeName} = string | number[]`,
			);
		}

		const compositeBodyReturns = generateInterfaceReturns(
			compositeName,
			composite.fields.map(field => field.name.toString()),
			composite.fields.map(field => this.generateType(field.type as unknown as number))
		);

		const compositeBodyArgs = generateInterfaceArgs(
			compositeName,
			composite.fields.map(field => field.name.toString()),
			composite.fields.map(field => this.generateType(field.type as unknown as number))
		);

		return new TypeInfo(
			typeId,
			compositeName,
			compositeName,
			compositeBodyArgs,
			compositeBodyReturns,
		);
	};

	/**
	 * Function to generate TypeInfo for Variant type
	 * @param typeId - The index of the type in the ABI
	 */
	private generatePrimitive = (typeId: number): TypeInfo => {
		const type = this.abiTypes[typeId]!.type;

		return new TypeInfo(
			typeId,
			parsePrimitiveArgs(type.def.asPrimitive.toString()),
			parsePrimitiveReturns(type.def.asPrimitive.toString())
		);
	};

	/**
	 * Function to generate TypeInfo for Variant type
	 * @param typeId - The index of the type in the ABI
	 */
	private generateSequence = (typeId: number): TypeInfo => {
		const type = this.abiTypes[typeId]!.type.def.asSequence.type.toJSON() as number;

		return new TypeInfo(
			typeId,
			`Array<${this.generateType(type).tsArgType}>`,
			`Array<${this.generateType(type).tsReturnType}>`
		);
	};

	/**
	 * Function to generate TypeInfo for Variant type
	 * @param typeId - The index of the type in the ABI
	 */
	private generateArray = (typeId: number): TypeInfo => {
		const type = this.abiTypes[typeId]!.type.def.asArray.type.toJSON() as number;

		return new TypeInfo(
			typeId,
			`Array<${this.generateType(type).tsArgType}>`,
			`Array<${this.generateType(type).tsReturnType}>`
		);
	};

	/**
	 * Function to generate TypeInfo for Variant type
	 * @param typeId - The index of the type in the ABI
	 */
	private generateTuple = (typeId: number): TypeInfo => {
		const type = this.abiTypes[typeId]!.type.def.asTuple.toJSON() as number[];
		if (type.length == 0) {
			return new TypeInfo(
				typeId,
				'null',
				'null'
			);
		}
		return new TypeInfo(
			typeId,
			`[${type.map(type => this.generateType(type).tsArgType).join(', ')}]`,
			`[${type.map(type => this.generateType(type).tsReturnType).join(', ')}]`
		);
	};

	/**
	 * Function to generate TypeInfo for Variant type
	 * @param typeID - The index of the type in the ABI
	 */
	private generateVariant = (typeID: number): TypeInfo => {
		const type = this.abiTypes[typeID]!.type;
		const variant = this.abiTypes[typeID]!.type.def.asVariant;

		const variantName = type.path[type.path.length - 1]!.toString();

		if (variantName == 'Result') {
			if (variant.variants[0]!.fields.length > 0) {
				const generatedType = this.generateType(variant.variants[0]!.fields[0]!.type.toJSON() as number);
				return new TypeInfo(
					typeID,
					`${generatedType.tsArgType} | null`,
					generatedType.tsReturnType
				);
			} else {
				return new TypeInfo(
					typeID,
					'null',
					'null'
				);
			}
		} else if (variantName == 'Option') {
			if (variant.variants[1]!.fields.length > 0) {
				const generatedType = this.generateType(variant.variants[1]!.fields[0]!.type.toJSON() as number);
				return new TypeInfo(
					typeID,
					`${generatedType.tsArgType} | null`,
					`${generatedType.tsArgType} | null`
				);
			}
			else {
				return new TypeInfo(
					typeID,
					'null',
					'null'
				);
			}
		}

		let isInterface = false;
		for (const __variant of variant.variants) {
			if (__variant.fields.length > 0) {
				isInterface = true;
				break;
			}
		}

		if (!isInterface) {
			const body = generateEnum(
				variantName,
				variant.variants.map((variant) => variant.name.toString()),
			);
			return new TypeInfo(
				typeID,
				variantName,
				variantName,
				body,
				body,
			);
		} else {
			const bodyArgs = generateClassEnum(
				variantName,
				variant.variants.map((variant) => variant.name.toString()),
				variant.variants.map((variant, i) => {
					if (variant.fields.length > 0) {
						const type = this.generateType(variant.fields[0]!.type.toJSON() as number).tsArgType;
						return `${type}`;
					} else {
						return `null`;
					}
				}),
			);
			const bodyReturns = generateClassEnum(
				variantName,
				variant.variants.map((variant) => variant.name.toString()),
				variant.variants.map((variant, i) => {
					if (variant.fields.length > 0) {
						const type = this.generateType(variant.fields[0]!.type.toJSON() as number).tsReturnType;
						return `${type}`;
					} else {
						return `null`;
					}
				}),
			);
			return new TypeInfo(
				typeID,
				variantName,
				variantName,
				bodyArgs,
				bodyReturns,
			);
		}
	};
}