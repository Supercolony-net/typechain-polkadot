import { RedspotUserConfig, HDAccountsUserConfig } from 'redspot/types';
import '@redspot/patract';
import '@redspot/chai';
import { accounts } from './utils/network';

export default {
    defaultNetwork: 'development',
    contract: {
        ink: {
            docker: false,
            toolchain: 'nightly',
            sources: ['contracts/core/contracts/**', 'contracts/exchange/contracts/**', 'contracts/mock/psp22'],
        },
    },
    networks: {
        development: {
            endpoint: 'ws://127.0.0.1:9944',
            gasLimit: '800000000000',
            explorerUrl: 'https://polkadot.js.org/apps/#/explorer/query/?rpc=ws://127.0.0.1:9944/',
            accounts: ['//Alice', '//Bob', '//Charlie'],
            types: {
                OpenbrushContractsErrorsPsp22Psp22Error: {
                    _enum: {
                        Custom: 'String',
                        InsufficientBalance: null,
                        InsufficientAllowance: null,
                        ZeroRecipientAddress: null,
                        ZeroSenderAddress: null,
                        SafeTransferCheckFailed: 'String',
                    },
                },
                ContractsErrorsOwnableError: {
                    _enum: {
                        CallerIsNotOwner: null,
                        NewOwnerIsZero: null,
                    },
                },
                CommonErrorsCastError: {
                    _enum: {
                        ToIntOverflow: null,
                    },
                },
                CommonErrorsMathError: {
                    _enum: {
                        CastError: 'CommonErrorsCastError',
                        NumberMismatch: null,
                        MulOverflow: null,
                        DivInternal: null,
                        AddOverflow: null,
                        SubOverflow: null,
                        SubUnderflow: null,
                        AbsUnderflow: null,
                        BPowTooLow: null,
                        UintOverflow: null,
                    },
                },
                CommonErrorsDecimalsError: {
                    _enum: {
                        Overflow: null,
                    },
                },
                CommonErrorsAddressError: {
                    _enum: {
                        TreasuryAddressIdenticalAddresses: null,
                        TreasuryAddressZeroAddress: null,
                    },
                },
                CommonErrorsAmountDistributionError: {
                    _enum: {
                        CastError: 'CommonErrorsCastError',
                        DecimalsError: 'CommonErrorsDecimalsError',
                        MathError: 'CommonErrorsMathError',
                        InsufficientReservesAmount: null,
                        InsufficientSwapAmount: null,
                        InvalidLiquiditySize1: null,
                        InvalidLiquiditySize2: null,
                        InvalidLiquiditySize3: null,
                        InvalidLiquiditySize4: null,
                        InvalidPath: null,
                        NegativeTradeSize1: null,
                        NegativeTradeSize2: null,
                        TradeSplit0NotInRange: null,
                        TradeSplit1NotInRange: null,
                        TradeSplitNotInRange: null,
                    },
                },
            },
        },
    },
    mocha: {
        timeout: 1800000,
    },
} as RedspotUserConfig;
