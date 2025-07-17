import {
  Address,
  erc4626Abi,
  isAddress,
  PublicClient,
  WalletClient,
} from "viem";

export const erc4626 = {
  convertToAssets: async (
    publicClient: PublicClient,
    token: Address,
    amount: bigint,
  ) => {
    return await publicClient.readContract({
      abi: erc4626Abi,
      address: token,
      functionName: "convertToAssets",
      args: [amount],
    });
  },
  convertToShares: async (
    publicClient: PublicClient,
    token: Address,
    amount: bigint,
  ) => {
    return await publicClient.readContract({
      abi: erc4626Abi,
      address: token,
      functionName: "convertToShares",
      args: [amount],
    });
  },
  deposit: async (
    walletClient: WalletClient,
    publicClient: PublicClient,
    token: Address,
    amount: bigint,
    receiver: Address,
  ) => {
    if (!walletClient.account) {
      throw new Error("wallet account not found");
    }

    if (!token || !isAddress(token)) {
      throw new Error("token is not a address");
    }

    if (!receiver || !isAddress(receiver)) {
      throw new Error("receiver is not a address");
    }

    const hash = await walletClient.writeContract({
      abi: erc4626Abi,
      address: token,
      functionName: "deposit",
      args: [amount, receiver],
      chain: walletClient.chain,
      account: walletClient.account,
    });

    return publicClient.waitForTransactionReceipt({ hash });
  },
};
