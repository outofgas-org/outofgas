import { Address, erc20Abi, PublicClient, WalletClient } from 'viem';

export const erc20 = {
  allowance: async (publicClient: PublicClient, token: Address, owner: Address, spender: Address) => {
    return await publicClient.readContract({
      abi: erc20Abi,
      address: token,
      functionName: 'allowance',
      args: [owner, spender],
    });
  },
  approve: async (
    walletClient: WalletClient,
    publicClient: PublicClient,
    token: Address,
    spender: Address,
    amount: bigint,
    options?: {
      gasLimit?: bigint;
    },
  ) => {
    if (!walletClient.account) {
      throw new Error('wallet account not found');
    }

    const hash = await walletClient.writeContract({
      abi: erc20Abi,
      address: token,
      functionName: 'approve',
      args: [spender, amount],
      chain: walletClient.chain,
      account: walletClient.account,
      ...(options?.gasLimit && { gas: options.gasLimit }),
    });

    return publicClient.waitForTransactionReceipt({ hash });
  },
};
