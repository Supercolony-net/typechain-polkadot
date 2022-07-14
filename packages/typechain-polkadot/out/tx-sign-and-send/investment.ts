/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { ArgumentsTypes } from '../arguments/investment';
import type { GasLimit, GasLimitAndRequiredValue } from '../_sdk/types';
import { txSignAndSend } from '../_sdk/tx';


export default class Methods {
	private __nativeContract : ContractPromise;
	private __keyringPair : KeyringPair;
	private __apiPromise: ApiPromise;

	constructor(
		apiPromise: ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
	}

	/**
	 * @arg: args: [
	 * 0: rAlbt,
	 * 1: staking,
	 * 2: totalTicketsPerRun,
	 * 3: rAlbtPerLotteryNumber,
	 * 4: rAlbtPerWinningTicket,
	 * 5: blocksLockedForReputation,
	 * ]
	 */
	"initialize_investment" (
		rAlbt: ArgumentsTypes[0],
		staking: ArgumentsTypes[0],
		totalTicketsPerRun: ArgumentsTypes[5],
		rAlbtPerLotteryNumber: ArgumentsTypes[5],
		rAlbtPerWinningTicket: ArgumentsTypes[5],
		blocksLockedForReputation: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "initializeInvestment", [rAlbt, staking, totalTicketsPerRun, rAlbtPerLotteryNumber, rAlbtPerWinningTicket, blocksLockedForReputation], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * ]
	 */
	"BaseProjectDetails::project_status" (
		projectId: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "baseProjectDetails::projectStatus", [projectId], __options);
	}

	/** */
	"BaseProjectDetails::funding_nft" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "baseProjectDetails::fundingNft", [], __options);
	}

	/** */
	"BaseProjectDetails::governance" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "baseProjectDetails::governance", [], __options);
	}

	/** */
	"BaseProjectDetails::project_manager" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "baseProjectDetails::projectManager", [], __options);
	}

	/** */
	"BaseProjectDetails::r_albt" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "baseProjectDetails::rAlbt", [], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * ]
	 */
	"BaseProjectDetails::project_seeker" (
		projectId: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "baseProjectDetails::projectSeeker", [projectId], __options);
	}

	/** */
	"BaseProjectDetails::escrow" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "baseProjectDetails::escrow", [], __options);
	}

	/**
	 * @arg: args: [
	 * 0: lendingToken,
	 * ]
	 */
	"BaseProjectDetails::is_valid_lending_token" (
		lendingToken: ArgumentsTypes[0],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "baseProjectDetails::isValidLendingToken", [lendingToken], __options);
	}

	/** */
	"BaseProjectDetails::staking" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "baseProjectDetails::staking", [], __options);
	}

	/** */
	"BaseProjectDetails::total_projects" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "baseProjectDetails::totalProjects", [], __options);
	}

	/**
	 * @arg: args: [
	 * 0: escrowAddress,
	 * ]
	 */
	"BaseProject::set_escrow_address" (
		escrowAddress: ArgumentsTypes[0],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "baseProject::setEscrowAddress", [escrowAddress], __options);
	}

	/**
	 * @arg: args: [
	 * 0: lendingTokenAddress,
	 * ]
	 */
	"BaseProject::add_lending_token" (
		lendingTokenAddress: ArgumentsTypes[0],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "baseProject::addLendingToken", [lendingTokenAddress], __options);
	}

	/**
	 * @arg: args: [
	 * 0: address,
	 * ]
	 */
	"InvestmentDetailsStorage::last_block_checked_for_locked_nfts_per_address" (
		address: ArgumentsTypes[0],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::lastBlockCheckedForLockedNftsPerAddress", [address], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * ]
	 */
	"InvestmentDetailsStorage::get_investment_metadata" (
		projectId: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::getInvestmentMetadata", [projectId], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * ]
	 */
	"InvestmentDetailsStorage::total_lottery_numbers_per_investment" (
		projectId: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::totalLotteryNumbersPerInvestment", [projectId], __options);
	}

	/** */
	"InvestmentDetailsStorage::base_amount_for_each_partition" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::baseAmountForEachPartition", [], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * 1: address,
	 * ]
	 */
	"InvestmentDetailsStorage::r_albt_invested_per_address" (
		projectId: ArgumentsTypes[5],
		address: ArgumentsTypes[0],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::rAlbtInvestedPerAddress", [projectId, address], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * ]
	 */
	"InvestmentDetailsStorage::investment_tokens_per_ticket" (
		projectId: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::investmentTokensPerTicket", [projectId], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * ]
	 */
	"InvestmentDetailsStorage::tickets_remaining" (
		projectId: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::ticketsRemaining", [projectId], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * 1: address,
	 * ]
	 */
	"InvestmentDetailsStorage::locked_nfts_for_specific_investment_per_address" (
		projectId: ArgumentsTypes[5],
		address: ArgumentsTypes[0],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::lockedNftsForSpecificInvestmentPerAddress", [projectId, address], __options);
	}

	/** */
	"InvestmentDetailsStorage::total_tickets_per_run" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::totalTicketsPerRun", [], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * 1: address,
	 * ]
	 */
	"InvestmentDetailsStorage::remaining_tickets_per_address" (
		projectId: ArgumentsTypes[5],
		address: ArgumentsTypes[0],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::remainingTicketsPerAddress", [projectId, address], __options);
	}

	/** */
	"InvestmentDetailsStorage::blocks_locked_for_reputation" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::blocksLockedForReputation", [], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * ]
	 */
	"InvestmentDetailsStorage::project_settled_without_lottery" (
		projectId: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::projectSettledWithoutLottery", [projectId], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * 1: balance,
	 * ]
	 */
	"InvestmentDetailsStorage::address_of_lottery_number" (
		projectId: ArgumentsTypes[5],
		balance: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::addressOfLotteryNumber", [projectId, balance], __options);
	}

	/** */
	"InvestmentDetailsStorage::r_albt_per_winning_ticket" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::rAlbtPerWinningTicket", [], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * ]
	 */
	"InvestmentDetailsStorage::investment_withdrawn" (
		projectId: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::investmentWithdrawn", [projectId], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * ]
	 */
	"InvestmentDetailsStorage::investment_status" (
		projectId: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::investmentStatus", [projectId], __options);
	}

	/**
	 * @arg: args: [
	 * 0: investmentId,
	 * ]
	 */
	"InvestmentDetailsStorage::is_valid_referral_id" (
		investmentId: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::isValidReferralId", [investmentId], __options);
	}

	/**
	 * @arg: args: [
	 * 0: investmentId,
	 * ]
	 */
	"InvestmentDetailsStorage::get_requesting_interest_status" (
		investmentId: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::getRequestingInterestStatus", [investmentId], __options);
	}

	/**
	 * @arg: args: [
	 * 0: investmentId,
	 * ]
	 */
	"InvestmentDetailsStorage::investment_details" (
		investmentId: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::investmentDetails", [investmentId], __options);
	}

	/** */
	"InvestmentDetailsStorage::r_albt_per_lottery_number" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::rAlbtPerLotteryNumber", [], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * 1: address,
	 * ]
	 */
	"InvestmentDetailsStorage::tickets_won_per_address" (
		projectId: ArgumentsTypes[5],
		address: ArgumentsTypes[0],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::ticketsWonPerAddress", [projectId, address], __options);
	}

	/**
	 * @arg: args: [
	 * 0: address,
	 * ]
	 */
	"InvestmentDetailsStorage::locked_nfts_per_address" (
		address: ArgumentsTypes[0],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentDetailsStorage::lockedNftsPerAddress", [address], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * 1: nftsToWithdraw,
	 * ]
	 */
	"InvestmentTransfers::withdraw_locked_investment_nfts" (
		projectId: ArgumentsTypes[5],
		nftsToWithdraw: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentTransfers::withdrawLockedInvestmentNfts", [projectId, nftsToWithdraw], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * ]
	 */
	"InvestmentTransfers::withdraw_investment" (
		projectId: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentTransfers::withdrawInvestment", [projectId], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * ]
	 */
	"InvestmentTransfers::convert_investment_tickets_to_nfts" (
		projectId: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentTransfers::convertInvestmentTicketsToNfts", [projectId], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * 1: nftsToLock,
	 * ]
	 */
	"InvestmentTransfers::lock_investment_nfts" (
		projectId: ArgumentsTypes[5],
		nftsToLock: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentTransfers::lockInvestmentNfts", [projectId, nftsToLock], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * 1: amount,
	 * ]
	 */
	"InvestmentTransfers::convert_nft_to_investment_tokens" (
		projectId: ArgumentsTypes[5],
		amount: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentTransfers::convertNftToInvestmentTokens", [projectId, amount], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * ]
	 */
	"InvestmentTransfers::withdraw_funds_for_cancelled_investment" (
		projectId: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentTransfers::withdrawFundsForCancelledInvestment", [projectId], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * ]
	 */
	"InvestmentTransfers::withdraw_amount_provided_for_non_won_tickets" (
		projectId: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentTransfers::withdrawAmountProvidedForNonWonTickets", [projectId], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * ]
	 */
	"InvestmentRequests::cancel_investment" (
		projectId: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentRequests::cancelInvestment", [projectId], __options);
	}

	/**
	 * @arg: args: [
	 * 0: investmentToken,
	 * 1: investmentTokensAmount,
	 * 2: lendingToken,
	 * 3: totalAmountRequested,
	 * 4: extraInfo,
	 * ]
	 */
	"InvestmentRequests::request_investment" (
		investmentToken: ArgumentsTypes[0],
		investmentTokensAmount: ArgumentsTypes[5],
		lendingToken: ArgumentsTypes[0],
		totalAmountRequested: ArgumentsTypes[5],
		extraInfo: ArgumentsTypes[8],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentRequests::requestInvestment", [investmentToken, investmentTokensAmount, lendingToken, totalAmountRequested, extraInfo], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * 1: decision,
	 * ]
	 */
	"InvestmentRequests::decide_for_project" (
		projectId: ArgumentsTypes[5],
		decision: ArgumentsTypes[12],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentRequests::decideForProject", [projectId, decision], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * 1: amountOfLotteryTickets,
	 * 2: amountOfImmediateTickets,
	 * ]
	 */
	"InvestmentLottery::show_interest_for_investment" (
		projectId: ArgumentsTypes[5],
		amountOfLotteryTickets: ArgumentsTypes[5],
		amountOfImmediateTickets: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentLottery::showInterestForInvestment", [projectId, amountOfLotteryTickets, amountOfImmediateTickets], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * ]
	 */
	"InvestmentLottery::start_lottery_phase" (
		projectId: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentLottery::startLotteryPhase", [projectId], __options);
	}

	/**
	 * @arg: args: [
	 * 0: projectId,
	 * ]
	 */
	"InvestmentLottery::execute_lottery_run" (
		projectId: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentLottery::executeLotteryRun", [projectId], __options);
	}

	/**
	 * @arg: args: [
	 * 0: rAlbtPerLotteryNumber,
	 * 1: rAlbtPerWinningTicket,
	 * ]
	 */
	"InvestmentLottery::set_r_albt_per_tickets" (
		rAlbtPerLotteryNumber: ArgumentsTypes[5],
		rAlbtPerWinningTicket: ArgumentsTypes[5],
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "investmentLottery::setRAlbtPerTickets", [rAlbtPerLotteryNumber, rAlbtPerWinningTicket], __options);
	}

}