import type BN from 'bn.js';

export interface EnumExample {
	a ? : string,
	b ? : (string | number),
	c ? : AnotherEnum,
	e ? : null
}

export class EnumExampleBuilder {
	static A(value: string): EnumExample {
		return {
			a: value,
		};
	}
	static B(value: (string | number)): EnumExample {
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
	a ? : Array<number>,
	b ? : null
}

export class AnotherEnumBuilder {
	static A(value: Array<number>): AnotherEnum {
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

