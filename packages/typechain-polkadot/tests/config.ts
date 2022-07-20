import * as PolkadotAPI from '@polkadot/api';
import type {KeyringPair} from "@polkadot/keyring/types";

const ecdsa_keyring = new PolkadotAPI.Keyring({ type:'ecdsa' });
const UserAlice: KeyringPair = ecdsa_keyring.addFromUri('//Alice');
const UserBob: KeyringPair = ecdsa_keyring.addFromUri('//Bob');
const UserCharlie: KeyringPair = ecdsa_keyring.addFromUri('//Charlie');

export {
	UserAlice, UserBob, UserCharlie,
};