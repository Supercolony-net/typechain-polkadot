import * as PolkadotAPI from "@polkadot/api";
import Contract from "../generated/contracts/contract_with_enums";
import * as ADDRESSES from "../deployed/addresses";
import {UserAlice} from "../config";
import {AnotherEnumBuilder, EnumExampleBuilder} from "../generated/types-arguments/contract_with_enums";

describe('MY_PSP34', () => {
    let api: PolkadotAPI.ApiPromise;
    let contract: Contract;

    beforeAll(async () => {
        api = await PolkadotAPI.ApiPromise.create();

        contract = new Contract(ADDRESSES.CONTRACT_WITH_ENUMS, UserAlice, api);
    });

    afterAll(async () => {
        await api.disconnect();
    });

    jest.setTimeout(10000);

    test('Returns proper value', async () => {
        const {
            query,
            tx
        } = contract;

        const resultA = await query.get_message(EnumExampleBuilder.A("Hello"));
        expect(resultA.value).toEqual("Hello");

        const resultB = await query.get_message(EnumExampleBuilder.B(42));
        expect(resultB.value).toEqual("42");

        const resultC = await query.get_message(EnumExampleBuilder.C(AnotherEnumBuilder.A([42])));
        expect(resultC.value).toEqual("[42]");

        const resultE = await query.get_message(EnumExampleBuilder.E());
        expect(resultE.value).toEqual("E");
    });

});