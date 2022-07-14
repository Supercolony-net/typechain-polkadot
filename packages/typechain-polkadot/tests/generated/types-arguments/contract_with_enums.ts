import type BN from 'bn.js';

export interface EnumExample {
	A ? : string,
	B ? : (string | number | BN),
	C ? : AnotherEnum,
	E ? : null
}

export class EnumExampleBuilder {
	static A(value: string): EnumExample {
		return {
			A: value
		};
	}
	static B(value: (string | number | BN)): EnumExample {
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

export interface AnotherEnum {
	A ? : Array<(number | string | BN)>,
	B ? : null
}

export class AnotherEnumBuilder {
	static A(value: Array<(number | string | BN)>): AnotherEnum {
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

