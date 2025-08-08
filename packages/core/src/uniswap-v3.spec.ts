import { createPublicClient, http } from 'viem';
import { hyperevm } from '@outofgas/utils';
import { uniswapV3 } from './uniswap-v3';
import { hyperevmContracts } from '@outofgas/contracts';
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};
describe('uniswap v3', () => {
  it('get user positions with uniswap v3', async () => {
    const client = createPublicClient({
      chain: hyperevm,
      transport: http(),
    });
    const positions = await uniswapV3.getUserPositionsWithPools(
      client,
      hyperevmContracts.hyperswapV3.NonfungiblePositionManager,
      hyperevmContracts.hyperswapV3.Factory,
      '0x1df7272534A56fBe1994d982f995D04B9cE3A959',
    );

    console.log(positions.filter((p) => p.liquidity > 0n));
  }, 5000);
  it('get user positions', async () => {
    const client = createPublicClient({
      chain: hyperevm,
      transport: http(),
    });
    const positions = await uniswapV3.getUserPositionsWithPools(
      client,
      hyperevmContracts.hybrafinanceV3.NonfungiblePositionManager,
      hyperevmContracts.hybrafinanceV3.Factory,
      '0x5f871B3Db49a89457950B68C9A1000fAa6f01544',
    );

    console.log(positions.filter((p) => p.liquidity > 0n));
  }, 5000);
});
