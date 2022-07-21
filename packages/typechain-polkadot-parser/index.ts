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

	constructor(abi: Abi) {
		this.abiTypes = abi.metadata.types;

		this.tsTypes = this.abiTypes.map((_, i) => {
			return this.generateType(i);
		});
	}

	public getType(id: number): TypeInfo {
		return this.tsTypes[id]!;
	}

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

	private generatePrimitive = (typeId: number): TypeInfo => {
		const type = this.abiTypes[typeId]!.type;

		return new TypeInfo(
			typeId,
			parsePrimitiveArgs(type.def.asPrimitive.toString()),
			parsePrimitiveReturns(type.def.asPrimitive.toString()),
			parsePrimitiveArgs(type.def.asPrimitive.toString()),
			parsePrimitiveReturns(type.def.asPrimitive.toString()),
		);
	};

	private generateSequence = (typeId: number): TypeInfo => {
		const type = this.abiTypes[typeId]!.type.def.asSequence.type.toJSON() as number;

		return new TypeInfo(
			typeId,
			`Array<${this.generateType(type).tsArgType}>`,
			`Array<${this.generateType(type).tsReturnType}>`,
			`Array<${this.generateType(type).tsArgTypePrefixed}>`,
			`Array<${this.generateType(type).tsReturnTypePrefixed}>`,
		);
	};

	private generateArray = (typeId: number): TypeInfo => {
		const type = this.abiTypes[typeId]!.type.def.asArray.type.toJSON() as number;

		return new TypeInfo(
			typeId,
			`Array<${this.generateType(type).tsArgType}>`,
			`Array<${this.generateType(type).tsReturnType}>`,
			`Array<${this.generateType(type).tsArgTypePrefixed}>`,
			`Array<${this.generateType(type).tsReturnTypePrefixed}>`,
		);
	};

	private generateTuple = (typeId: number): TypeInfo => {
		const type = this.abiTypes[typeId]!.type.def.asTuple.toJSON() as number[];
		if (type.length == 0) {
			return new TypeInfo(
				typeId,
				'null',
				'null',
				'null',
				'null',
			);
		}
		return new TypeInfo(
			typeId,
			`[${type.map(type => this.generateType(type).tsArgType).join(', ')}]`,
			`[${type.map(type => this.generateType(type).tsReturnType).join(', ')}]`,
			`[${type.map(type => this.generateType(type).tsArgTypePrefixed).join(', ')}]`,
			`[${type.map(type => this.generateType(type).tsReturnTypePrefixed).join(', ')}]`,
		);
	};

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
					generatedType.tsReturnType,
					`${generatedType.tsArgTypePrefixed} | null`,
					generatedType.tsReturnTypePrefixed,
				);
			} else {
				return new TypeInfo(
					typeID,
					'null',
					'null',
					'null',
					'null',
				);
			}
		} else if (variantName == 'Option') {
			if (variant.variants[1]!.fields.length > 0) {
				const generatedType = this.generateType(variant.variants[1]!.fields[0]!.type.toJSON() as number);
				return new TypeInfo(
					typeID,
					`${generatedType.tsArgType} | null`,
					`${generatedType.tsArgType} | null`,
					`${generatedType.tsArgTypePrefixed} | null`,
					`${generatedType.tsArgTypePrefixed} | null`,
				);
			}
			else {
				return new TypeInfo(
					typeID,
					'null',
					'null',
					'null',
					'null',
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
				`ArgumentTypes.${variantName}`,
				`ReturnTypes.${variantName}`,
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
				`ArgumentTypes.${variantName}`,
				`ReturnTypes.${variantName}`,
				bodyArgs,
				bodyReturns,
			);
		}
	};
}