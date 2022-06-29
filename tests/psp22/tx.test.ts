import * as PolkadotAPI from '@polkadot/api';
import Contract from '../generated/contracts/mock_psp22';
import {
	UserAlice, UserBob,
} from '../config';
import * as ADDRESSES from '../deployed/addresses';


////

describe("", () => {
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
		const response = await contract.tx['PSP22Metadata::token_name']();
	});

	test("`PSP22Metadata::token_symbol`", async () => {
		const response = await contract.tx['PSP22Metadata::token_symbol']();
	});

	test("`PSP22Metadata::token_decimals`", async () => {
		const response = await contract.tx['PSP22Metadata::token_decimals']();
	});

	//

	test("`PSP22::total_supply`", async () => {
		const response = await contract.tx['PSP22::total_supply']();
	});

	test("`PSP22::balance_of`", async () => {
		const response = await contract.tx['PSP22::balance_of'](UserAlice.address);
	});

	test("`mint_to`", async () => {
		const response = await contract.tx['PSP22Mintable::mint'](UserAlice.address, '1000000');
	});

	test("`PSP22Mintable::mint`", async () => {
		const response = await contract.tx['PSP22Mintable::mint'](UserAlice.address, '1000000');
	});

	//

	/*
	test("`PSP22Wrapper::deposit_for` & `PSP22Wrapper::withdraw_to`", async () => {
		let response = await contract.tx['PSP22Wrapper::deposit_for'](UserBob.address, '1000000');
		response = await contract.tx['PSP22Wrapper::withdraw_to'](UserBob.address, '10');
	});
	*/

	test("`WNative::deposit` & `WNative::withdraw`", async () => {
		let response = await contract.tx['WNative::deposit']({ value:'1000000' });
		response = await contract.tx['WNative::withdraw']('10');
	});

	//

	test("`PSP22::allowance`", async () => {
		const response = await contract.query['PSP22::allowance'](UserAlice.address, UserAlice.address);
	});

	test("`PSP22::increase_allowance` & `PSP22::decrease_allowance`", async () => {
		let response = await contract.tx['PSP22::increase_allowance'](UserAlice.address, '1000000');
		response = await contract.tx['PSP22::decrease_allowance'](UserAlice.address, '1000000');
	});

	//

	test("`PSP22::transfer`", async () => {
		const response = await contract.query['PSP22::transfer'](UserBob.address, '10', []);
	});

	test.skip("`PSP22::transfer_from`", async () => {
		/*
			(?) Is this equivalent for the previous method 'PSP22::transfer'?
			(!) Doesn't work - throws error `insufficientAllowance`
		*/
		const response = await contract.query['PSP22::transfer_from'](UserAlice.address, UserBob.address, '10', []);
	});

});