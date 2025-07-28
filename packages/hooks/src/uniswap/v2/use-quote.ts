import { Address } from "viem";
import { useUniswapV2GetPair } from "./use-get-pair.js";
import { useUniswapV2Reverses } from "./use-reverses.js";

export function getAmountOut(
  amountIn: bigint,
  reserveIn: bigint,
  reserveOut: bigint,
) {
  if (amountIn <= 0n) return 0n;
  if (reserveIn <= 0n || reserveOut <= 0n) return 0n;

  const amountInWithFee = amountIn * 997n; // 0.3% fee
  const numerator = amountInWithFee * reserveOut;
  const denominator = reserveIn * 1000n + amountInWithFee;

  return numerator / denominator;
}

export const useUniswapV2Quote = (
  chainId: number,
  factory: Address,
  tokenIn: Address,
  tokenOut: Address,
  amountIn: bigint,
) => {
  const [token0] =
    tokenIn.toLowerCase() < tokenOut.toLowerCase()
      ? [tokenIn, tokenOut]
      : [tokenOut, tokenIn];
  const isReversed = tokenIn.toLowerCase() !== token0.toLowerCase();
  const { pair } = useUniswapV2GetPair(factory, tokenIn, tokenOut);
  const { reserve0, reserve1 } = useUniswapV2Reverses(pair);

  return isReversed
    ? getAmountOut(amountIn, reserve1, reserve0)
    : getAmountOut(amountIn, reserve0, reserve1);
};
