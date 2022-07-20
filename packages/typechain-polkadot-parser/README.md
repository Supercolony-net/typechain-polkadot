# Typechain-polkadot-parser

---

Utility package for parsing ABIs of Polkadot smart contracts.

## Types

---

- `class TypeParser` - Parser for ABIs of Polkadot smart contracts. It contains only one public method `getType` that takes type id as a parameter and returns a `TypeInfo` object. Also it has public field `tsTypes` that contains a map of all parsed types.

- `class TypeInfo` - Contains information about a type.
``` typescript
TypeInfo {
	id: number; // - id of the type
	tsArgType: string; // - TypeScript type of the type's arguments
	tsReturnType: string; // - TypeScript type of the type's return value
	bodyArgType ?: string; // - TypeScript type of the type's body arguments
	bodyReturnType ?: string; // - TypeScript type of the type's body return value

	static get EMPTY_TYPE_INFO(); // - Returns an empty `TypeInfo` object.
}
```
