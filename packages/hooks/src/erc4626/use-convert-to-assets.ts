import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";
import { erc4626 } from "@outofgas/core";
import { usePublicClient } from "wagmi";

export const useConvertToAssets = (token: Address, amount: bigint) => {
  const publicClient = usePublicClient();
  return useQuery({
    queryKey: ["useConvertToAssets", token, amount.toString()],
    queryFn: async () => {
      if (!publicClient) {
        return 0n;
      }
      return await erc4626.convertToAssets(publicClient, token, amount);
    },
    enabled: !!token && !!amount && !!publicClient,
  });
};
