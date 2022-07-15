/* This file is auto-generated */

import BN from 'bn.js';
import { AccountId, Hash } from '../types-arguments/investment';

export interface ArgumentsTypes {
	"0": AccountId;
	"5": (string | number | BN);
	"8": Hash;
	"12": boolean;
	"24": Array<AccountId>;
}

export interface ArgumentsTuples {
	"initialize_investment": readonly [ AccountId,  AccountId,  (string | number | BN),  (string | number | BN),  (string | number | BN),  (string | number | BN) ];
	"BaseProjectDetails::project_status": readonly [ (string | number | BN) ];
	"BaseProjectDetails::funding_nft": readonly [ ];
	"BaseProjectDetails::governance": readonly [ ];
	"BaseProjectDetails::project_manager": readonly [ ];
	"BaseProjectDetails::r_albt": readonly [ ];
	"BaseProjectDetails::project_seeker": readonly [ (string | number | BN) ];
	"BaseProjectDetails::escrow": readonly [ ];
	"BaseProjectDetails::is_valid_lending_token": readonly [ AccountId ];
	"BaseProjectDetails::staking": readonly [ ];
	"BaseProjectDetails::total_projects": readonly [ ];
	"BaseProject::set_escrow_address": readonly [ AccountId ];
	"BaseProject::add_lending_token": readonly [ AccountId ];
	"InvestmentDetailsStorage::last_block_checked_for_locked_nfts_per_address": readonly [ AccountId ];
	"InvestmentDetailsStorage::get_investment_metadata": readonly [ (string | number | BN) ];
	"InvestmentDetailsStorage::total_lottery_numbers_per_investment": readonly [ (string | number | BN) ];
	"InvestmentDetailsStorage::base_amount_for_each_partition": readonly [ ];
	"InvestmentDetailsStorage::r_albt_invested_per_address": readonly [ (string | number | BN),  AccountId ];
	"InvestmentDetailsStorage::investment_tokens_per_ticket": readonly [ (string | number | BN) ];
	"InvestmentDetailsStorage::tickets_remaining": readonly [ (string | number | BN) ];
	"InvestmentDetailsStorage::locked_nfts_for_specific_investment_per_address": readonly [ (string | number | BN),  AccountId ];
	"InvestmentDetailsStorage::total_tickets_per_run": readonly [ ];
	"InvestmentDetailsStorage::remaining_tickets_per_address": readonly [ (string | number | BN),  AccountId ];
	"InvestmentDetailsStorage::blocks_locked_for_reputation": readonly [ ];
	"InvestmentDetailsStorage::project_settled_without_lottery": readonly [ (string | number | BN) ];
	"InvestmentDetailsStorage::address_of_lottery_number": readonly [ (string | number | BN),  (string | number | BN) ];
	"InvestmentDetailsStorage::r_albt_per_winning_ticket": readonly [ ];
	"InvestmentDetailsStorage::investment_withdrawn": readonly [ (string | number | BN) ];
	"InvestmentDetailsStorage::investment_status": readonly [ (string | number | BN) ];
	"InvestmentDetailsStorage::is_valid_referral_id": readonly [ (string | number | BN) ];
	"InvestmentDetailsStorage::get_requesting_interest_status": readonly [ (string | number | BN) ];
	"InvestmentDetailsStorage::investment_details": readonly [ (string | number | BN) ];
	"InvestmentDetailsStorage::r_albt_per_lottery_number": readonly [ ];
	"InvestmentDetailsStorage::tickets_won_per_address": readonly [ (string | number | BN),  AccountId ];
	"InvestmentDetailsStorage::locked_nfts_per_address": readonly [ AccountId ];
	"InvestmentTransfers::withdraw_locked_investment_nfts": readonly [ (string | number | BN),  (string | number | BN) ];
	"InvestmentTransfers::withdraw_investment": readonly [ (string | number | BN) ];
	"InvestmentTransfers::convert_investment_tickets_to_nfts": readonly [ (string | number | BN) ];
	"InvestmentTransfers::lock_investment_nfts": readonly [ (string | number | BN),  (string | number | BN) ];
	"InvestmentTransfers::convert_nft_to_investment_tokens": readonly [ (string | number | BN),  (string | number | BN) ];
	"InvestmentTransfers::withdraw_funds_for_cancelled_investment": readonly [ (string | number | BN) ];
	"InvestmentTransfers::withdraw_amount_provided_for_non_won_tickets": readonly [ (string | number | BN) ];
	"InvestmentRequests::cancel_investment": readonly [ (string | number | BN) ];
	"InvestmentRequests::request_investment": readonly [ AccountId,  (string | number | BN),  AccountId,  (string | number | BN),  Hash ];
	"InvestmentRequests::decide_for_project": readonly [ (string | number | BN),  boolean ];
	"InvestmentLottery::show_interest_for_investment": readonly [ (string | number | BN),  (string | number | BN),  (string | number | BN) ];
	"InvestmentLottery::start_lottery_phase": readonly [ (string | number | BN) ];
	"InvestmentLottery::execute_lottery_run": readonly [ (string | number | BN) ];
	"InvestmentLottery::set_r_albt_per_tickets": readonly [ (string | number | BN),  (string | number | BN) ];
}