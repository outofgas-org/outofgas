import { liquidswap } from "./liquidswap";
import { hyperevmContracts } from "@outofgas/contracts";

describe("liquidswap", () => {
  it("get route", async () => {
    const res = await liquidswap.getRoute(
      "0x5555555555555555555555555555555555555555",
      "0x47bb061c0204af921f43dc73c7d7768d2672ddee",
      "1",
    );

    console.log(JSON.stringify(res, null, 2));
  }, 5000);
  it("unwrap", async () => {
    const res = await liquidswap.getRoute(
      "0x47bb061c0204af921f43dc73c7d7768d2672ddee",
      hyperevmContracts.WETH,
      "1000",
    );
    console.log(JSON.stringify(res, null, 2));
    const res2 = await liquidswap.getRoute(
      "0x47bb061c0204af921f43dc73c7d7768d2672ddee",
      hyperevmContracts.WETH,
      "1000",
      true,
    );
    console.log(JSON.stringify(res2, null, 2));
  }, 100000);
});
