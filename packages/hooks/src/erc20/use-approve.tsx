import { useMutation } from "@tanstack/react-query";
import type { WalletClient, PublicClient, Address } from "viem";
import { erc20 } from "@outofgas/core";
import { usePublicClient, useWalletClient } from "wagmi";

interface UseApproveParams {
  token: Address;
  spender: Address;
  amount: bigint;
}

export const useApprove = () => {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  return useMutation({
    mutationFn: async ({ token, spender, amount }: UseApproveParams) => {
      if (!walletClient) {
        throw new Error("wallet not connected");
      }

      if (!publicClient) {
        throw new Error("public client not available");
      }

      return erc20.approve(walletClient, publicClient, token, spender, amount);
    },
  });
};
