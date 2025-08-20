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
  poolState?: PoolState;
}

const calls = {
  balanceOf: (positionManager: Address, owner: Address) =>
    ({
      abi: uniswapV3PositionManagerAbi,
      address: positionManager,
      functionName: 'balanceOf',
      args: [owner],
    }) as const,

  tokenOfOwnerByIndex: (positionManager: Address, owner: Address, index: number) =>
    ({
      abi: uniswapV3PositionManagerAbi,
      address: positionManager,
      functionName: 'tokenOfOwnerByIndex',
      args: [owner, index],
    }) as const,

  positions: (positionManager: Address, tokenId: bigint) =>
    ({
      abi: uniswapV3PositionManagerAbi,
      address: positionManager,
      functionName: 'positions',
      args: [tokenId],
    }) as const,

  // Factory calls
  getPool: (factory: Address, token0: Address, token1: Address, fee: number) =>
    ({
      abi: uniswapV3FactoryAbi,
      address: factory,
      functionName: 'getPool',
      args: [token0, token1, fee],
    }) as const,

  // Pool calls
  slot0: (pool: Address) =>
    ({
      abi: uniswapV3PoolAbi,
      address: pool,
      functionName: 'slot0',
    }) as const,

  liquidity: (pool: Address) =>
    ({
      abi: uniswapV3PoolAbi,
      address: pool,
      functionName: 'liquidity',
    }) as const,

  token0: (pool: Address) =>
    ({
      abi: uniswapV3PoolAbi,
      address: pool,
      functionName: 'token0',
    }) as const,

  token1: (pool: Address) =>
    ({
      abi: uniswapV3PoolAbi,
      address: pool,
      functionName: 'token1',
    }) as const,

  fee: (pool: Address) =>
    ({
      abi: uniswapV3PoolAbi,
      address: pool,
      functionName: 'fee',
    }) as const,
};

const writes = {
  // Position Manager writes
  mint: (
    positionManager: Address,
    token0: Address,
    token1: Address,
    fee: number,
    tickLower: number,
    tickUpper: number,
    amount0Desired: bigint,
    amount1Desired: bigint,
    amount0Min: bigint,
    amount1Min: bigint,
    recipient: Address,
    deadline: bigint,
  ) =>
    ({
      abi: uniswapV3PositionManagerAbi,
      address: positionManager,
      functionName: 'mint',
      args: [
        {
          token0,
          token1,
          fee,
          tickLower,
          tickUpper,
          amount0Desired,
          amount1Desired,
          amount0Min,
          amount1Min,
          recipient,
          deadline,
        },
      ],
    }) as const,

  increaseLiquidity: (
    positionManager: Address,
    tokenId: bigint,
    amount0Desired: bigint,
    amount1Desired: bigint,
    amount0Min: bigint,
    amount1Min: bigint,
    deadline: bigint,
  ) =>
    ({
      abi: uniswapV3PositionManagerAbi,
      address: positionManager,
      functionName: 'increaseLiquidity',
      args: [
        {
          tokenId,
          amount0Desired,
          amount1Desired,
          amount0Min,
          amount1Min,
          deadline,
        },
      ],
    }) as const,

  decreaseLiquidity: (
    positionManager: Address,
    tokenId: bigint,
    liquidity: bigint,
    amount0Min: bigint,
    amount1Min: bigint,
    deadline: bigint,
  ) =>
    ({
      abi: uniswapV3PositionManagerAbi,
      address: positionManager,
      functionName: 'decreaseLiquidity',
      args: [
        {
          tokenId,
          liquidity,
          amount0Min,
          amount1Min,
          deadline,
        },
      ],
    }) as const,

  collect: (positionManager: Address, tokenId: bigint, recipient: Address, amount0Max: bigint, amount1Max: bigint) =>
    ({
      abi: uniswapV3PositionManagerAbi,
      address: positionManager,
      functionName: 'collect',
      args: [
        {
          tokenId,
          recipient,
          amount0Max,
          amount1Max,
        },
      ],
    }) as const,

  burn: (positionManager: Address, tokenId: bigint) =>
    ({
      abi: uniswapV3PositionManagerAbi,
      address: positionManager,
      functionName: 'burn',
      args: [tokenId],
    }) as const,
};

export const uniswapV3 = {
  calls,
  writes,

  getUserPositions: async (
    client: PublicClient,
    positionManager: Address,
    address: Address,
  ): Promise<UniswapV3Position[]> => {
    const count = await client.readContract(calls.balanceOf(positionManager, address));

    if (count === 0n) return [];

    const ids = await client.multicall({
      contracts: Array.from({ length: Number(count) }, (_, index) =>
        calls.tokenOfOwnerByIndex(positionManager, address, index),
      ),
    });

    const results = await client.multicall<{ result: UniswapV3Position }[]>({
      contracts: ids.map((id) => calls.positions(positionManager, id.result as bigint)),
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
    if (pools.length === 0) return [];

    const res = await client.multicall({
      contracts: pools.flatMap((p) => [calls.slot0(p), calls.liquidity(p)]),
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
  ): Promise<UniswapV3PositionWithPoolState[]> => {
    const positions = await uniswapV3.getUserPositions(client, positionManager, address);

    if (positions.length === 0) return [];

    const results = await client.multicall({
      contracts: positions.map((p) => calls.getPool(factory, p.token0, p.token1, p.fee)),
    });

    const poolAddresses = results.map((id) => id.result as Address);
    const poolStates = await uniswapV3.getPoolStates(client, poolAddresses);

    return positions.map((position, i) => ({
      ...position,
      poolState: poolStates[i],
    }));
  },
};
