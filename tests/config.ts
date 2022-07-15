import * as PolkadotAPI from '@polkadot/api';


const ecdsa_keyring = new PolkadotAPI.Keyring({ type:'ecdsa' });
const UserAlice = ecdsa_keyring.addFromUri('//Alice');
const UserBob = ecdsa_keyring.addFromUri('//Bob');
const UserCharlie = ecdsa_keyring.addFromUri('//Charlie');


export {
	UserAlice, UserBob, UserCharlie,
};