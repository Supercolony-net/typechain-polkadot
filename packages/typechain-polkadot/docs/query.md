# Query
This namepsace contains all query methods

```typescript
const result = contract.query.<functionName>(...args, options)

console.log(result.value)
```

You can also use it to get errors from contracts

```typescript
try {
	await contract.withSigner(UserBob).query.transfer(UserAlice.address, '10', []);
} catch ({ _err }) {
	console.log(_err);
}
```
```bash
console.log
	{ insufficientBalance: null }
```
