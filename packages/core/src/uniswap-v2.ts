import { Address, ReadContractParameters, WriteContractParameters } from 'viem';
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
  ) =>
    ({
      abi: uniswapV2RouterAbi,
      address: router,
      functionName: 'swapExactTokensForTokens',
      args: [amountIn, amountOutMin, path, to, deadline],
    }) as const,

  swapExactETHForTokens: (
    router: Address,
    amountOutMin: bigint,
    path: Address[],
    to: Address,
    deadline: bigint,
    value: bigint,
  ) =>
    ({
      abi: uniswapV2RouterAbi,
      address: router,
      functionName: 'swapExactETHForTokens',
      args: [amountOutMin, path, to, deadline],
      value,
    }) as const,

  swapExactTokensForETH: (
    router: Address,
    amountIn: bigint,
    amountOutMin: bigint,
    path: Address[],
    to: Address,
    deadline: bigint,
  ) =>
    ({
      abi: uniswapV2RouterAbi,
      address: router,
      functionName: 'swapExactTokensForETH',
      args: [amountIn, amountOutMin, path, to, deadline],
    }) as const,

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
  ) =>
    ({
      abi: uniswapV2RouterAbi,
      address: router,
      functionName: 'addLiquidity',
      args: [tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin, to, deadline],
    }) as const,

  removeLiquidity: (
    router: Address,
    tokenA: Address,
    tokenB: Address,
    liquidity: bigint,
    amountAMin: bigint,
    amountBMin: bigint,
    to: Address,
    deadline: bigint,
  ) =>
    ({
      abi: uniswapV2RouterAbi,
      address: router,
      functionName: 'removeLiquidity',
      args: [tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline],
    }) as const,
};

export const uniswapV2 = {
  calls,
  writes,
};
