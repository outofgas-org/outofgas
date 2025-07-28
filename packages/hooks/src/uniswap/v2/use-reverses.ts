import { Address } from "viem";
import { useReadContract } from "wagmi";
import { uniswapV2PairAbi } from "@outofgas/abi";

export const useUniswapV2Reverses = (pair: Address) => {
  const result = useReadContract({
    address: pair,
    abi: uniswapV2PairAbi,
    functionName: "getReserves",
  });

  return {
    reserve0: result?.data?.[0] ?? 0n,
    reserve1: result?.data?.[1] ?? 0n,
    ...result,
  };
};
