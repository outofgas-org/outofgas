import { Address, PublicClient } from "viem";
import { kittenswapPairFactoryAbi } from "@outofgas/abi";
import { hyperevmContracts } from "@outofgas/contracts";

export const kittenswap = {
  getFee: async (client: PublicClient, pair: Address, isStable: boolean) => {
    return client.readContract({
      abi: kittenswapPairFactoryAbi,
      address: hyperevmContracts.kittenswap.PAIR_FACTORY,
      functionName: "getFee",
      args: [pair, isStable],
    });
  },
};
