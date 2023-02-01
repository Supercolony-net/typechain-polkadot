# Constructors
Used to deploy contracts, using different constructors.

Let's deploy the following contract:
```rust
#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[openbrush::contract]
pub mod my_psp22 {

    // imports from openbrush
	use openbrush::contracts::psp22::*;
	use openbrush::traits::Storage;

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct Contract {
    	#[storage_field]
		psp22: psp22::Data,
    }

    // Section contains default implementation without any modifications
	impl PSP22 for Contract {}

    impl Contract {
        #[ink(constructor)]
        pub fn new(initial_supply: Balance) -> Self {
            let mut _instance = Self::default();
			_instance._mint_to(_instance.env().caller(), initial_supply).expect("Should mint");
			_instance
        }
    }
}
```
This contract has a constructor `new` with one argument `initial_supply`.
To deploy this contract, you need to use the following code:
```typescript
// Import here Constructors and Contract classes

// Here we are creating an instance of the Constructors class, which is used to deploy contracts,
// Constructors is typechain-generated class that contains all the constructors of the contract
const factory = new Constructors(api, UserAlice);

// You can access to the different constructors using the name of the constructor, here we will use "new"
const {result, address} = await factory.new('10', {});

// Here we are creating an instance of the Contract class, which is used to interact with the deployed contract
contract = new Contract(address, UserAlice, api);
```