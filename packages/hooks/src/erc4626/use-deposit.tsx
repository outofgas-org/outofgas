import { useMutation } from "@tanstack/react-query";
import { type Address, isAddress } from "viem";
import { erc4626 } from "@outofgas/core";
import { usePublicClient, useWalletClient } from "wagmi";

interface UseDepositParams {
  token: Address;
  amount: bigint;
  receiver: Address;
}

interface UseDepositOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useDeposit = (options?: UseDepositOptions) => {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  return useMutation({
    mutationFn: async ({ token, amount, receiver }: UseDepositParams) => {
      if (!token || !isAddress(token)) {
        throw new Error("token is not valid");
      }

      if (!receiver || !isAddress(receiver)) {
        throw new Error("receiver is not valid");
      }

      if (!walletClient) {
        throw new Error("wallet not connected");
      }

      if (!publicClient) {
        throw new Error("public client not available");
      }

      return erc4626.deposit(
        walletClient,
        publicClient,
        token,
        amount,
        receiver,
      );
    },
    onSuccess: () => {
      options?.onSuccess?.();
    },
    onError: (err) => {
      options?.onError?.(err as Error);
    },
  });
};
