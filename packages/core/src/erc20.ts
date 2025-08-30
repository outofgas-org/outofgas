import { Address, erc20Abi, ReadContractParameters, WriteContractParameters } from 'viem';

const calls = {
  allowance: (token: Address, owner: Address, spender: Address) =>
    ({
      abi: erc20Abi,
      address: token,
      functionName: 'allowance',
      args: [owner, spender],
    }) as const,

  balanceOf: (token: Address, account: Address) =>
    ({
      abi: erc20Abi,
      address: token,
      functionName: 'balanceOf',
      args: [account],
    }) as const,

  totalSupply: (token: Address) =>
    ({
      abi: erc20Abi,
      address: token,
      functionName: 'totalSupply',
    }) as const,

  decimals: (token: Address) =>
    ({
      abi: erc20Abi,
      address: token,
      functionName: 'decimals',
    }) as const,

  symbol: (token: Address) =>
    ({
      abi: erc20Abi,
      address: token,
      functionName: 'symbol',
    }) as const,

  name: (token: Address) =>
    ({
      abi: erc20Abi,
      address: token,
      functionName: 'name',
    }) as const,
};

const writes = {
  approve: (token: Address, spender: Address, amount: bigint) =>
    ({
      abi: erc20Abi,
      address: token,
      functionName: 'approve',
      args: [spender, amount],
    }) as const,

  transfer: (token: Address, to: Address, amount: bigint) =>
    ({
      abi: erc20Abi,
      address: token,
      functionName: 'transfer',
      args: [to, amount],
    }) as const,

  transferFrom: (token: Address, from: Address, to: Address, amount: bigint) =>
    ({
      abi: erc20Abi,
      address: token,
      functionName: 'transferFrom',
      args: [from, to, amount],
    }) as const,
};

export const erc20 = {
  calls,
  writes,
};
