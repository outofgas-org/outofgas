import { useEffect, useRef } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Address, isAddressEqual } from "viem";
import { uniswapV2RouterAbi } from "@outofgas/abi";

export const useUniswapV2Swap = (
  router: Address,
  weth: Address,
  tokenIn: Address,
  tokenOut: Address,
  amountIn: bigint,
  minAmountOut: bigint,
  onSuccess: (hash: `0x${string}`) => void,
) => {
  const { address } = useAccount();
  const { writeContract, isPending, data: hash } = useWriteContract();
  const { isSuccess, isLoading } = useWaitForTransactionReceipt({ hash });

  const successCalledRef = useRef<`0x${string}` | null>(null);
  useEffect(() => {
    if (isSuccess && hash && successCalledRef.current !== hash) {
      onSuccess(hash);
      successCalledRef.current = hash;
    }
  }, [isSuccess, hash, onSuccess]);

  const swap = async () => {
    successCalledRef.current = null;
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 30);
    if (isAddressEqual(tokenIn, weth)) {
      writeContract({
        abi: uniswapV2RouterAbi,
        address: router,
        functionName: "swapExactETHForTokens",
        args: [minAmountOut, [tokenIn, tokenOut], address as Address, deadline],
        value: amountIn,
      });
    } else if (isAddressEqual(tokenOut, weth)) {
      writeContract({
        abi: uniswapV2RouterAbi,
        address: router,
        functionName: "swapExactTokensForETH",
        args: [
          amountIn,
          minAmountOut,
          [tokenIn, tokenOut],
          address as Address,
          deadline,
        ],
      });
    } else {
      writeContract({
        abi: uniswapV2RouterAbi,
        address: router,
        functionName: "swapExactTokensForTokens",
        args: [
          amountIn,
          minAmountOut,
          [tokenIn, tokenOut],
          address as Address,
          deadline,
        ],
      });
    }
  };

  return {
    swap,
    swapping: isPending || isLoading,
  };
};
