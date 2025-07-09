export interface TokenInfo {
  symbol: string;
  address: string;
  name?: string;
  decimals?: number;
  chainId?: string;
}

export interface DexScreenerPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  labels?: string[];
  baseToken: TokenInfo;
  quoteToken: TokenInfo;
  priceNative: string;
  priceUsd: string;
  txns: {
    h1?: number;
    h6?: number;
    h24?: number;
  };
  volume: {
    h1?: number;
    h6?: number;
    h24?: number;
  };
  priceChange: {
    h1?: number;
    h6?: number;
    h24?: number;
  };
  liquidity: {
    usd?: number;
    base?: number;
    quote?: number;
  };
  fdv?: number;
  marketCap?: number;
  pairCreatedAt: number;
  info?: Record<string, any>;
}

export interface PairSearchResponse {
  schemaVersion: string;
  pairs: DexScreenerPair[];
}

export class DexScreener {
  constructor(private apiKey?: string) {}

  private async request(endpoint: string, params?: Record<string, any>) {
    const url = new URL(`https://api.dexscreener.com/${endpoint}`);
    Object.entries(params || {}).forEach(([key, val]) =>
      url.searchParams.append(key, String(val)),
    );

    const res = await fetch(url, {
      headers: new Headers({
        "Content-Type": "application/json",
        ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}),
      }),
    });

    if (!res.ok) {
      throw new Error(
        `DexScreener fetching error: ${endpoint}: ${res.statusText}`,
      );
    }

    return res.json();
  }

  async pairSearch(query: string): Promise<PairSearchResponse> {
    return this.request("latest/dex/search", { q: query });
  }
}
