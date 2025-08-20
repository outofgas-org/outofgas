import { Address, PublicClient, WalletClient, Hash, ReadContractParameters, WriteContractParameters } from 'viem';
import { uniswapV2PairAbi, uniswapV2RouterAbi } from '@outofgas/abi';

const calls = {
  getReserves: (pair: Address): ReadContractParameters => ({
    abi: uniswapV2PairAbi,
    address: pair,
    functionName: 'getReserves',
  }),

  token0: (pair: Address): ReadContractParameters => ({
    abi: uniswapV2PairAbi,
    address: pair,
    functionName: 'token0',
  }),

  token1: (pair: Address): ReadContractParameters => ({
    abi: uniswapV2PairAbi,
    address: pair,
    functionName: 'token1',
  }),

  getAmountsOut: (router: Address, amountIn: bigint, path: Address[]): ReadContractParameters => ({
    abi: uniswapV2RouterAbi,
    address: router,
    functionName: 'getAmountsOut',
    args: [amountIn, path],
  }),

  getAmountsIn: (router: Address, amountOut: bigint, path: Address[]): ReadContractParameters => ({
    abi: uniswapV2RouterAbi,
    address: router,
    functionName: 'getAmountsIn',
    args: [amountOut, path],
  }),
};

const writes = {
  swapExactTokensForTokens: (
    router: Address,
    amountIn: bigint,
    amountOutMin: bigint,
    path: Address[],
    to: Address,
    deadline: bigint,
  ): Omit<WriteContractParameters, 'account' | 'chain'> => ({
    abi: uniswapV2RouterAbi,
    address: router,
    functionName: 'swapExactTokensForTokens',
    args: [amountIn, amountOutMin, path, to, deadline],
  }),

  swapExactETHForTokens: (
    router: Address,
    amountOutMin: bigint,
    path: Address[],
    to: Address,
    deadline: bigint,
    value: bigint,
  ): Omit<WriteContractParameters, 'account' | 'chain'> => ({
    abi: uniswapV2RouterAbi,
    address: router,
    functionName: 'swapExactETHForTokens',
    args: [amountOutMin, path, to, deadline],
    value,
  }),

  swapExactTokensForETH: (
    router: Address,
    amountIn: bigint,
    amountOutMin: bigint,
    path: Address[],
    to: Address,
    deadline: bigint,
  ): Omit<WriteContractParameters, 'account' | 'chain'> => ({
    abi: uniswapV2RouterAbi,
    address: router,
    functionName: 'swapExactTokensForETH',
    args: [amountIn, amountOutMin, path, to, deadline],
  }),

  addLiquidity: (
    router: Address,
    tokenA: Address,
    tokenB: Address,
    amountADesired: bigint,
    amountBDesired: bigint,
    amountAMin: bigint,
    amountBMin: bigint,
    to: Address,
    deadline: bigint,
  ): Omit<WriteContractParameters, 'account' | 'chain'> => ({
    abi: uniswapV2RouterAbi,
    address: router,
    functionName: 'addLiquidity',
    args: [tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin, to, deadline],
  }),
};

export const uniswapV2 = {
  calls,
  writes,
};
