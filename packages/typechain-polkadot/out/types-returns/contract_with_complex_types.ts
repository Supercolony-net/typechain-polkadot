import type BN from 'bn.js';

export type AccountId = string | number[]

export type Key = string | number[]

export interface PSP22Error {
	Custom ? : string,
	InsufficientBalance ? : null,
	InsufficientAllowance ? : null,
	ZeroRecipientAddress ? : null,
	ZeroSenderAddress ? : null,
	SafeTransferCheckFailed ? : string
}

export class PSP22ErrorBuilder {
	static Custom(value: string): PSP22Error {
		return {
			Custom: value
		};
	}
	static InsufficientBalance(): PSP22Error {
		return {
			InsufficientBalance: null
		};
	}
	static InsufficientAllowance(): PSP22Error {
		return {
			InsufficientAllowance: null
		};
	}
	static ZeroRecipientAddress(): PSP22Error {
		return {
			ZeroRecipientAddress: null
		};
	}
	static ZeroSenderAddress(): PSP22Error {
		return {
			ZeroSenderAddress: null
		};
	}
	static SafeTransferCheckFailed(value: string): PSP22Error {
		return {
			SafeTransferCheckFailed: value
		};
	}
}

export type ComplexStruct1 = {
	a: number,
	b: number,
	c: string,
	d: Array<number>,
	e: Array<number>,
	f: Array<(string | number)>
}

export type ModForComplexStructOverflow_ComplexStruct1 = {
	aa: number,
	bb: number,
	cc: string
}

export interface FlashLenderError {
	Custom ? : string,
	WrongTokenAddress ? : null,
	AllowanceDoesNotAllowRefund ? : null,
	BorrowerRejected ? : string
}

export class FlashLenderErrorBuilder {
	static Custom(value: string): FlashLenderError {
		return {
			Custom: value
		};
	}
	static WrongTokenAddress(): FlashLenderError {
		return {
			WrongTokenAddress: null
		};
	}
	static AllowanceDoesNotAllowRefund(): FlashLenderError {
		return {
			AllowanceDoesNotAllowRefund: null
		};
	}
	static BorrowerRejected(value: string): FlashLenderError {
		return {
			BorrowerRejected: value
		};
	}
}

export enum OwnableError {
	CallerIsNotOwner,
	NewOwnerIsZero
}

