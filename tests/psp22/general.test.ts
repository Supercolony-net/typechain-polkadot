import Contract from '../generated/contracts/my_psp22';
import Constructors from '../generated/constructors/my_psp22';
import {ApiPromise, Keyring} from "@polkadot/api";
import type {KeyringPair} from "@polkadot/keyring/types";
import {GetAccounts} from "../config";


describe("Correctness of the PSP22 contract' methods types", () => {
	let api: ApiPromise;
	let contract: Contract;
	let contract_bob: Contract;
	let UserAlice: KeyringPair, UserBob: KeyringPair, UserCharlie: KeyringPair;

	beforeEach(async () => {
		api = await ApiPromise.create();

		const accounts = GetAccounts();

		UserAlice = accounts.UserAlice;
		UserBob = accounts.UserBob;
		UserCharlie = accounts.UserCharlie;


		const factory = new Constructors(api, UserAlice);

		const {address} = await factory.new('10', {});

		contract = new Contract(address, UserAlice, api);
		contract_bob = new Contract(address, UserBob, api);

		await contract.tx.mint(UserAlice.address, '10');
		await contract.tx.mint(UserBob.address, '20');
	});

	afterEach(async () => {
		await api.disconnect();
	});

	jest.setTimeout(10000);

	test("total_supply works", async () => {
		expect((await contract.query.totalSupply()).value.unwrapRecursively().toNumber()).toBe(40);
	});

	test("balance_of works", async () => {
		expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).toBe(20);
		expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).toBe(20);
	});

	test("allowance works", async () => {
		expect((await contract.query.allowance(UserAlice.address, UserBob.address)).value.unwrapRecursively().toNumber()).toBe(0);
		expect((await contract.query.allowance(UserBob.address, UserAlice.address)).value.unwrapRecursively().toNumber()).toBe(0);

		await contract.tx.approve(UserBob.address, '10');

		expect((await contract.query.allowance(UserAlice.address, UserBob.address)).value.unwrapRecursively().toNumber()).toBe(10);
		expect((await contract.query.allowance(UserBob.address, UserAlice.address)).value.unwrapRecursively().toNumber()).toBe(0);

		await contract.tx.increaseAllowance(UserBob.address, '10');

		expect((await contract.query.allowance(UserAlice.address, UserBob.address)).value.unwrapRecursively().toNumber()).toBe(20);
		expect((await contract.query.allowance(UserBob.address, UserAlice.address)).value.unwrapRecursively().toNumber()).toBe(0);

		await contract.tx.decreaseAllowance(UserBob.address, '20');

		expect((await contract.query.allowance(UserAlice.address, UserBob.address)).value.unwrapRecursively().toNumber()).toBe(0);
		expect((await contract.query.allowance(UserBob.address, UserAlice.address)).value.unwrapRecursively().toNumber()).toBe(0);
	});

	test("Transfer works", async () => {
		expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).toBe(20);
		expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).toBe(20);

		await contract.tx.transfer(UserBob.address, '10', []);

		expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).toBe(10);
		expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).toBe(30);

		await contract_bob.tx.transfer(UserAlice.address, '10', []);

		expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).toBe(20);
		expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).toBe(20);
	});

	test("Cannot transfer above the amount", async () => {
		expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).toBe(20);
		expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).toBe(20);

		try {
			await (contract.tx.transfer(UserBob.address, '30', []));

			throw new Error("Should not be able to transfer more than the balance");
		} catch (e) {
			// @ts-ignore
			expect(e.error.message).toBe('Module');
		}
		expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).toBe(20);
		expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).toBe(20);
	});

	test("TransferFrom works", async () => {
		expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).toBe(20);
		expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).toBe(20);

		await contract.tx.approve(UserBob.address, '10');

		await contract_bob.tx.transferFrom(UserAlice.address, UserBob.address, '10', []);

		expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).toBe(10);
		expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).toBe(30);

		expect((await contract.query.allowance(UserAlice.address, UserBob.address)).value.unwrapRecursively().toNumber()).toBe(0);

		await contract_bob.tx.transfer(UserAlice.address, '10', []);

		expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).toBe(20);
		expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).toBe(20);
	});

	test("Transfer without approval should fail", async () => {
		expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).toBe(20);
		expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).toBe(20);

		try {
			await contract_bob.tx.transferFrom(UserAlice.address, UserBob.address, '10', []);

			throw new Error("Should not be able to transfer without approval");
		} catch (e) {
			// @ts-ignore
			expect(e.error.message).toBe('Module');
		}

		expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).toBe(20);
		expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).toBe(20);
	});

	test("PSP22Mintable::mint works", async () => {
		expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).toBe(20);

		await contract.tx.mint(UserAlice.address, '10');

		expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).toBe(30);
	});

	test("PSP22", async () => {
		await contract.tx.mint(UserAlice.address, '1000000000000000000000000');
	});
});