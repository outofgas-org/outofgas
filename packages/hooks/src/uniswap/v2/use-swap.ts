import { useEffect, useRef } from 'react';
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { Address, isAddressEqual } from 'viem';
import { uniswapV2RouterAbi } from '@outofgas/abi';

interface UseUniswapV2SwapOptions {
  gasLimit?: bigint;
  gasPrice?: bigint;
  onSuccess: (hash: `0x${string}`) => void;
}

export const useUniswapV2Swap = (
  router: Address,
  weth: Address,
  tokenIn: Address,
  tokenOut: Address,
  amountIn: bigint,
  minAmountOut: bigint,
  options?: UseUniswapV2SwapOptions,
) => {
  const { address } = useAccount();
  const { writeContract, isPending, data: hash } = useWriteContract();
  const { isSuccess, isLoading } = useWaitForTransactionReceipt({ hash });

  const successCalledRef = useRef<`0x${string}` | null>(null);
  useEffect(() => {
    if (isSuccess && hash && successCalledRef.current !== hash && options?.onSuccess) {
      options.onSuccess(hash);
      successCalledRef.current = hash;
    }
  }, [isSuccess, hash, options]);

  const swap = async () => {
    successCalledRef.current = null;
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 30);

    const baseParams = {
      abi: uniswapV2RouterAbi,
      address: router,
      ...(options?.gasLimit && { gas: options.gasLimit }),
      ...(options?.gasPrice && { gasPrice: options.gasPrice }),
    };

    if (isAddressEqual(tokenIn, weth)) {
      writeContract({
        ...baseParams,
        functionName: 'swapExactETHForTokens',
        args: [minAmountOut, [tokenIn, tokenOut], address as Address, deadline],
        value: amountIn,
      });
    } else if (isAddressEqual(tokenOut, weth)) {
      writeContract({
        ...baseParams,
        functionName: 'swapExactTokensForETH',
        args: [amountIn, minAmountOut, [tokenIn, tokenOut], address as Address, deadline],
      });
    } else {
      writeContract({
        ...baseParams,
        functionName: 'swapExactTokensForTokens',
        args: [amountIn, minAmountOut, [tokenIn, tokenOut], address as Address, deadline],
      });
    }
  };

  return {
    swap,
    swapping: isPending || isLoading,
  };
};
