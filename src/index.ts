import {Abi} from "@polkadot/api-contract";

import {INK_TYPES_TO_TS_RETURNS} from "./consts";
import assert from "assert";

export interface ParsedABI {
	types: Array<{id: number, tsStr: string, type: string}>,
	composites: Array<{id: number, name: string, body: string}>,
	enums: Array<{id: number, name: string, body: string}>,
}

const parsePrimitive = (primitive: string): string => {
	// @ts-ignore
	return INK_TYPES_TO_TS_RETURNS[primitive];
};

const generateInterface = (interfaceName: string, argumentNames: string[], argumentTypes: string[]): string => {
	assert(argumentNames.length == argumentTypes.length);

	return `export type ${interfaceName} = {
\t${argumentNames.map((e, i) => `${e}: ${argumentTypes[i]}`).join(',\n\t')}
}`
}

export const generateEnum = (enumName: string, enumFields: string[]): string => {
	return `export enum ${enumName} {
	${enumFields.join(',\n\t')}
}`
}

export const generateClassEnum = (enumName: string, enumFields: string[], enumValues: string[]): string => {
	assert(enumFields.length == enumValues.length);
	return `export interface ${enumName} {
	${enumFields.map((e, i) => `${e} ? : ${enumValues[i]}`).join(',\n\t')}
}

export class ${enumName}Builder {
	${enumFields.map((e, i) => `static ${e}(${enumValues[i] !== 'null' ? `value: ${enumValues[i]}` : ''}): ${enumName} {
		return {
		${enumValues[i] !== 'null' ? `\t${e}: value` : `\t${e}: null`}
		};
	}`).join('\n\t')}
}`
}

export default function parseABI(abi: Abi) : ParsedABI {
	const types = abi.metadata.types;
	let compositesBodies = new Array<{id: number, name: string, body: string}>();
	let enumsBodies = new Array<{id: number, name: string, body: string}>();
	let typescriptTypes = new Array<string>(types.length);
	typescriptTypes.fill('');

	const generateType = (typeId: number): string => {
		if (typescriptTypes[typeId] !== '') {
			return typescriptTypes[typeId]!;
		}

		const type = types[typeId]!.type;

		switch (type.def.type) {
			case 'Composite':
				const composite = type.def.asComposite;
				const compositeName = type.path[type.path.length - 1]!.toString();
				let resultComposite = '';

				if (compositeName == 'Mapping')
					return '';

				// @ts-ignore
				if (composite.fields.length == 1 && composite.fields[0].typeName == "[u8; 32]") {
					compositesBodies.push({
						id: typeId,
						name: compositeName,
						body: `export type ${compositeName} = string`
					});
					return typescriptTypes[typeId] = compositeName;
				}
				else {
					resultComposite = generateInterface(
						compositeName,
						composite.fields.map(field => field.name.toString()),
						composite.fields.map(field => generateType(field.type as unknown as number))
					)

					compositesBodies.push({
						id: typeId,
						name: compositeName,
						body: resultComposite
					});
				}
				return typescriptTypes[typeId] = compositeName;
			case 'Variant':
				const variant = type.def.asVariant;
				let resultVariant = '';
				let variantName = type.path[type.path.length - 1]!.toString();

				if (variantName == 'Result') {
					let _type;
					if (variant.variants[0]!.fields.length > 0) {
						_type =
							generateType(variant.variants[0]!.fields[0]!.type.toJSON() as number);
					} else {
						_type = 'null';
					}
					return typescriptTypes[typeId] = _type as string;
				} else if (variantName == 'Option') {
					let _type;
					if (variant.variants[1]!.fields.length > 0) {
						_type =
							`(${generateType(variant.variants[1]!.fields[0]!.type.toJSON() as number)} | null)`;
					} else {
						_type = 'null';
					}
					return typescriptTypes[typeId] = _type as string;
				}

				let isInterface = false;
				for (const __variant of variant.variants) {
					if (__variant.fields.length > 0) {
						isInterface = true;
						break;
					}
				}

				if (!isInterface) {
					resultVariant = generateEnum(
						variantName,
						variant.variants.map((variant) => variant.name.toString()),
					);
				} else {
					resultVariant = generateClassEnum(
						variantName,
						variant.variants.map((variant) => variant.name.toString()),
						variant.variants.map((variant, i) => {
							if (variant.fields.length > 0) {
								const type = generateType(variant.fields[0]!.type.toJSON() as number);
								return `${type}`;
							} else {
								return `null`;
							}
						}),
					)
				}

				enumsBodies.push({
					id: typeId,
					name: variantName,
					body: resultVariant
				});
				return typescriptTypes[typeId] = variantName;
			case 'Sequence':
				return typescriptTypes[typeId] = 'Array<' + generateType(type.def.asSequence.type.toJSON() as number) + '>';
			case 'Array':
				const array = type.def.asArray;
				return typescriptTypes[typeId] = generateType(array.type.toJSON() as number) + '[]';
			case 'Tuple':
				const tuple = type.def.asTuple.toJSON() as number[];
				if (tuple.length == 0) {
					return typescriptTypes[typeId] = 'null';
				} else {
					return typescriptTypes[typeId] = '[' + tuple.map(field => generateType(field!)).join(', ') + ']';
				}
			case 'Primitive':
				return typescriptTypes[typeId] = parsePrimitive(type.def.asPrimitive.toString());
			default:
				throw new Error(`Unknown type ${type.def.type}`);
		}
	}

	let result = new Array<{
		id: number,
		tsStr: string,
		type: string
	}>(typescriptTypes.length);

	for (let i = 0; i < typescriptTypes.length; i++) {
		result[i] = {
			id: i,
			tsStr: generateType(i),
			type: types[i]!.type.def.type,
		};
	}

	return {
		types: result,
		composites: compositesBodies,
		enums: enumsBodies,
	};
}

export function typeDecoder(__abiStr: string) {
	const abi = new Abi(JSON.parse(__abiStr));
	const result = parseABI(abi);
	return {
		decoder: (typeId: number) => {
			return result.types[typeId]!.tsStr!;
		},
		result: result
	}
}