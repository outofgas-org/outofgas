import { Address, PublicClient } from "viem";
import { uniswapV2PairAbi } from "@outofgas/abi";

export const uniswapV2 = {
  getReverses: async (client: PublicClient, pair: Address) => {
    return client.readContract({
      abi: uniswapV2PairAbi,
      address: pair,
      functionName: "getReserves",
    });
  },
};
