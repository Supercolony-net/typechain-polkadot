import * as PolkadotAPI from "@polkadot/api";
import Contract from "../generated/contracts/my_psp34";
import {IdBuilder} from "../generated/types-arguments/my_psp34";
import Constructors from "../generated/constructors/my_psp34";
import type {KeyringPair} from "@polkadot/keyring/types";
import {GetAccounts} from "../config";

describe('MY_PSP34', () => {
	let api: PolkadotAPI.ApiPromise;
	let contract: Contract;
	let UserAlice: KeyringPair, UserBob: KeyringPair, UserCharlie : KeyringPair;

	beforeAll(async () => {
		api = await PolkadotAPI.ApiPromise.create();

		const accounts = GetAccounts();

		UserAlice = accounts.UserAlice;
		UserBob = accounts.UserBob;
		UserCharlie = accounts.UserCharlie;

		const factory = new Constructors(api, UserAlice);

		const res = await factory.new();

		contract = new Contract(res.address, UserAlice, api);
	});

	afterAll(async () => {
		await api.disconnect();
	});

	jest.setTimeout(10000);

	test('Approve', async () => {
		const {
			query,
		} = contract;

		const totalSupply = (await (query.totalSupply())).value as number;
		const id = totalSupply + 1;

		await contract.tx.mint(UserAlice.address, IdBuilder.U8(id));

		const result = await query.approve(UserBob.address, IdBuilder.U8(id), true);

		expect(result.value).toBe(null);
	});

	test('Transfer', async () => {
		const {
			query,
			tx,
		} = contract;

		const totalSupply = (await (query.totalSupply())).value as number;

		await tx.mint(UserAlice.address, IdBuilder.U16(totalSupply.valueOf() + 1));

		const result = await query.transfer(UserBob.address, IdBuilder.U16(totalSupply.valueOf() + 1), []);

		expect(result.value).toBe(null);
	});

	test('Can mint any Id', async () => {
		const {
			query,
		} = contract;

		const totalSupply = (await (query.totalSupply())).value as number;
		const id = totalSupply + 1;

		let result = await query.mint(UserAlice.address, IdBuilder.U8(id));
		expect(result.value).toBe(null);

		result = await query.mint(UserAlice.address, IdBuilder.U16(id));
		expect(result.value).toBe(null);

		result = await query.mint(UserAlice.address, IdBuilder.U32(id));
		expect(result.value).toBe(null);

		result = await query.mint(UserAlice.address, IdBuilder.U64(id));
		expect(result.value).toBe(null);

		result = await query.mint(UserAlice.address, IdBuilder.U128(id));
		expect(result.value).toBe(null);

		result = await query.mint(UserAlice.address, IdBuilder.Bytes([id]));
		expect(result.value).toBe(null);
	});

	test('Allowance', async () => {
		const {
			query,
		} = contract;

		const totalSupply = (await (query.totalSupply())).value as number;
		const id = totalSupply + 1;

		await contract.tx.mint(UserAlice.address, IdBuilder.U8(id));

		const result = await query.allowance(UserAlice.address, UserBob.address, IdBuilder.U8(id));

		expect(result.value).toBe(false);
	});

	test('BalanceOf', async () => {
		const {
			query,
		} = contract;

		await query.balanceOf(UserAlice.address);
	});

	test('OwnerOf', async () => {
		const {
			query,
		} = contract;

		await query.ownerOf(IdBuilder.U8(1));
	});

	test('TotalSupply', async () => {
		const {
			query,
		} = contract;

		await query.totalSupply();
	});
});