import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";
import { erc20 } from "@outofgas/core";
import { usePublicClient } from "wagmi";

export const useAllowance = (
  token: Address,
  owner: Address,
  spender: Address,
): { allowance: bigint; isLoading: boolean } => {
  const publicClient = usePublicClient();
  const { data, isLoading } = useQuery({
    queryKey: ["erc20Allowance", token, owner, spender],
    queryFn: async () => {
      if (!publicClient) {
        return 0n;
      }
      return await erc20.allowance(publicClient, token, owner, spender);
    },
    enabled: !!token && !!owner && !!spender && !!publicClient,
  });

  return { allowance: data ?? 0n, isLoading };
};
