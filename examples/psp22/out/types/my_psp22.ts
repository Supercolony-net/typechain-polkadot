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

export type AccountId = string

export type Key = string