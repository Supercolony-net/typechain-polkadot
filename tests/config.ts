import {Keyring} from "@polkadot/api";
import type {KeyringPair} from "@polkadot/keyring/types";

export const GetAccounts = () => {
	const keyring = new Keyring({type: 'sr25519'});

	const UserAlice: KeyringPair = keyring.createFromUri('//Alice');
	const UserBob: KeyringPair = keyring.createFromUri('//Bob');
	const UserCharlie: KeyringPair = keyring.createFromUri('//Charlie');

	return {
		UserAlice, UserBob, UserCharlie,
	};
};
