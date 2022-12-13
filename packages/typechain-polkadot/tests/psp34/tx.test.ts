import * as PolkadotAPI from "@polkadot/api";
import Contract from "../generated/contracts/my_psp34";
import {IdBuilder} from "../generated/types-arguments/my_psp34";
import Constructors from "../generated/constructors/my_psp34";
import type {KeyringPair} from "@polkadot/keyring/types";
import {GetAccounts} from "../config";

describe('MY_PSP34', () => {
	let api : PolkadotAPI.ApiPromise;
	let contract : Contract;
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

	it('Returns total supply', async () => {
		const {
			query,
			tx,
		} = contract;

		const resultBefore = ((await query.total_supply()).value) as number;

		await tx.mint(UserAlice.address, IdBuilder.U8(resultBefore.valueOf() + 1));

		const resultAfter = ((await query.total_supply()).value);
		// @ts-ignore
		await expect(resultAfter.valueOf() - resultBefore.valueOf()).toBe(1);
	});

	it('Transfer works', async () => {
		const {
			query,
			tx,
		} = contract;

		const totalSupply = (await (query.total_supply())).value as number;

		// @ts-ignore
		await tx.mint(UserAlice.address, IdBuilder.U16(totalSupply.valueOf() + 1));

		await tx.transfer(UserBob.address, IdBuilder.U16(totalSupply.valueOf() + 1), []);
	});

	it('Can mint any Id', async () => {
		const {
			query,
			tx,
		} = contract;

		const totalSupply = (await (query.total_supply())).value as number;

		const id = totalSupply + 1;

		await tx.mint(UserAlice.address, IdBuilder.U8(id));
		await tx.mint(UserAlice.address, IdBuilder.U16(id));
		await tx.mint(UserAlice.address, IdBuilder.U32(id));
		await tx.mint(UserAlice.address, IdBuilder.U64(id));
		await tx.mint(UserAlice.address, IdBuilder.U128(id));
		await tx.mint(UserAlice.address, IdBuilder.Bytes([id]));

		const totalSupplyAfter = (await (query.total_supply())).value as number;

		// @ts-ignore
		await expect(totalSupplyAfter.valueOf() - totalSupply.valueOf()).toBe(6);
	});
});