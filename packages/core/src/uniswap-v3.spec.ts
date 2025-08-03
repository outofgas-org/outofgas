import { createPublicClient, http } from "viem";
import { hyperevm } from "@outofgas/utils";
import { uniswapV3 } from "./uniswap-v3";
import { hyperevmContracts } from "@outofgas/contracts";
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};
describe("uniswap v3", () => {
  it("get user positions", async () => {
    const client = createPublicClient({
      chain: hyperevm,
      transport: http(),
    });
    const positions = await uniswapV3.getUserPositions(
      client,
      hyperevmContracts.hybrafinanceV3.NonfungiblePositionManager,
      "0x5f871B3Db49a89457950B68C9A1000fAa6f01544",
    );

    console.log(JSON.stringify(positions, null, 2));
  }, 5000);
});
