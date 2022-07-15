import BN from "bn.js";
import * as PolkadotAPI from "@polkadot/api";
import Contract from "../generated/contracts/my_psp34";
import * as ADDRESSES from "../deployed/addresses";
import {UserAlice, UserBob} from "../config";
import {Id, IdBuilder} from "../generated/types-arguments/my_psp34";

describe('MY_PSP34', () => {
	let api: PolkadotAPI.ApiPromise;
	let contract: Contract;

	beforeAll(async () => {
		api = await PolkadotAPI.ApiPromise.create();

		contract = new Contract(ADDRESSES.PSP34_TOKEN, UserAlice, api);
	});

	afterAll(async () => {
		await api.disconnect();
	});

	jest.setTimeout(10000);

	test('Approve', async () => {
		const {
			query,
		} = contract;

		const totalSupply = (await (query['PSP34::total_supply']())).value as number;
		const id = totalSupply + 1;

		await contract.tx['PSP34Mintable::mint'](UserAlice.address, IdBuilder.U8(id));

		const result = await query['PSP34::approve'](UserBob.address, IdBuilder.U8(id), true);

		expect(result.value).toBe(null);
	});

	test('Transfer', async () => {
		const {
			query,
			tx,
		} = contract;

		const totalSupply = (await (query['PSP34::total_supply']())).value as number;

		await tx['PSP34Mintable::mint'](UserAlice.address, IdBuilder.U16(totalSupply.valueOf() + 1));

		const result = await query['PSP34::transfer'](UserBob.address, IdBuilder.U16(totalSupply.valueOf() + 1), []);

		expect(result.value).toBe(null);
	});

	test('Can mint any Id', async () => {
		const {
			query,
		} = contract;

		const totalSupply = (await (query['PSP34::total_supply']())).value as number;
		const id = totalSupply + 1;

		let result = await query['PSP34Mintable::mint'](UserAlice.address, IdBuilder.U8(id));
		expect(result.value).toBe(null);

		result = await query['PSP34Mintable::mint'](UserAlice.address, IdBuilder.U16(id));
		expect(result.value).toBe(null);

		result = await query['PSP34Mintable::mint'](UserAlice.address, IdBuilder.U32(id));
		expect(result.value).toBe(null);

		result = await query['PSP34Mintable::mint'](UserAlice.address, IdBuilder.U64(id));
		expect(result.value).toBe(null);

		result = await query['PSP34Mintable::mint'](UserAlice.address, IdBuilder.U128(id));
		expect(result.value).toBe(null);

		result = await query['PSP34Mintable::mint'](UserAlice.address, IdBuilder.Bytes([id]));
		expect(result.value).toBe(null);
	});

	test('Allowance', async () => {
		const {
			query,
		} = contract;

		const totalSupply = (await (query['PSP34::total_supply']())).value as number;
		const id = totalSupply + 1;

		await contract.tx['PSP34Mintable::mint'](UserAlice.address, IdBuilder.U8(id));

		const result = await query['PSP34::allowance'](UserAlice.address, UserBob.address, IdBuilder.U8(id));

		expect(result.value).toBe(false);
	});

	test('BalanceOf', async () => {
		const {
			query,
		} = contract;

		await query['PSP34::balance_of'](UserAlice.address);
	});

	test('OwnerOf', async () => {
		const {
			query,
		} = contract;

		await query['PSP34::owner_of'](IdBuilder.U8(1));
	});

	test('TotalSupply', async () => {
		const {
			query,
		} = contract;

		await query['PSP34::total_supply']();
	});
});