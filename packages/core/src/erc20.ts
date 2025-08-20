import { Address, erc20Abi, ReadContractParameters, WriteContractParameters } from 'viem';

const calls = {
  allowance: (token: Address, owner: Address, spender: Address): ReadContractParameters => ({
    abi: erc20Abi,
    address: token,
    functionName: 'allowance',
    args: [owner, spender],
  }),

  balanceOf: (token: Address, account: Address): ReadContractParameters => ({
    abi: erc20Abi,
    address: token,
    functionName: 'balanceOf',
    args: [account],
  }),

  totalSupply: (token: Address): ReadContractParameters => ({
    abi: erc20Abi,
    address: token,
    functionName: 'totalSupply',
  }),

  decimals: (token: Address): ReadContractParameters => ({
    abi: erc20Abi,
    address: token,
    functionName: 'decimals',
  }),

  symbol: (token: Address): ReadContractParameters => ({
    abi: erc20Abi,
    address: token,
    functionName: 'symbol',
  }),

  name: (token: Address): ReadContractParameters => ({
    abi: erc20Abi,
    address: token,
    functionName: 'name',
  }),
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
