import Contract from '../generated/contracts/my_psp22';
import Constructors from '../generated/constructors/my_psp22';
import {ApiPromise, Keyring} from "@polkadot/api";
import type {KeyringPair} from "@polkadot/keyring/types";
import {GetAccounts} from "../config";


describe("Correctness of the PSP22 contract' methods types", () => {
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

		const res = await factory["new"]('10000000000000000000000', {});

		contract = new Contract(res.address, UserAlice, api);

		await contract.tx.mint(UserAlice.address, '10000000000000000000000');
		await contract.tx.mint(UserBob.address, '10000000000000000000000');
	});

	afterAll(async () => {
		await api.disconnect();
	});

	jest.setTimeout(10000);

	test("`PSP22::total_supply`", async () => {
		const { value } = await contract.query.total_supply();
		expect( ['string', 'number'].includes(typeof value) ).toBe(true);
		expect( _isAmount(value) ).toBe(true);
	});

	test("`PSP22::balance_of`", async () => {
		const { value } = await contract.query.balance_of(UserAlice.address);
		expect( ['string', 'number'].includes(typeof value) ).toBe(true);
		expect( _isAmount(value) ).toBe(true);
	});

	test("`PSP22::balance_of`", async () => {
		await contract.query.balance_of(UserCharlie.address);
	});

	test("`PSP22::balance_of`", async () => {
		await contract.query.balance_of(UserCharlie.address);
	});

	test("`mint_to`", async () => {
		const { value } = await contract.query.mint(UserAlice.address, '1000000');
		expect( value === null ).toBe(true);
	});

	test("`PSP22Mintable::mint`", async () => {
		var { value } = await contract.query.mint(UserAlice.address, '1000000');
		expect( value === null ).toBe(true);
		var { value } = await contract.query.mint(UserAlice.address, 1000000);
		expect( value === null ).toBe(true);
	});

	test("`PSP22::allowance`", async () => {
		const { value } = await contract.query.allowance(UserCharlie.address, UserCharlie.address);
		expect( ['string', 'number'].includes(typeof value) ).toBe(true);
		expect( _isAmount(value) ).toBe(true);
	});

	test("`PSP22::increase_allowance` & `PSP22::decrease_allowance`", async () => {
		var { value } = await contract.query.increase_allowance(UserAlice.address, '1000000');
		expect( value === null ).toBe(true);
		await contract.tx.increase_allowance(UserAlice.address, '1000000');
		var { value } = await contract.query.decrease_allowance(UserAlice.address, '1000000');
		expect( value === null ).toBe(true);
	});

	test("`PSP22::transfer`", async () => {
		await contract.tx.mint(UserAlice.address, '10');

		const { value } = await contract.query.transfer(UserBob.address, '10', []);
		expect( value === null ).toBe(true);
	});
});

function _isAmount(value : number | string | undefined) {
	const number = Number(value);
	return Number.isInteger(number) && number >= 0;
}