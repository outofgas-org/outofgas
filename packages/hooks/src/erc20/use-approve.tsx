import { useMutation } from '@tanstack/react-query';
import { isAddress, type Address } from 'viem';
import { erc20 } from '@outofgas/core';
import { usePublicClient, useWalletClient } from 'wagmi';

interface UseApproveParams {
  token: Address;
  spender: Address;
  amount: bigint;
}

interface UseApproveOptions {
  gasLimit?: bigint;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useApprove = (options?: UseApproveOptions) => {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  return useMutation({
    mutationFn: async ({ token, spender, amount }: UseApproveParams) => {
      if (!token || !isAddress(token)) {
        throw new Error('Token is not valid');
      }

      if (!walletClient) {
        throw new Error('wallet not connected');
      }

      if (!publicClient) {
        throw new Error('public client not available');
      }

      return erc20.approve(walletClient, publicClient, token, spender, amount, {
        gasLimit: options?.gasLimit,
      });
    },
    onSuccess: () => {
      options?.onSuccess?.();
    },
    onError: (err) => {
      options?.onError?.(err as Error);
    },
  });
};
