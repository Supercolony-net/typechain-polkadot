import * as PolkadotAPI from '@polkadot/api';
import type {KeyringPair} from "@polkadot/keyring/types";

export const GetAccounts = () => {
	const keyring = new PolkadotAPI.Keyring({type: 'sr25519'});

	const UserAlice: KeyringPair = keyring.addFromUri('//Alice');
	const UserBob: KeyringPair = keyring.addFromUri('//Bob');
	const UserCharlie: KeyringPair = keyring.addFromUri('//Charlie');
	return {
		UserAlice, UserBob, UserCharlie,
	};
};
