export class TypeInfo {
	id: number;
	tsArgType: string;
	tsReturnType: string;
	// For enums and composites
	bodyArgType ?: string;
	bodyReturnType ?: string;

	constructor(id: number, tsArgType: string, tsReturnType: string, bodyArgType?: string, bodyReturnType?: string) {
		this.id = id;
		this.tsArgType = tsArgType;
		this.tsReturnType = tsReturnType;
		this.bodyArgType = bodyArgType;
		this.bodyReturnType = bodyReturnType;
	}

	static get EMPTY_TYPE_INFO() {
		return new TypeInfo(0, '', '');
	}
}