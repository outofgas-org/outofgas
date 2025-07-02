import { erc20 } from "./erc20";
import { createPublicClient, http } from "viem";
import { hyperevm } from "@outofgas/utils";

describe("erc20", () => {
  const publicClient = createPublicClient({
    chain: hyperevm,
    transport: http(),
  });
  it("allowance", async () => {
    const allowance = await erc20.allowance(
      publicClient,
      "0x5555555555555555555555555555555555555555",
      "0x47bb061c0204af921f43dc73c7d7768d2672ddee",
      "0x47bb061c0204af921f43dc73c7d7768d2672ddee",
    );

    console.log(allowance);
  }, 5000);
});
