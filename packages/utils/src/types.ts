export interface Pair {
  address: string;
  token0: string;
  token1: string;
  symbol0: string;
  symbol1: string;
  price0: string;
  price1: string;
  volume: {
    m5: string;
    h1: string;
    h6: string;
    h24: string;
  };
  tvl: string;
  dex: string;
  feeTier: number; // 0.01% => 100, 0.25% => 2500
}
