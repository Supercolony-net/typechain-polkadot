**Arguments' types**

```typescript
// { def: { primitive: ... } }

{ // : string
	primitive: 'str'
}

{ // : boolean
	primitive: 'bool'
}

{ // : number
	primitive: 'u8'
}

{ // : number
	primitive: 'u64'
}

{ // : string | number | BN | bigint
	primitive: 'u128'
}

// { def: { composite: ... } }

{ // : string
	composite: {
		fields: [ { typeName: "[u8; 32]" } ]
	}
}

// { def: { array: ... } }

{ // : `0x${string}`
	array: { type: { primitive: 'u8' } }
}

// { def: { sequence: ... } }

{ // : ( $type )[]
	sequence: { type: $type }
}

// { def: { tuple: ... } }

{ // : readonly [ ...$types ]
	tuple: [ ...$types ]
}
```


**Return values' types**

```typescript
// { params: [ { name: 'T', type: $type } ] }

{
	def: $any,
	params: [ { name:'T', type: $type } ]
} // : $type

// { def: { variant: ... } }

{
	variant:
} // : never

// { def: { primitive: ... } }

{
	primitive: 'str'
} // : string

{
	primitive: 'bool'
} // : boolean

{
	primitive: 'u8'
} // : number

/**
 *  Seen as number in "Pool::get_reserves" in both output.[toString | toJSON]()
 */
{
	primitive: 'u64'
} // : number

/**
 * Seen as `0x${string}` in "Pool::get_reserves" in both output.[toString | toJSON]()
 * Seen as number in "Router::get_amounts_in" in both output.[toString | toJSON]()
 */
{
	primitive: 'u128'
} // : `0x${string}` | number

// { def: { composite: ... } }

{
	composite: {
		fields: [ { typeName: "[u8; 32]" } ]
	}
} // : string

// { def: { array: ... } }

{
	array: { type: { primitive: 'u8' } }
} // : `0x${string}`

// { def: { sequence: ... } }

{
	sequence: { type: $type }
} // : ( $type )[]

// { def: { tuple: ... } }

/**
 *  Seen as `null` in "Router::swap_tokens_for_exact_tokens"
 */
{
	tuple: [ ...$types ]
} // : $types.length ? [ ...$types ] : null
```


**PSP22 Types**

```typescript
/** 0 */
{ // : string | number | BN | bigint
	primitive: 'u128'
} // : `0x${string}` | number

/** 2 */
{ // : string
	composite: {
		fields: [ { typeName: "[u8; 32]" } ]
	}
} // : string

/** 3 */
{ // : `0x${string}`
	array: { type: { primitive: 'u8' } }
} // : `0x${string}`

/** 4 */
{ // : number
	primitive: 'u8'
} // : number

/** 5 */
{ // : string
	composite: {
		fields: [ { typeName: "[u8; 32]" } ]
	}
} // : string

/** 7 */
{ // : readonly [ string, string ]
	tuple: [ 2, 2 ]
} // : [ string, string ]

/** 8 */
{ // : readonly []
	tuple: [ ]
} // : null

/** 9 */
{ // : string
	primitive: 'str'
} // : string

/** 10 */
{ // --
	def: $any,
	params: [ { name:'T', type: { primitive: 'str' } } ]
} // : string

/** 11 */
{ // --
	def: $any,
	params: [ { name:'T', type: { tuple: [] } } ]
} // : null

/** 13 */
{ // : number[]
	sequence: { type: { primitive: "u8" } }
} // : number[]
```