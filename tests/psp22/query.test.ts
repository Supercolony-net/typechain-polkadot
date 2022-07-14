import * as PolkadotAPI from '@polkadot/api';
import { BN } from 'bn.js';
import Contract from '../generated/contracts/my_psp22';
import {
	UserAlice, UserBob, UserCharlie,
} from '../config';
// @ts-ignore
import * as ADDRESSES from '../deployed/addresses';


describe("Correctness of the PSP22 contract' methods types", () => {
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
		const { value } = await contract.query['PSP22::total_supply']();
		expect( ['string', 'number'].includes(typeof value) ).toBe(true);
		expect( _isAmount(value) ).toBe(true);
	});

	test("`PSP22::balance_of`", async () => {
		const { value } = await contract.query['PSP22::balance_of'](UserAlice.address);
		expect( ['string', 'number'].includes(typeof value) ).toBe(true);
		expect( _isAmount(value) ).toBe(true);
	});

	test("`PSP22::balance_of`", async () => {
		const contract = new Contract(ADDRESSES.TOKEN, UserCharlie, api);
		await contract.query['PSP22::balance_of'](UserCharlie.address);
	});

	test("`PSP22::balance_of`", async () => {
		const contract = new Contract(ADDRESSES.TOKEN, UserCharlie, api);
		await contract.query['PSP22::balance_of'](UserCharlie.address);
	});

	test("`mint_to`", async () => {
		const { value } = await contract.query['PSP22Mintable::mint'](UserAlice.address, '1000000');
		expect( value === null ).toBe(true);
	});

	test("`PSP22Mintable::mint`", async () => {
		var { value } = await contract.query['PSP22Mintable::mint'](UserAlice.address, '1000000');
		expect( value === null ).toBe(true);
		var { value } = await contract.query['PSP22Mintable::mint'](UserAlice.address, 1000000);
		expect( value === null ).toBe(true);
	});

	test("`PSP22::allowance`", async () => {
		const { value } = await contract.query['PSP22::allowance'](UserCharlie.address, UserCharlie.address);
		expect( ['string', 'number'].includes(typeof value) ).toBe(true);
		expect( _isAmount(value) ).toBe(true);
	});

	test("`PSP22::increase_allowance` & `PSP22::decrease_allowance`", async () => {
		var { value } = await contract.query['PSP22::increase_allowance'](UserAlice.address, '1000000');
		expect( value === null ).toBe(true);
		await contract.tx['PSP22::increase_allowance'](UserAlice.address, '1000000');
		var { value } = await contract.query['PSP22::decrease_allowance'](UserAlice.address, '1000000');
		expect( value === null ).toBe(true);
	});


	test("`PSP22::transfer`", async () => {
		await contract.tx['PSP22Mintable::mint'](UserAlice.address, '10');

		const { value } = await contract.query['PSP22::transfer'](UserBob.address, '10', []);
		expect( value === null ).toBe(true);
	});

});

function _isAmount(value : number | string | undefined) {
	const number = Number(value);
	return Number.isInteger(number) && number >= 0;
}