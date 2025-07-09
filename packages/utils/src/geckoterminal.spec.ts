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
  it("get hyperswap-v3 pairs", async () => {
    const geckoTerminal = new GeckoTerminal();
    const res = await geckoTerminal.getPairs("hyperswap-v3");
    console.log(res.length);
    console.log(JSON.stringify(res, null, 2));
  });
  it("get hyperswap-v2 pairs", async () => {
    const geckoTerminal = new GeckoTerminal();
    const res = await geckoTerminal.getPairs("hyperswap-v2");
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
});
