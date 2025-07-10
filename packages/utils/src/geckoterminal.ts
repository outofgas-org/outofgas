import { Pair } from "./types";

export interface GeckoTerminalGetPoolsResponse {
  data: {
    id: string;
    attributes: {
      name: string;
      pool_created_at: string;
      address: string;
      base_token_price_usd: string;
      quote_token_price_usd: string;
      volume_usd: {
        m5: string;
        m15: string;
        m30: string;
        h1: string;
        h6: string;
        h24: string;
      };
      reserve_in_usd: string;
    };
    relationships: {
      base_token: {
        data: {
          id: string;
        };
      };
      quote_token: {
        data: {
          id: string;
        };
      };
      dex: {
        data: {
          id: string;
        };
      };
    };
  }[];
}

export class GeckoTerminal {
  constructor(private apiKey?: string) {}

  parsePairName(name: string) {
    const match = name.match(/^(.+?) \/ (.+?)(?: (\d+(\.\d+)?%)?)?$/);
    if (!match)
      return {
        symbol0: "",
        symbol1: "",
        feeTier: "",
      };

    const [, symbol0, symbol1, feeTier] = match;
    return {
      symbol0,
      symbol1,
      feeTier, // e.g. "0.01%"
    };
  }

  private async request(endpoint: string, params?: Record<string, any>) {
    const url = new URL(`https://api.geckoterminal.com/${endpoint}`);
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
      console.error(res);
      throw new Error(
        `GeckoTerminal fetching error: ${endpoint}: ${res.statusText}`,
      );
    }

    return res.json();
  }

  async getAllPairs(
    dex: string,
    options?: Record<string, any>,
  ): Promise<Pair[]> {
    let page = 1;
    let allPairs: Pair[] = [];
    let currentPagePairs: Pair[];

    do {
      currentPagePairs = await this.getPairs(dex, page, options);
      allPairs = allPairs.concat(currentPagePairs);
      page++;
      if (!this.apiKey) {
        if (page === 11) {
          break;
        }
      }
    } while (currentPagePairs.length > 0);

    return allPairs;
  }

  async getPairs(
    dex: string,
    page: number = 1,
    options?: Record<string, any>,
  ): Promise<Pair[]> {
    const res = (await this.request(
      `api/v2/networks/hyperevm/dexes/${dex}/pools`,
      {
        page,
        sort: "h24_volume_usd_desc",
        ...options,
      },
    )) as GeckoTerminalGetPoolsResponse;

    return res.data.map((d) => {
      const attributes = d.attributes;
      const { symbol0, symbol1, feeTier } = this.parsePairName(attributes.name);

      const baseToken = d.relationships.base_token.data.id.split("_")[1] || "";
      const quoteToken =
        d.relationships.quote_token.data.id.split("_")[1] || "";
      const reversed = baseToken.toLowerCase() > quoteToken.toLowerCase();

      return {
        address: d.attributes.address,
        token0: reversed ? quoteToken : baseToken,
        token1: reversed ? baseToken : quoteToken,
        symbol0: (reversed ? symbol1 : symbol0) || "",
        symbol1: (reversed ? symbol0 : symbol1) || "",
        price0: reversed
          ? attributes.quote_token_price_usd
          : attributes.base_token_price_usd,
        price1: reversed
          ? attributes.base_token_price_usd
          : attributes.quote_token_price_usd,
        volume: {
          m5: attributes.volume_usd.m5,
          h1: attributes.volume_usd.h1,
          h6: attributes.volume_usd.h6,
          h24: attributes.volume_usd.h24,
        },
        tvl: attributes.reserve_in_usd,
        dex,
        feeTier: feeTier ? parseFloat(feeTier) * 10000 : 0,
        createdAt: new Date(attributes.pool_created_at).getTime(),
      };
    });
  }
}
