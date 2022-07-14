import type ABI from './abi_interface';
import {Abi} from "@polkadot/api-contract";

import {INK_TYPES_TO_TS_RETURNS} from "./consts";
import assert from "assert";

////
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

export default function parseABI(abi: Abi) : ParsedABI {
	const types = abi.metadata.types;
	let composites = new Array<{id: number, name: string, body: string}>();
	let enums = new Array<{id: number, name: string, body: string}>();
	let typesTS = new Array<string>(types.length);
	typesTS.fill('');

	const generateType = (typeId: number): string => {
		if (typesTS[typeId] !== '') {
			return typesTS[typeId]!;
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
					composites.push({
						id: typeId,
						name: compositeName,
						body: `export type ${compositeName} = string`
					});
					return typesTS[typeId] = compositeName;
				}
				else {
					resultComposite = generateInterface(
						compositeName,
						composite.fields.map(field => field.name.toString()),
						composite.fields.map(field => generateType(field.type as unknown as number))
					)

					composites.push({
						id: typeId,
						name: compositeName,
						body: resultComposite
					});
				}
				return typesTS[typeId] = compositeName;
			case 'Variant':
				const variant = type.def.asVariant;

				let resultVariant = '';
				let variantName = type.path[type.path.length - 1]!.toString();
				if (variantName == 'Option' || variantName == 'Result') {
					let _type;
					if (variant.variants[0]!.fields.length > 0) {
						_type =
							generateType(variant.variants[0]!.fields[0]!.type.toJSON() as number);
					} else {
						_type = 'null';
					}
					return typesTS[typeId] = _type as string;
				}

				resultVariant = generateEnum(
					variantName,
					variant.variants.map(variant => variant.name.toString())
				);

				enums.push({
					id: typeId,
					name: variantName,
					body: resultVariant
				});

				return typesTS[typeId] = variantName;
			case 'Sequence':
				return typesTS[typeId] = 'Array<' + generateType(type.def.asSequence.type.toJSON() as number) + '>';
			case 'Array':
				const array = type.def.asArray;
				return typesTS[typeId] = generateType(array.type.toJSON() as number) + '[]';
			case 'Tuple':
				const tuple = type.def.asTuple.toJSON() as number[];
				if (tuple.length == 0) {
					return typesTS[typeId] = 'null';
				} else {
					return typesTS[typeId] = '[' + tuple.map(field => generateType(field!)).join(', ') + ']';
				}
			case 'Primitive':
				return typesTS[typeId] = parsePrimitive(type.def.asPrimitive.toString());
			default:
				throw new Error(`Unknown type ${type.def.type}`);
		}
	}

	let result = new Array<{
		id: number,
		tsStr: string,
		type: string
	}>(typesTS.length);

	for (let i = 0; i < typesTS.length; i++) {
		result[i] = {
			id: i,
			tsStr: generateType(i),
			type: types[i]!.type.def.type,
		};
	}

	return {
		types: result,
		composites: composites,
		enums: enums,
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