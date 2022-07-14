import * as PolkadotAPI from '@polkadot/api';
import Contract from '../generated/contracts/my_psp22';
import {
	UserAlice, UserBob,
} from '../config';
// @ts-ignore
import * as ADDRESSES from '../deployed/addresses';


////

describe("", () => {
	let api : PolkadotAPI.ApiPromise;
	let contract : Contract;

	beforeAll(async () => {
		api = await PolkadotAPI.ApiPromise.create();
		contract = new Contract(ADDRESSES.TOKEN, UserAlice, api);
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