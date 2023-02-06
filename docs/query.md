# Query

### About

This namepsace contains all query methods. Also you can query tx to get error message.

### How to use

```typescript
const result = contract.query.<functionName>(...args, options)

console.log(result.value)
```

> Note that all u128 are returned as ReturnNumber, which is a wrapper for u128
> you can find it in `@727-ventures/typechain-types`