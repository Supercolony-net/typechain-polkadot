# Milestone 1

### About

First Milestone for Typechain-Polkadot includes parsing types, generating output, examples, and testing. So let us take a quick look at that.

#### Parsing types

To parse types, we have investigated how the Polkadot-js library uses types. So we have come to make a recursive algorithm that generates all types before using them. When the parser gets a request to generate a type, it first checks the type' type and then decides what to do next. Ink! Smart contracts can produce ```Composite, Variant, Sequence, Array, Tuple, Primitive```, and we have a different approach for every type.

##### Approaches of parsing different

- **Composite** -- It can be a Rust-like structure that contains different fields, so we are going through all of them and generating types for every field if it hasn't been generated yet.
- **Variant** -- Maybe the hardest one, It is Rust-like enum, but we can't make rust-like enums in TypeScript, so we've come to two approaches to generating Variants: First - If every field does not contain any other field ( ``enum { One, Two, Three, ... }`` ) we convert it to TS Enum, but if it contain ( `` enum { Name(string), Age(u32) } ``) we decided to generate two structures - Enum itself ( just interface of all these fields, if the field doesn't contain any value it's type is set by ``null ``) and ``EnumBuilder`` - utility class to generate enums faster and better.
- **Sequence and Array** -- We check the array element type and then generate like ``Array<TYPE>`` or ``TYPE[]``
- **Tuple** - Going through all elements, generating types for each, and then in output will be: ``[TYPE_1, TYPE_2, ...]``
- **Primitive** - Just converting types using pre-defined mapping (``U8 -> number, U128 -> number, string``)

While testing everything, we figured out that types for arguments and types for return values are not the same; for example, if we have ``u128`` as an argument, we can pass ``number, string, BN, bigint``, but polkadot.js if it's return type can return only ``number`` or ``string``, so we are processing types depending on its usage.

#### Generating output

We use the Handlebars library to quickly generate output files with template format (``src/templates``). Also, below we provide a list of directories in output and why we are using them.

#### Output directories

- **_sdk** - utility directory for interacting with Polkadot-js
- **arguments** - contains the mapping between arguments id's and their types
- **return-values** - contains mapping between returns id's and their types
- **types-arguments** - contains enums and structures that will be used for arguments
- **types-returns** - contains enums and structures that will be used for returns
- **build_extrinsic** - contains a class that includes contract methods, but they generate the promise of transaction without sending it.
- **query** - contains a class that includes query methods for all functions of the contract
- **tx-sign-and-send** - contains class that includes tx-methods to all functions of the contract
- **contracts** - contains class that wraps up everything together.