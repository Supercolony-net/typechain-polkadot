import BN from "bn.js";
import * as PolkadotAPI from "@polkadot/api";
import Contract from "../generated/contracts/struct_example";
import * as ADDRESSES from "../deployed/addresses";
import {UserAlice} from "../config";

describe('Contract returning a struct', () => {
    let api : PolkadotAPI.ApiPromise;
    let contract : Contract;

    beforeAll(async () => {
        api = await PolkadotAPI.ApiPromise.create();
        await api.isReady;
        contract = new Contract(ADDRESSES.STRUCT_EXAMPLE, UserAlice, api);
    });

    afterAll(async () => {
        await api.disconnect();
    });

    jest.setTimeout(10000);

    it.only('Return struct test', async () => {
        const { value: struct } = await (contract.query as any).returnStruct({});
        const structAsAny = struct as any;
        expect(structAsAny.someAddress).toEqual(contract.address);
        expect(structAsAny.someImportantDecimal).toEqual(new BN(10));
        expect(structAsAny.someU128).toEqual(new BN(12321));
        expect(struct.some_address).toBeUndefined();
        expect(struct.some_important_decimal).toBeUndefined();
        expect(struct.some_u128).toBeUndefined();
    });
});
