import Contract from '../generated/contracts/my_psp22';
import {
	GetAccounts,
} from '../config';
import Constructors from "../generated/constructors/my_psp22";
import type {KeyringPair} from "@polkadot/keyring/types";
import {ApiPromise} from "@polkadot/api";

describe("", () => {
	let api : ApiPromise;
	let contract : Contract;
	let UserAlice: KeyringPair, UserBob: KeyringPair, UserCharlie : KeyringPair;

	beforeAll(async () => {
		api = await ApiPromise.create();

		const accounts = GetAccounts();

		UserAlice = accounts.UserAlice;
		UserBob = accounts.UserBob;
		UserCharlie = accounts.UserCharlie;

		const factory = new Constructors(api, UserAlice);

		const res = await factory.new('10000000000000000000000');

		contract = new Contract(res.address, UserAlice, api);

		await contract.tx["PSP22Mintable::mint"](UserAlice.address, '10000000000000000000000');
		await contract.tx["PSP22Mintable::mint"](UserBob.address, '10000000000000000000000');
	});

	afterAll(async () => {
		await api.disconnect();
	});

	jest.setTimeout(10000);

	test("`PSP22::total_supply`", async () => {
		await contract.tx['PSP22::total_supply']();
	});

	test("`PSP22::balance_of`", async () => {
		await contract.tx['PSP22::balance_of'](UserAlice.address);
	});

	test("`mint_to`", async () => {
		await contract.tx['PSP22Mintable::mint'](UserAlice.address, '1000000');
	});

	test("`PSP22Mintable::mint`", async () => {
		await contract.tx['PSP22Mintable::mint'](UserAlice.address, '1000000');
	});

	test("`PSP22::allowance`", async () => {
		await contract.query['PSP22::allowance'](UserAlice.address, UserAlice.address);
	});

	test("`PSP22::increase_allowance` & `PSP22::decrease_allowance`", async () => {
		await contract.tx['PSP22::increase_allowance'](UserAlice.address, '1000000');
		await contract.tx['PSP22::decrease_allowance'](UserAlice.address, '1000000');
	});

	test("`PSP22::transfer`", async () => {
		await contract.query['PSP22::transfer'](UserBob.address, '10', []);
	});
});