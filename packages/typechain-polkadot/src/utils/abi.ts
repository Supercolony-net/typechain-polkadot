import {Abi} from "@polkadot/api-contract";
import {AbiMessage} from "@polkadot/api-contract/types";

function __getV3(abiJson: any) {
	if (abiJson.V3) return abiJson.V3;
	return abiJson;
}

/**
 * Preprocess abi to avoid bugs in the generated code
 *
 * @param _abiStr - ABI as string
 * @returns Abi - Preprocessed ABI
 */
export function preprocessABI(_abiStr: string): Abi {
	const abiJson = JSON.parse(_abiStr);

	for (const method of __getV3(abiJson).spec.messages) {
		for (const arg of method.args) {
			for (let i = 0; i < arg.type.displayName.length; i++) {
				arg.type.displayName[i] = `_${arg.type.displayName[i]}`;
			}
		}
	}

	for (const method of __getV3(abiJson).spec.constructors) {
		for (const arg of method.args) {
			for (let i = 0; i < arg.type.displayName.length; i++) {
				arg.type.displayName[i] = `_${arg.type.displayName[i]}`;
			}
		}
	}

	const typeNamesCount = new Map<string, number>();

	for (const {type} of __getV3(abiJson).types) {
		if (type.path === undefined) continue;
		if (type.path[type.path.length - 1] == 'Mapping') continue;

		if (type.path.length > 0) {
			const value = typeNamesCount.get(type.path[type.path.length - 1]) || 0;
			typeNamesCount.set(
				type.path[type.path.length - 1],
				value + 1
			);
		}
	}

	let __i = 0;
	for (const {type} of __getV3(abiJson).types) {
		__i++;
		if (type.path === undefined) continue;
		if (type.path[type.path.length - 1] == 'Mapping') continue;

		const count = typeNamesCount.get(type.path[type.path.length - 1]);
		if (type.path.length > 0 && (count ? count : 0) > 1) {
			if (type.path.length > 3) {
				__getV3(abiJson).types[__i - 1].type.path[type.path.length - 1] = `${type.path[type.path.length - 2]}_${type.path[type.path.length - 1]}`;
			}
		}
	}

	const _abiStrWithUnderscores = JSON.stringify(abiJson, null, 2);

	return new Abi(_abiStrWithUnderscores);
}

/**
 * Gets the type name of the return type of a message
 * @param abi - ABI
 * @param message - Message
 */
export function getTypeName(abi: Abi, message: AbiMessage): string | undefined {
	if (!message)
		return undefined;

	if (!message.returnType)
		return undefined;

	const type = abi.metadata.types.find(e => message.returnType?.lookupIndex == e.id.toNumber());

	if (!type)
		return undefined;

	const typeNamePath = type.type.path;

	if (!typeNamePath || typeNamePath.length == 0)
		return undefined;

	const typeName = typeNamePath[typeNamePath.length - 1]!.toString();

	return typeName;
}