import { DexScreener } from "./dexscreener";

describe("dexscreener", () => {
  it("pair search", async () => {
    const dexscreener = new DexScreener();
    const res = await dexscreener.pairSearch("kittenswap");
    console.log(res.pairs.length);
  });
  it("", async () => {
    const res = await fetch(
      "https://api.geckoterminal.com/api/v2/networks/hyperevm/dexes/hyperswap-v3/pools?page=1&sort=h24_volume_usd_desc",
    ).then((r) => r.json());
    console.log(JSON.stringify(res, null, 2));
  });
});
