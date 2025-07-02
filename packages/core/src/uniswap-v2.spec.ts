import { liquidswap } from "./liquidswap";
import { uniswapV2 } from "./uniswap-v2";
import { createPublicClient, http } from "viem";
import { hyperevm } from "@outofgas/utils";

describe("uniswap v2", () => {
  it("reserves", async () => {
    const client = createPublicClient({
      chain: hyperevm,
      transport: http(),
    });
    const [r0, r1] = await uniswapV2.getReverses(
      client,
      "0x599Ffaa5198da13547B280E134d8e4727A9E1f5B",
    );

    console.log(r0, r1);
  }, 5000);
});
