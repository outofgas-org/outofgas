import { liquidswap } from "./liquidswap";

describe("liquidswap", () => {
  it("get route", async () => {
    const res = await liquidswap.getRoute(
      "0x5555555555555555555555555555555555555555",
      "0x47bb061c0204af921f43dc73c7d7768d2672ddee",
      "1",
    );

    console.log(JSON.stringify(res, null, 2));
  }, 5000);
});
