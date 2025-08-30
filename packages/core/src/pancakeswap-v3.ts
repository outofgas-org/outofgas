import { Address } from 'viem';
import { pancakeswapSwapRouterAbi } from '@outofgas/abi';

const writes = {
  // SwapRouter
  exactInputSingle: (
    swapRouter: Address,
    tokenIn: Address,
    tokenOut: Address,
    fee: number,
    recipient: Address,
    amountIn: bigint,
    amountOutMinimum: bigint,
    sqrtPriceLimitX96: bigint,
  ) =>
    ({
      abi: pancakeswapSwapRouterAbi,
      address: swapRouter,
      functionName: 'exactInputSingle',
      args: [
        {
          tokenIn,
          tokenOut,
          fee,
          recipient,
          amountIn,
          amountOutMinimum,
          sqrtPriceLimitX96,
        },
      ],
    }) as const,
  exactInput: (swapRouter: Address, path: string, recipient: Address, amountIn: bigint, amountOutMinimum: bigint) =>
    ({
      abi: pancakeswapSwapRouterAbi,
      address: swapRouter,
      functionName: 'exactInput',
      args: [
        {
          path,
          recipient,
          amountIn,
          amountOutMinimum,
        },
      ],
    }) as const,

  exactOutputSingle: (
    swapRouter: Address,
    tokenIn: Address,
    tokenOut: Address,
    fee: number,
    recipient: Address,
    amountOut: bigint,
    amountInMaximum: bigint,
    sqrtPriceLimitX96: bigint,
  ) =>
    ({
      abi: pancakeswapSwapRouterAbi,
      address: swapRouter,
      functionName: 'exactOutputSingle',
      args: [
        {
          tokenIn,
          tokenOut,
          fee,
          recipient,
          amountOut,
          amountInMaximum,
          sqrtPriceLimitX96,
        },
      ],
    }) as const,

  exactOutput: (swapRouter: Address, path: string, recipient: Address, amountOut: bigint, amountInMaximum: bigint) =>
    ({
      abi: pancakeswapSwapRouterAbi,
      address: swapRouter,
      functionName: 'exactOutput',
      args: [
        {
          path,
          recipient,
          amountOut,
          amountInMaximum,
        },
      ],
    }) as const,
};

export const pancakeV3 = {
  writes,
};
