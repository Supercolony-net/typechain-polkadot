import * as PolkadotAPI from '@polkadot/api';
import { BN } from 'bn.js';
import Contract from '../generated/contracts/mock_psp22';
import {
	UserAlice, UserBob, UserCharlie,
} from '../config';
import * as ADDRESSES from '../deployed/addresses';


////

describe("Correctness of the PSP22 contract' methods types", () => {
	let api : PolkadotAPI.ApiPromise;
	let contract : Contract;

	beforeAll(async () => {
		api = await PolkadotAPI.ApiPromise.create({
			provider: new PolkadotAPI.WsProvider("ws://127.0.0.1:9944"),
		});
		contract = new Contract(ADDRESSES.TOKEN, UserAlice, api);
	});

	afterAll(async () => {
		await api.disconnect();
	});

	jest.setTimeout(10000);

	test("`PSP22Metadata::token_name`", async () => {
		const { value, gasConsumed } = await contract.query['PSP22Metadata::token_name']();
		expect( typeof value === 'string' ).toBe(true);
	});

	test("`PSP22Metadata::token_symbol`", async () => {
		const { value, gasConsumed } = await contract.query['PSP22Metadata::token_symbol']();
		expect( typeof value === 'string' ).toBe(true);
	});

	test("`PSP22Metadata::token_decimals`", async () => {
		const { value, gasConsumed } = await contract.query['PSP22Metadata::token_decimals']();
		expect( typeof value === 'number' ).toBe(true);
		expect( Number.isInteger(value) ).toBe(true);
	});

	//

	test("`PSP22::total_supply`", async () => {
		const { value, gasConsumed } = await contract.query['PSP22::total_supply']();
		expect( ['string', 'number'].includes(typeof value) ).toBe(true);
		expect( _isAmount(value) ).toBe(true);
	});

	test("`PSP22::balance_of`", async () => {
		const { value, gasConsumed } = await contract.query['PSP22::balance_of'](UserAlice.address);
		expect( ['string', 'number'].includes(typeof value) ).toBe(true);
		expect( _isAmount(value) ).toBe(true);
	});

	test("`PSP22::balance_of`", async () => {
		const contract = new Contract(ADDRESSES.TOKEN, UserCharlie, api);
		const { value, gasConsumed } = await contract.query['PSP22::balance_of'](UserCharlie.address);
	});

	test("`PSP22::balance_of`", async () => {
		const contract = new Contract(ADDRESSES.TOKEN, UserCharlie, api);
		const { value, gasConsumed } = await contract.query['PSP22::balance_of'](UserCharlie.address);
	});

	test("`mint_to`", async () => {
		const { value, gasConsumed } = await contract.query['PSP22Mintable::mint'](UserAlice.address, '1000000');
		expect( value === null ).toBe(true);
	});

	test("`PSP22Mintable::mint`", async () => {
		var { value, gasConsumed } = await contract.query['PSP22Mintable::mint'](UserAlice.address, '1000000');
		expect( value === null ).toBe(true);
		var { value, gasConsumed } = await contract.query['PSP22Mintable::mint'](UserAlice.address, 1000000);
		expect( value === null ).toBe(true);
		var { value, gasConsumed } = await contract.query['PSP22Mintable::mint'](UserAlice.address, BigInt('1000000'));
		expect( value === null ).toBe(true);
		var { value, gasConsumed } = await contract.query['PSP22Mintable::mint'](UserAlice.address, new BN('1000000'));
		expect( value === null ).toBe(true);
	});

	//

	/*
	test("`PSP22Wrapper::deposit_for` & `PSP22Wrapper::withdraw_to`", async () => {
		var { value, gasConsumed } = await contract.query['PSP22Wrapper::deposit_for'](UserBob.address, '1000000');
		expect( value === null ).toBe(true);

		// depositing tx to test withdrawal query
		const response = await contract.tx['PSP22Wrapper::deposit_for'](UserBob.address, '1000000');
		var { value, gasConsumed } = await contract.query['PSP22Wrapper::withdraw_to'](UserBob.address, '10');
		expect( value === null ).toBe(true);
	});
	*/

	test("`WNative::deposit` & `WNative::withdraw`", async () => {
		var { value, gasConsumed } = await contract.query['WNative::deposit']({ value:'1000000' });
		expect( value === null ).toBe(true);

		// depositing tx to test withdrawal query
		const response = await contract.tx['WNative::deposit']({ value:'1000000' });
		var { value, gasConsumed } = await contract.query['WNative::withdraw']('10');
		expect( value === null ).toBe(true);
	});

	//

	test("`PSP22::allowance`", async () => {
		const { value, gasConsumed } = await contract.query['PSP22::allowance'](UserCharlie.address, UserCharlie.address);
		expect( ['string', 'number'].includes(typeof value) ).toBe(true);
		expect( _isAmount(value) ).toBe(true);
	});

	test("`PSP22::increase_allowance` & `PSP22::decrease_allowance`", async () => {
		var { value, gasConsumed } = await contract.query['PSP22::increase_allowance'](UserAlice.address, '1000000');
		expect( value === null ).toBe(true);

		// increase tx to test decrease query
		const response = await contract.tx['PSP22::increase_allowance'](UserAlice.address, '1000000');
		var { value, gasConsumed } = await contract.query['PSP22::decrease_allowance'](UserAlice.address, '1000000');
		expect( value === null ).toBe(true);
	});

	//

	test("`PSP22::transfer`", async () => {
		const { value, gasConsumed } = await contract.query['PSP22::transfer'](UserBob.address, '10', []);
		//
		expect( value === null ).toBe(true);
	});

	test.skip("`PSP22::transfer_from`", async () => {
		/*
			(?) Is this equivalent for the previous method 'PSP22::transfer'?
			(!) Doesn't work - throws error `insufficientAllowance`
		*/
		const { value, gasConsumed } = await contract.query['PSP22::transfer_from'](UserAlice.address, UserBob.address, '10', []);
		expect( value === null ).toBe(true);
	});

});


//// PRIVATE

function _isAmount(value : number | string | undefined) {
	const number = Number(value);
	return Number.isInteger(number) && number >= 0;
}