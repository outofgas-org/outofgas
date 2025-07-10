import { Address } from "viem";
import { RouteResponse } from "./types";

export const liquidswap = {
  getRoute: async (
    tokenIn: Address,
    tokenOut: Address,
    amountIn: string,
    options?: {
      unwrapWHYPE?: boolean;
      slippage?: number;
      feeBps?: number; // 1% => 100
      feeRecipient?: Address;
    },
  ) => {
    const {
      unwrapWHYPE = false,
      slippage = 0.5,
      feeBps,
      feeRecipient,
    } = options ?? {};
    const params = new URLSearchParams({
      multiHop: "true",
      tokenIn,
      tokenOut,
      amountIn,
      slippage: slippage.toString(),
      unwrapWHYPE: unwrapWHYPE.toString(),
      ...(feeBps !== undefined && { feeBps: feeBps.toString() }),
      ...(feeRecipient !== undefined && { feeRecipient }),
    });
    return (await fetch(
      `https://api.liqd.ag/v2/route?${params.toString()}`,
    ).then((res) => res.json())) as RouteResponse;
  },
};
