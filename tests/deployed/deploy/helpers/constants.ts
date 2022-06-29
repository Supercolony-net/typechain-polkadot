import BN from 'bn.js'

export const ONE_DAY = 24 * 60 * 60 * 1000
export const THREE_DAYS = 3 * ONE_DAY

export const TOL = new BN('1000000000')

// in Europa chain decimals = 10 but we use ethereum value
export const ONE_NT = new BN('1000000000000000000')
export const NT_6_DECIMALS = new BN('1000000')
export const NT_9_DECIMALS = new BN('1000000000')
export const NT_19_DECIMALS = new BN('10000000000000000000')
export const MAX_AMOUNT = new BN('340282366920938463463374607431768211455')

export const AMOUNT_A_1 = ONE_NT.muln(1100)
export const AMOUNT_A_2 = ONE_NT.muln(5700)
export const AMOUNT_B_1 = ONE_NT.muln(1672)
export const AMOUNT_B_2 = new BN('8664000000000000001367')
export const AMOUNT_C_1 = NT_6_DECIMALS.muln(1100)
export const AMOUNT_C_2 = NT_6_DECIMALS.muln(5700)
export const AMOUNT_D_1 = NT_6_DECIMALS.muln(1672)
export const AMOUNT_D_2 = NT_6_DECIMALS.muln(8664)
export const AMOUNT_E_1 = NT_9_DECIMALS.muln(1672)
export const AMOUNT_E_2 = NT_9_DECIMALS.muln(8664)
export const AMOUNT_F_1 = NT_19_DECIMALS.muln(1100)
export const AMOUNT_F_2 = NT_19_DECIMALS.muln(5700)
export const AMOUNT_J_1 = NT_19_DECIMALS.muln(1672)
export const AMOUNT_J_2 = NT_19_DECIMALS.muln(8664)

export const BENNY_LIQ_A = ONE_NT.muln(100)
export const BENNY_LIQ_B = ONE_NT.muln(100)
export const ANNIE_LIQ_A = ONE_NT.muln(25)
export const ANNIE_LIQ_B = new BN('16124754249246792410')
export const CHRIS_LIQ_A = ONE_NT.muln(50)
export const CHRIS_LIQ_B = new BN('32249508498493584307')
export const BENNY_SWAP_IN = new BN('9000000000000000000')
export const BENNY_SWAP_OUT = new BN('7029439707425024110')

export const SS58_ZERO = '5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM';