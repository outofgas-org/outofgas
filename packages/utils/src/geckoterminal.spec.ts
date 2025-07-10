import { GeckoTerminal } from "./geckoterminal";

describe("geckoterminal", () => {
  it("parse name with fee tier", async () => {
    const geckoTerminal = new GeckoTerminal();
    const { symbol0, symbol1, feeTier } =
      geckoTerminal.parsePairName("KITTY / USDC 0.01%");
    expect(symbol0).toEqual("KITTY");
    expect(symbol1).toEqual("USDC");
    expect(feeTier).toEqual("0.01%");
  });
  it("parse name", async () => {
    const geckoTerminal = new GeckoTerminal();
    const { symbol0, symbol1, feeTier } =
      geckoTerminal.parsePairName("KITTY / USDC");
    expect(symbol0).toEqual("KITTY");
    expect(symbol1).toEqual("USDC");
    expect(feeTier).toEqual(undefined);
  });
  it("get hyperswap-v2 all pairs", async () => {
    const geckoTerminal = new GeckoTerminal();
    const res = await geckoTerminal.getAllPairs("hyperswap-v2");
    console.log(res.length);
    console.log(JSON.stringify(res, null, 2));
  }, 100000);
  it("get hyperswap-v3 all pairs", async () => {
    const geckoTerminal = new GeckoTerminal();
    const res = await geckoTerminal.getAllPairs("hyperswap-v3");
    console.log(res.length);
    console.log(JSON.stringify(res, null, 2));
  }, 100000);
  it("get hyperswap-v3 pairs", async () => {
    const geckoTerminal = new GeckoTerminal();
    const res = await geckoTerminal.getPairs("hyperswap-v3");
    console.log(res.length);
    console.log(JSON.stringify(res, null, 2));
  });
  it("get hyperswap-v2 pairs", async () => {
    const geckoTerminal = new GeckoTerminal();
    const res = await geckoTerminal.getPairs("hyperswap-v2", 10);
    console.log(res.length);
    console.log(JSON.stringify(res, null, 2));
  });
  it("get kittenswap-v2 pairs", async () => {
    const geckoTerminal = new GeckoTerminal();
    const res = await geckoTerminal.getPairs("kittenswap");
    console.log(res.length);
    console.log(JSON.stringify(res, null, 2));
  });

  it("get kittenswap-v3 pairs", async () => {
    const geckoTerminal = new GeckoTerminal();
    const res = await geckoTerminal.getPairs("kittenswap-v3");
    console.log(res.length);
    console.log(JSON.stringify(res, null, 2));
  });

  it("get hybra-v3 pairs", async () => {
    const geckoTerminal = new GeckoTerminal();
    const res = await geckoTerminal.getAllPairs("hybra-finance-v3");
    console.log(res.length);
    console.log(JSON.stringify(res, null, 2));
  }, 60000);

  it("get hybra pairs", async () => {
    const geckoTerminal = new GeckoTerminal();
    const res = await geckoTerminal.getAllPairs("hybra-finance");
    console.log(res.length);
    console.log(JSON.stringify(res, null, 2));
  }, 60000);

  it("get laminar pairs", async () => {
    const geckoTerminal = new GeckoTerminal();
    const res = await geckoTerminal.getPairs("laminar", 2);
    console.log(res.length);
    console.log(JSON.stringify(res, null, 2));
  });

  it("get all laminar pairs", async () => {
    const geckoTerminal = new GeckoTerminal();
    const res = await geckoTerminal.getAllPairs("laminar");
    console.log(res.length);
    console.log(JSON.stringify(res, null, 2));
  }, 200000);
});
