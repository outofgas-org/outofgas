import { Address, PublicClient } from "viem";
import { uniswapV3PositionManagerAbi } from "@outofgas/abi";

export interface UniswapV3Position {
  nonce: bigint;
  operator: Address;
  token0: Address;
  token1: Address;
  fee: number;
  tickLower: number;
  tickUpper: number;
  liquidity: bigint;
  feeGrowthInside0LastX128: bigint;
  feeGrowthInside1LastX128: bigint;
  tokensOwed0: bigint;
  tokensOwed1: bigint;
}

export const uniswapV3 = {
  balanceOf: async (
    client: PublicClient,
    positionManager: Address,
    address: Address,
  ) => {
    return client.readContract({
      abi: uniswapV3PositionManagerAbi,
      address: positionManager,
      functionName: "balanceOf",
      args: [address],
    });
  },

  getUserPositions: async (
    client: PublicClient,
    positionManager: Address,
    address: Address,
  ) => {
    const count = await uniswapV3.balanceOf(client, positionManager, address);
    const ids = await client.multicall({
      contracts: Array.from(Array(Number(count)).keys()).map(
        (index: number) => ({
          abi: uniswapV3PositionManagerAbi,
          address: positionManager,
          functionName: "tokenOfOwnerByIndex",
          args: [address, index],
        }),
      ),
    });

    const results = await client.multicall<{ result: UniswapV3Position }[]>({
      contracts: ids.map((id) => ({
        abi: uniswapV3PositionManagerAbi,
        address: positionManager,
        functionName: "positions",
        args: [id.result as bigint],
      })),
    });
    return results.map((r) => r.result as UniswapV3Position);
  },
};
