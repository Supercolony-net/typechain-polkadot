# TODO:
- [EXAMPLES]
- - Expand coverage
- - (?) Move examples to the project repo
- [TESTS] Payable contracts for tests & examples
- - New deploy scripts
- - Docs on testing (e.g. `docs/testing.md`)
- [JSDoc]
- - Names of the arguments
- - Names of the return values
- Chack support for ABIs v1 & v2
- [FEATURES]
- - Return values for transactions (aka preamptive querying). Also, `queryValue` flag in methods' options.
- - Consider returning methods' call errors, instead of throwing them, alongside with return values in a structure, like `{ ok, err }`. For future releases.
    > Motivation. Types definitions of errors, if available, would have to be imported, to use them in `catch {}` blocks. If a response object of each method includes possible error, its type comes with its value for the user, and can be used inline, without additional imports.
- Make sure that CLI works on Windows & Mac
    // Especially the binary (`bin` script)
- Build to JS before publishing
- Support also `AccountId`(not only string) as address
- Try & decrease bundle/runtime code size by replacing generated class methods with one proxy method