import type BN from 'bn.js';

export type AccountId = string

export type InvestmentDetails = {
	investment_id: (string | number | BN),
	approval_date: (number | string | BN),
	starting_date: (number | string | BN),
	investment_token: AccountId,
	investment_tokens_amount: (string | number | BN),
	lending_token: AccountId,
	total_amount_to_be_raised: (string | number | BN),
	total_partitions_to_be_purchased: (string | number | BN),
	partitions_requested: (string | number | BN),
	extra_info: Hash
}

export type Hash = string

export type Key = string

export enum ProjectStatus {
	Requested,
	Approved,
	Started,
	Settled,
	Default,
	Rejected,
	Cancelled
}

export interface ProjectError {
	BaseProjectError ? : BaseProjectError,
	ProjectManagerError ? : ProjectManagerError,
	EscrowError ? : EscrowError,
	PSP22Error ? : PSP22Error,
	FundingNFTError ? : FundingNFTError,
	GovernanceError ? : GovernanceError,
	ReentrancyGuardError ? : ReentrancyGuardError,
	OwnableError ? : OwnableError,
	AddressOfLotteryNumberNotFound ? : null,
	NotEnoughTicketsRemaining ? : null,
	IncorrectProjectStatus ? : null,
	InvestmentNotFound ? : null,
	InvestmentAlreadyWithdrawn ? : null,
	InvalidRAlbtAmount ? : null,
	InvalidTicketAmount ? : null,
	InvalidLendingToken ? : null,
	InvalidAmountsRequested ? : null,
	InvalidArgument ? : null,
	InvalidCaller ? : null,
	InsufficientTickets ? : null,
	InsufficientRAlbt ? : null,
	InsufficientInvestmentNFTs ? : null,
	InsufficientTokens ? : null,
	IntegerDivisionError ? : null,
	IntegerUnderflow ? : null,
	IntegerOverflow ? : null,
	Other ? : null
}

export class ProjectErrorBuilder {
	static BaseProjectError(value: BaseProjectError): ProjectError {
		return {
			BaseProjectError: value
		};
	}
	static ProjectManagerError(value: ProjectManagerError): ProjectError {
		return {
			ProjectManagerError: value
		};
	}
	static EscrowError(value: EscrowError): ProjectError {
		return {
			EscrowError: value
		};
	}
	static PSP22Error(value: PSP22Error): ProjectError {
		return {
			PSP22Error: value
		};
	}
	static FundingNFTError(value: FundingNFTError): ProjectError {
		return {
			FundingNFTError: value
		};
	}
	static GovernanceError(value: GovernanceError): ProjectError {
		return {
			GovernanceError: value
		};
	}
	static ReentrancyGuardError(value: ReentrancyGuardError): ProjectError {
		return {
			ReentrancyGuardError: value
		};
	}
	static OwnableError(value: OwnableError): ProjectError {
		return {
			OwnableError: value
		};
	}
	static AddressOfLotteryNumberNotFound(): ProjectError {
		return {
			AddressOfLotteryNumberNotFound: null
		};
	}
	static NotEnoughTicketsRemaining(): ProjectError {
		return {
			NotEnoughTicketsRemaining: null
		};
	}
	static IncorrectProjectStatus(): ProjectError {
		return {
			IncorrectProjectStatus: null
		};
	}
	static InvestmentNotFound(): ProjectError {
		return {
			InvestmentNotFound: null
		};
	}
	static InvestmentAlreadyWithdrawn(): ProjectError {
		return {
			InvestmentAlreadyWithdrawn: null
		};
	}
	static InvalidRAlbtAmount(): ProjectError {
		return {
			InvalidRAlbtAmount: null
		};
	}
	static InvalidTicketAmount(): ProjectError {
		return {
			InvalidTicketAmount: null
		};
	}
	static InvalidLendingToken(): ProjectError {
		return {
			InvalidLendingToken: null
		};
	}
	static InvalidAmountsRequested(): ProjectError {
		return {
			InvalidAmountsRequested: null
		};
	}
	static InvalidArgument(): ProjectError {
		return {
			InvalidArgument: null
		};
	}
	static InvalidCaller(): ProjectError {
		return {
			InvalidCaller: null
		};
	}
	static InsufficientTickets(): ProjectError {
		return {
			InsufficientTickets: null
		};
	}
	static InsufficientRAlbt(): ProjectError {
		return {
			InsufficientRAlbt: null
		};
	}
	static InsufficientInvestmentNFTs(): ProjectError {
		return {
			InsufficientInvestmentNFTs: null
		};
	}
	static InsufficientTokens(): ProjectError {
		return {
			InsufficientTokens: null
		};
	}
	static IntegerDivisionError(): ProjectError {
		return {
			IntegerDivisionError: null
		};
	}
	static IntegerUnderflow(): ProjectError {
		return {
			IntegerUnderflow: null
		};
	}
	static IntegerOverflow(): ProjectError {
		return {
			IntegerOverflow: null
		};
	}
	static Other(): ProjectError {
		return {
			Other: null
		};
	}
}

export interface BaseProjectError {
	OwnableError ? : OwnableError,
	CallerIsNotGovernance ? : null,
	InvalidAccountId ? : null,
	LendingTokenAlreadyAdded ? : null
}

export class BaseProjectErrorBuilder {
	static OwnableError(value: OwnableError): BaseProjectError {
		return {
			OwnableError: value
		};
	}
	static CallerIsNotGovernance(): BaseProjectError {
		return {
			CallerIsNotGovernance: null
		};
	}
	static InvalidAccountId(): BaseProjectError {
		return {
			InvalidAccountId: null
		};
	}
	static LendingTokenAlreadyAdded(): BaseProjectError {
		return {
			LendingTokenAlreadyAdded: null
		};
	}
}

export enum OwnableError {
	CallerIsNotOwner,
	NewOwnerIsZero
}

export interface ProjectManagerError {
	OwnableError ? : OwnableError,
	CallerIsNotProject ? : null,
	IntegerOverflow ? : null
}

export class ProjectManagerErrorBuilder {
	static OwnableError(value: OwnableError): ProjectManagerError {
		return {
			OwnableError: value
		};
	}
	static CallerIsNotProject(): ProjectManagerError {
		return {
			CallerIsNotProject: null
		};
	}
	static IntegerOverflow(): ProjectManagerError {
		return {
			IntegerOverflow: null
		};
	}
}

export interface EscrowError {
	OwnableError ? : OwnableError,
	FundingNFTError ? : FundingNFTError,
	RAlbtError ? : RAlbtError,
	PSP1155Error ? : PSP1155Error,
	PSP22Error ? : PSP22Error,
	AlreadyInitialized ? : null,
	InvalidCaller ? : null,
	InvalidAccountId ? : null
}

export class EscrowErrorBuilder {
	static OwnableError(value: OwnableError): EscrowError {
		return {
			OwnableError: value
		};
	}
	static FundingNFTError(value: FundingNFTError): EscrowError {
		return {
			FundingNFTError: value
		};
	}
	static RAlbtError(value: RAlbtError): EscrowError {
		return {
			RAlbtError: value
		};
	}
	static PSP1155Error(value: PSP1155Error): EscrowError {
		return {
			PSP1155Error: value
		};
	}
	static PSP22Error(value: PSP22Error): EscrowError {
		return {
			PSP22Error: value
		};
	}
	static AlreadyInitialized(): EscrowError {
		return {
			AlreadyInitialized: null
		};
	}
	static InvalidCaller(): EscrowError {
		return {
			InvalidCaller: null
		};
	}
	static InvalidAccountId(): EscrowError {
		return {
			InvalidAccountId: null
		};
	}
}

export interface FundingNFTError {
	PSP1155Error ? : PSP1155Error,
	AccessControlError ? : AccessControlError,
	CallerIsNotMinter ? : null,
	CallerIsNotPauser ? : null,
	TransfersPaused ? : null,
	InvalidArgument ? : null,
	InvalidTokenId ? : null,
	IncreaseGenerationOverflow ? : null,
	DecreaseGenerationUnderflow ? : null
}

export class FundingNFTErrorBuilder {
	static PSP1155Error(value: PSP1155Error): FundingNFTError {
		return {
			PSP1155Error: value
		};
	}
	static AccessControlError(value: AccessControlError): FundingNFTError {
		return {
			AccessControlError: value
		};
	}
	static CallerIsNotMinter(): FundingNFTError {
		return {
			CallerIsNotMinter: null
		};
	}
	static CallerIsNotPauser(): FundingNFTError {
		return {
			CallerIsNotPauser: null
		};
	}
	static TransfersPaused(): FundingNFTError {
		return {
			TransfersPaused: null
		};
	}
	static InvalidArgument(): FundingNFTError {
		return {
			InvalidArgument: null
		};
	}
	static InvalidTokenId(): FundingNFTError {
		return {
			InvalidTokenId: null
		};
	}
	static IncreaseGenerationOverflow(): FundingNFTError {
		return {
			IncreaseGenerationOverflow: null
		};
	}
	static DecreaseGenerationUnderflow(): FundingNFTError {
		return {
			DecreaseGenerationUnderflow: null
		};
	}
}

export interface PSP1155Error {
	Custom ? : string,
	InsufficientBalance ? : null,
	TransferToZeroAddress ? : null,
	NotAllowed ? : null,
	SafeTransferCheckFailed ? : string
}

export class PSP1155ErrorBuilder {
	static Custom(value: string): PSP1155Error {
		return {
			Custom: value
		};
	}
	static InsufficientBalance(): PSP1155Error {
		return {
			InsufficientBalance: null
		};
	}
	static TransferToZeroAddress(): PSP1155Error {
		return {
			TransferToZeroAddress: null
		};
	}
	static NotAllowed(): PSP1155Error {
		return {
			NotAllowed: null
		};
	}
	static SafeTransferCheckFailed(value: string): PSP1155Error {
		return {
			SafeTransferCheckFailed: value
		};
	}
}

export enum AccessControlError {
	InvalidCaller,
	MissingRole,
	RoleRedundant
}

export interface RAlbtError {
	PSP22Error ? : PSP22Error,
	OwnableError ? : OwnableError
}

export class RAlbtErrorBuilder {
	static PSP22Error(value: PSP22Error): RAlbtError {
		return {
			PSP22Error: value
		};
	}
	static OwnableError(value: OwnableError): RAlbtError {
		return {
			OwnableError: value
		};
	}
}

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

export interface GovernanceError {
	StakingError ? : StakingError,
	OwnableError ? : OwnableError,
	ReentrancyGuardError ? : ReentrancyGuardError,
	ProjectError ? : string,
	CallerIsNotProject ? : null,
	CallerIsNotSuperDelegator ? : null,
	RequestNotFound ? : null,
	RequestAlreadyProcessed ? : null,
	InvalidAccountId ? : null,
	InvalidReward ? : null,
	UnknownProject ? : null,
	UnknownCronjob ? : null,
	UnknownUpdatableVariable ? : null,
	ProjectNotApproved ? : null,
	ProjectMissingInterest ? : null,
	IntegerOverflow ? : null
}

export class GovernanceErrorBuilder {
	static StakingError(value: StakingError): GovernanceError {
		return {
			StakingError: value
		};
	}
	static OwnableError(value: OwnableError): GovernanceError {
		return {
			OwnableError: value
		};
	}
	static ReentrancyGuardError(value: ReentrancyGuardError): GovernanceError {
		return {
			ReentrancyGuardError: value
		};
	}
	static ProjectError(value: string): GovernanceError {
		return {
			ProjectError: value
		};
	}
	static CallerIsNotProject(): GovernanceError {
		return {
			CallerIsNotProject: null
		};
	}
	static CallerIsNotSuperDelegator(): GovernanceError {
		return {
			CallerIsNotSuperDelegator: null
		};
	}
	static RequestNotFound(): GovernanceError {
		return {
			RequestNotFound: null
		};
	}
	static RequestAlreadyProcessed(): GovernanceError {
		return {
			RequestAlreadyProcessed: null
		};
	}
	static InvalidAccountId(): GovernanceError {
		return {
			InvalidAccountId: null
		};
	}
	static InvalidReward(): GovernanceError {
		return {
			InvalidReward: null
		};
	}
	static UnknownProject(): GovernanceError {
		return {
			UnknownProject: null
		};
	}
	static UnknownCronjob(): GovernanceError {
		return {
			UnknownCronjob: null
		};
	}
	static UnknownUpdatableVariable(): GovernanceError {
		return {
			UnknownUpdatableVariable: null
		};
	}
	static ProjectNotApproved(): GovernanceError {
		return {
			ProjectNotApproved: null
		};
	}
	static ProjectMissingInterest(): GovernanceError {
		return {
			ProjectMissingInterest: null
		};
	}
	static IntegerOverflow(): GovernanceError {
		return {
			IntegerOverflow: null
		};
	}
}

export interface StakingError {
	EscrowError ? : EscrowError,
	StakerMedalNftError ? : StakerMedalNFTError,
	PSP22Error ? : PSP22Error,
	PSP1155Error ? : PSP1155Error,
	ReentrancyGuardError ? : ReentrancyGuardError,
	OnlyRewardsDistributor ? : null,
	InvalidStakingType ? : null,
	InsufficientBalance ? : null,
	CannotStakeForTheSameType ? : null,
	IntegerOverflow ? : null,
	IntegerUnderflow ? : null
}

export class StakingErrorBuilder {
	static EscrowError(value: EscrowError): StakingError {
		return {
			EscrowError: value
		};
	}
	static StakerMedalNftError(value: StakerMedalNFTError): StakingError {
		return {
			StakerMedalNftError: value
		};
	}
	static PSP22Error(value: PSP22Error): StakingError {
		return {
			PSP22Error: value
		};
	}
	static PSP1155Error(value: PSP1155Error): StakingError {
		return {
			PSP1155Error: value
		};
	}
	static ReentrancyGuardError(value: ReentrancyGuardError): StakingError {
		return {
			ReentrancyGuardError: value
		};
	}
	static OnlyRewardsDistributor(): StakingError {
		return {
			OnlyRewardsDistributor: null
		};
	}
	static InvalidStakingType(): StakingError {
		return {
			InvalidStakingType: null
		};
	}
	static InsufficientBalance(): StakingError {
		return {
			InsufficientBalance: null
		};
	}
	static CannotStakeForTheSameType(): StakingError {
		return {
			CannotStakeForTheSameType: null
		};
	}
	static IntegerOverflow(): StakingError {
		return {
			IntegerOverflow: null
		};
	}
	static IntegerUnderflow(): StakingError {
		return {
			IntegerUnderflow: null
		};
	}
}

export interface StakerMedalNFTError {
	PSP1155Error ? : PSP1155Error,
	AccessControlError ? : AccessControlError,
	AccountIsZeroAddress ? : null
}

export class StakerMedalNFTErrorBuilder {
	static PSP1155Error(value: PSP1155Error): StakerMedalNFTError {
		return {
			PSP1155Error: value
		};
	}
	static AccessControlError(value: AccessControlError): StakerMedalNFTError {
		return {
			AccessControlError: value
		};
	}
	static AccountIsZeroAddress(): StakerMedalNFTError {
		return {
			AccountIsZeroAddress: null
		};
	}
}

export enum ReentrancyGuardError {
	ReentrantCall
}

