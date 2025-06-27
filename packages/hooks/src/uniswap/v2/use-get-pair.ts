import { Address, zeroAddress } from "viem";
import { useReadContract } from "wagmi";
import { uniswapV2FactoryAbi } from "@outofgas/abi";
import { getContract } from "@outofgas/contracts";

export const useUniswapV2GetPair = (
  chainId: number,
  factory: Address,
  token0: Address,
  token1: Address,
) => {
  const contracts = getContract(chainId);
  const weth = contracts?.WETH ?? zeroAddress;
  const { data: pair } = useReadContract({
    address: factory,
    abi: uniswapV2FactoryAbi,
    functionName: "getPair",
    args: [
      token0 === zeroAddress ? weth : token0,
      token1 === zeroAddress ? weth : token1,
    ],
  });

  return {
    pair: pair as Address,
    error: !contracts ? "this chain unsupported" : undefined,
  };
};
