import { Address } from "viem";
import { RouteResponse } from "./types";

export const liquidswap = {
  getRoute: async (
    tokenIn: Address,
    tokenOut: Address,
    amountIn: string,
    unwrapWHYPE: boolean = false,
    slippage: number = 0.5,
  ) => {
    return (await fetch(
      `https://api.liqd.ag/v2/route?multiHop=true&tokenIn=${tokenIn}&tokenOut=${tokenOut}&amountIn=${amountIn}&slippage=${slippage}&unwrapWHYPE=${unwrapWHYPE}`,
    ).then((res) => res.json())) as RouteResponse;
  },
};
