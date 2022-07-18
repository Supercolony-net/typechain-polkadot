import BN from "bn.js";
import * as PolkadotAPI from "@polkadot/api";
import Contract from "../generated/contracts/my_psp34";
import * as ADDRESSES from "../deployed/addresses";
import {UserAlice, UserBob} from "../config";
import {Id, IdBuilder} from "../generated/types-arguments/my_psp34";

describe('MY_PSP34', () => {
    let api : PolkadotAPI.ApiPromise;
    let contract : Contract;

    beforeAll(async () => {
        api = await PolkadotAPI.ApiPromise.create();

        contract = new Contract(ADDRESSES.PSP34_TOKEN, UserAlice, api);
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

        const resultBefore = ((await query['PSP34::total_supply']()).value) as number;

        await tx['PSP34Mintable::mint'](UserAlice.address, IdBuilder.U8(resultBefore.valueOf() + 1));

        const resultAfter = ((await query['PSP34::total_supply']()).value);
        // @ts-ignore
        await expect(resultAfter.valueOf() - resultBefore.valueOf()).toBe(1);
    });

    it('Transfer works', async () => {
        const {
            query,
            tx,
        } = contract;

        const totalSupply = (await (query['PSP34::total_supply']())).value as number;

        // @ts-ignore
        await tx['PSP34Mintable::mint'](UserAlice.address, IdBuilder.U16(totalSupply.valueOf() + 1));

        await tx['PSP34::transfer'](UserBob.address, IdBuilder.U16(totalSupply.valueOf() + 1), []);
    });

    it('Can mint any Id', async () => {
        const {
            query,
            tx,
        } = contract;

        const totalSupply = (await (query['PSP34::total_supply']())).value as number;

        const id = totalSupply + 1;

        await tx["PSP34Mintable::mint"](UserAlice.address, IdBuilder.U8(id));
        await tx["PSP34Mintable::mint"](UserAlice.address, IdBuilder.U16(id));
        await tx["PSP34Mintable::mint"](UserAlice.address, IdBuilder.U32(id));
        await tx["PSP34Mintable::mint"](UserAlice.address, IdBuilder.U64(id));
        await tx["PSP34Mintable::mint"](UserAlice.address, IdBuilder.U128(id));
        await tx["PSP34Mintable::mint"](UserAlice.address, IdBuilder.Bytes([id]));

        const totalSupplyAfter = (await (query['PSP34::total_supply']())).value as number;

        // @ts-ignore
        await expect(totalSupplyAfter.valueOf() - totalSupply.valueOf()).toBe(6);
    });
});