export const INK_TYPES_TO_TS_RETURNS = {
	'Bool': 'boolean',
	'Char': 'string',
	'Str': 'string',

	'U8': 'number',
	'U16': 'number',
	'U32': 'number',
	'U64': 'number',
	'U128': '(string | number)',
	'U256': '(string | number)',

	'I8': 'number',
	'I16': 'number',
	'I32': 'number',
	'I64': 'number',
	'I128': '(string | number)',
	'I256': '(string | number)',
};

export const INK_TYPES_TO_TS_ARGUMENTS = {
	'Bool': 'boolean',
	'Char': 'string',
	'Str': 'string',

	'U8': '(number | string | BN)',
	'U16': '(number | string | BN)',
	'U32': '(number | string | BN)',
	'U64': '(number | string | BN)',
	'U128': '(string | number | BN)',
	'U256': '(string | number | BN)',

	'I8': '(number | string | BN)',
	'I16': '(number | string | BN)',
	'I32': '(number | string | BN)',
	'I64': '(number | string | BN)',
	'I128': '(string | number | BN)',
	'I256': '(string | number | BN)',
};