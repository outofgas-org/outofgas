import { Address, zeroAddress } from "viem";
import { useUniswapV2GetPair } from "./use-get-pair.js";
import { useUniswapV2Reverses } from "./use-reverses.js";
import { getContract } from "@outofgas/contracts";

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
  const contracts = getContract(chainId);
  const weth = contracts?.WETH ?? zeroAddress;

  const t0 = tokenIn === zeroAddress ? weth : tokenIn;
  const t1 = tokenOut === zeroAddress ? weth : tokenOut;
  const [token0] = t0.toLowerCase() < t1.toLowerCase() ? [t0, t1] : [t1, t0];
  const isReversed = tokenIn.toLowerCase() !== token0.toLowerCase();
  const { pair } = useUniswapV2GetPair(chainId, factory, tokenIn, tokenOut);
  const { reserve0, reserve1 } = useUniswapV2Reverses(pair);

  return isReversed
    ? getAmountOut(amountIn, reserve1, reserve0)
    : getAmountOut(amountIn, reserve0, reserve1);
};
