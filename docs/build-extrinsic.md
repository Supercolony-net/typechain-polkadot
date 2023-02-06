# Build-extrinsic

### About

In this namespace you can find all the functions that are related to building extrinsics.

### How to use

```typescript
const tx = contract.buildExtrinsic.<methodName>(...args, options);

tx.signAndSend(account, (result) => {
	// Handle result
});
```