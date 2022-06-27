import * as PolkadotAPI from '@polkadot/api';



const ecdsa_keyring = new PolkadotAPI.Keyring({ type:'ecdsa' });
const Deployer = ecdsa_keyring.addFromUri('air hotel try fix forward please quality pluck horror this scrub van');
const UserAlice = ecdsa_keyring.addFromUri('//Alice');
const UserBob = ecdsa_keyring.addFromUri('//Bob');
const UserCharlie = ecdsa_keyring.addFromUri('//Charlie');
const UserDave = ecdsa_keyring.addFromUri('//Dave');


////

export {
	//
	Deployer,
	UserAlice, UserBob, UserCharlie, UserDave,
};