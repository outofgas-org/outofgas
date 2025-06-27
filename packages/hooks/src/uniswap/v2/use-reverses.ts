import { Address } from "viem";
import { useReadContract } from "wagmi";
import { uniswapV2PairAbi } from "@outofgas/abi";

export const useUniswapV2Reverses = (pair: Address) => {
  const { data: reserves, refetch } = useReadContract({
    address: pair,
    abi: uniswapV2PairAbi,
    functionName: "getReserves",
  });

  return {
    reserve0: reserves?.[0] ?? 0n,
    reserve1: reserves?.[1] ?? 0n,
    refetch,
  };
};
