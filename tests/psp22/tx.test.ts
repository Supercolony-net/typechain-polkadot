import Contract from '../generated/contracts/my_psp22';
import {
	GetAccounts,
} from '../config';
import Constructors from "../generated/constructors/my_psp22";
import type {KeyringPair} from "@polkadot/keyring/types";
import {ApiPromise} from "@polkadot/api";

describe("Correctness of the PSP22 contract' methods types tx", () => {
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

		await contract.tx.mint(UserAlice.address, '10000000000000000000000');
		await contract.tx.mint(UserBob.address, '10000000000000000000000');
	});

	afterAll(async () => {
		await api.disconnect();
	});

	jest.setTimeout(10000);

	test("`PSP22::total_supply`", async () => {
		await contract.tx.totalSupply();
	});

	test("`PSP22::balance_of`", async () => {
		await contract.tx.balanceOf(UserAlice.address);
	});

	test("`PSP22Mintable::mint`", async () => {
		await contract.tx.mint(UserAlice.address, '1000000');
	});

	test("`PSP22::allowance`", async () => {
		await contract.query.allowance(UserAlice.address, UserAlice.address);
	});

	test("`PSP22::increase_allowance` & `PSP22::decrease_allowance`", async () => {
		await contract.tx.increaseAllowance(UserAlice.address, '1000000');
		await contract.tx.decreaseAllowance(UserAlice.address, '1000000');
	});

	test("`PSP22::transfer`", async () => {
		await contract.query.transfer(UserBob.address, '10', []);
	});
});