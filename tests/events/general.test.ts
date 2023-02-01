import Contract from '../generated/contracts/my_psp34_events';
import Constructors from '../generated/constructors/my_psp34_events';
import {ApiPromise, Keyring} from "@polkadot/api";
import type {KeyringPair} from "@polkadot/keyring/types";
import {GetAccounts} from "../config";
import {IdBuilder} from "../generated/types-returns/my_psp34_events";
import {IdBuilder as IdBuilderArgs} from "../generated/types-arguments/my_psp34_events";
import {ReturnNumber} from "@727-ventures/typechain-types";

describe("Events", () => {
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

		const {address} = await factory.new();

		contract = new Contract(address, UserAlice, api);
		contract_bob = new Contract(address, UserBob, api);
	});

	afterEach(async () => {
		await api.disconnect();
	});

	jest.setTimeout(10000);

	test("Subscription to events works", async () => {
		let eventsCount = 0;

		const eventsToBeSent = [
			{
				from: null,
				to: UserAlice.address,
				id: IdBuilder.U128(new ReturnNumber(1)),
			},
			{
				from: UserAlice.address,
				to: UserBob.address,
				id: IdBuilder.U128(new ReturnNumber(1)),
			}
		];

		contract.events.subscribeOnTransferEvent((event) => {
			expect(event).toMatchObject(eventsToBeSent[eventsCount]!);

			eventsCount++;
		});

		await contract.tx.mint(UserAlice.address, IdBuilderArgs.U128(1));

		await new Promise((resolve) => setTimeout(resolve, 2000));

		await contract.tx.transfer(UserBob.address, IdBuilderArgs.U128(1), []);

		await new Promise((resolve) => setTimeout(resolve, 2000));

		expect(eventsCount).toBe(eventsToBeSent.length);
	});

	test("Test events on submittables", async () => {
		const result = await contract.tx.mint(UserAlice.address, IdBuilderArgs.U32(1));

		expect(result.events!.length).toBe(1);

		expect(result.events![0]).toMatchObject({
			name: 'Transfer',
			args: {
				from: null,
				to: UserAlice.address.toString(),
				id: IdBuilder.U32(1),
			},
		});
	});

	test('Test events on submittables with ReturnNumber', async () => {
		const result2 = await contract.tx.mint(UserAlice.address, IdBuilderArgs.U128(1));

		expect(result2.events!.length).toBe(1);

		expect(result2.events![0]).toMatchObject({
			name: 'Transfer',
			args: {
				from: null,
				to: UserAlice.address.toString(),
				id: IdBuilder.U128(new ReturnNumber(1)),
			},
		});
	});

});