import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";
import { erc4626 } from "@outofgas/core";
import { usePublicClient } from "wagmi";

export const useConvertToShares = (token: Address, amount: bigint) => {
  const publicClient = usePublicClient();
  return useQuery({
    queryKey: ["useConvertToShares", token, amount],
    queryFn: async () => {
      if (!publicClient) {
        return 0n;
      }
      return await erc4626.convertToShares(publicClient, token, amount);
    },
    enabled: !!token && !!amount && !!publicClient,
  });
};
