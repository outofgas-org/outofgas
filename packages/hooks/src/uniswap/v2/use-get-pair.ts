import { Address } from "viem";
import { useReadContract } from "wagmi";
import { uniswapV2FactoryAbi } from "@outofgas/abi";

export const useUniswapV2GetPair = (
  factory: Address,
  token0: Address,
  token1: Address,
) => {
  const result = useReadContract({
    address: factory,
    abi: uniswapV2FactoryAbi,
    functionName: "getPair",
    args: [token0, token1],
  });

  return {
    pair: result?.data as Address,
    ...result,
  };
};
