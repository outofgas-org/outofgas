import { liquidswap } from "./liquidswap";
import { hyperevmContracts } from "@outofgas/contracts";
import { kittenswap } from "./kittenswap";
import { createPublicClient, http } from "viem";
import { hyperevm } from "@outofgas/utils";

const client = createPublicClient({
  chain: hyperevm,
  transport: http(),
});

describe("kittenswap", () => {
  it("pair", async () => {
    const fee = await kittenswap.getFee(
      client,
      "0xf3994b10d0e3153d99647a6fe296102d2d6eadaf",
      false,
    );
    expect(fee).toEqual(100n);
  }, 60000);

  it("stable pair", async () => {
    const fee = await kittenswap.getFee(
      client,
      "0x3c1f6d843af17d0d87c6924b633cb500047b67bf",
      true,
    );
    expect(fee).toEqual(300n);
  }, 60000);
});
