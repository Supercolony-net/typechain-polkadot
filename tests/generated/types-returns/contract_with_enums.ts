export interface AnotherEnum {
	A ? : Array<number>,
	B ? : null
}

export class AnotherEnumBuilder {
	static A(value: Array<number>): AnotherEnum {
		return {
			A: value
		};
	}
	static B(): AnotherEnum {
		return {
			B: null
		};
	}
}

export interface EnumExample {
	A ? : string,
	B ? : (string | number),
	C ? : AnotherEnum,
	E ? : null
}

export class EnumExampleBuilder {
	static A(value: string): EnumExample {
		return {
			A: value
		};
	}
	static B(value: (string | number)): EnumExample {
		return {
			B: value
		};
	}
	static C(value: AnotherEnum): EnumExample {
		return {
			C: value
		};
	}
	static E(): EnumExample {
		return {
			E: null
		};
	}
}