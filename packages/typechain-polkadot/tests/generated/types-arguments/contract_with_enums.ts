import type BN from 'bn.js';

export interface EnumExample {
	a ? : string,
	b ? : (string | number | BN),
	c ? : AnotherEnum,
	e ? : null
}

export class EnumExampleBuilder {
	static A(value: string): EnumExample {
		return {
			a: value,
		};
	}
	static B(value: (string | number | BN)): EnumExample {
		return {
			b: value,
		};
	}
	static C(value: AnotherEnum): EnumExample {
		return {
			c: value,
		};
	}
	static E(): EnumExample {
		return {
			e: null,
		};
	}
}

export interface AnotherEnum {
	a ? : Array<(number | string | BN)>,
	b ? : null
}

export class AnotherEnumBuilder {
	static A(value: Array<(number | string | BN)>): AnotherEnum {
		return {
			a: value,
		};
	}
	static B(): AnotherEnum {
		return {
			b: null,
		};
	}
}

