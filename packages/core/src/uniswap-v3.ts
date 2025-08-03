import { Address, PublicClient, ReadContractParameters } from 'viem';
import { uniswapV3FactoryAbi, uniswapV3PoolAbi, uniswapV3PositionManagerAbi } from '@outofgas/abi';

export interface UniswapV3Position {
  tokenId: bigint;
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

export interface PoolState {
  pool: Address;
  sqrtPriceX96: bigint;
  tick: number;
  liquidity: bigint;
}

export interface UniswapV3PositionWithPoolState extends UniswapV3Position {
  poolState: PoolState;
}

export const uniswapV3 = {
  calls: {
    balanceOf: (
      positionManager: Address,
      owner: Address,
    ): ReadContractParameters<typeof uniswapV3PositionManagerAbi, 'balanceOf'> => ({
      abi: uniswapV3PositionManagerAbi,
      address: positionManager,
      functionName: 'balanceOf',
      args: [owner],
    }),

    tokenOfOwnerByIndex: (positionManager: Address, owner: Address, index: number) => ({
      abi: uniswapV3PositionManagerAbi,
      address: positionManager,
      functionName: 'tokenOfOwnerByIndex',
      args: [owner, index],
    }),

    positions: (positionManager: Address, tokenId: bigint) => ({
      abi: uniswapV3PositionManagerAbi,
      address: positionManager,
      functionName: 'positions',
      args: [tokenId],
    }),

    getPool: (factory: Address, token0: Address, token1: Address, fee: number) => ({
      abi: uniswapV3FactoryAbi,
      address: factory,
      functionName: 'getPool',
      args: [token0, token1, fee],
    }),
  },

  getUserPositions: async (client: PublicClient, positionManager: Address, address: Address) => {
    const count = await client.readContract(uniswapV3.calls.balanceOf(positionManager, address));
    const ids = await client.multicall({
      contracts: Array.from({ length: Number(count) }, (_, index) =>
        uniswapV3.calls.tokenOfOwnerByIndex(positionManager, address, index),
      ),
    });

    const results = await client.multicall<{ result: UniswapV3Position }[]>({
      contracts: ids.map((id) => uniswapV3.calls.positions(positionManager, id.result as bigint)),
    });

    return results.map((r, index) => {
      const raw = r.result as any;
      return {
        tokenId: ids[index]?.result as bigint,
        nonce: raw[0],
        operator: raw[1],
        token0: raw[2],
        token1: raw[3],
        fee: raw[4],
        tickLower: raw[5],
        tickUpper: raw[6],
        liquidity: raw[7],
        feeGrowthInside0LastX128: raw[8],
        feeGrowthInside1LastX128: raw[9],
        tokensOwed0: raw[10],
        tokensOwed1: raw[11],
      } satisfies UniswapV3Position;
    });
  },

  getPoolStates: async (client: PublicClient, pools: Address[]): Promise<PoolState[]> => {
    const res = await client.multicall({
      contracts: pools.flatMap((p) => [
        {
          address: p,
          abi: uniswapV3PoolAbi,
          functionName: 'slot0',
        },
        {
          address: p,
          abi: uniswapV3PoolAbi,
          functionName: 'liquidity',
        },
      ]),
    });

    const poolStates: PoolState[] = [];
    for (let i = 0; i < res.length; i += 2) {
      poolStates.push({
        pool: pools[i / 2] as Address,
        sqrtPriceX96: (res[i]?.result as unknown as [bigint, number])?.[0],
        tick: (res[i]?.result as unknown as [bigint, number])[1],
        liquidity: res[i + 1]?.result as bigint,
      });
    }

    return poolStates;
  },

  getUserPositionsWithPools: async (
    client: PublicClient,
    positionManager: Address,
    factory: Address,
    address: Address,
  ) => {
    const positions = await uniswapV3.getUserPositions(client, positionManager, address);

    const results = await client.multicall({
      contracts: positions.map((p) => uniswapV3.calls.getPool(factory, p.token0, p.token1, p.fee)),
    });

    const poolAddresses = results.map((id) => id.result as Address);
    const poolStates = await uniswapV3.getPoolStates(client, poolAddresses);

    return positions.map((position, i) => ({
      ...position,
      poolState: poolStates[i],
    })) as UniswapV3PositionWithPoolState[];
  },
};
