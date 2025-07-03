import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";
import { liquidswap, RouteResponse } from "@outofgas/core";

export const useLiquidswapRoute = (
  tokenIn: Address,
  tokenOut: Address,
  amountIn: string,
  unwrapWHYPE: boolean = false,
  slippage: number = 0.5,
): { data: RouteResponse | undefined; isLoading: boolean } => {
  const { data, isLoading } = useQuery({
    queryKey: [
      "liquidswapRoute",
      tokenIn,
      tokenOut,
      amountIn,
      unwrapWHYPE,
      slippage,
    ],
    queryFn: async () => {
      return await liquidswap.getRoute(
        tokenIn,
        tokenOut,
        amountIn,
        unwrapWHYPE,
        slippage,
      );
    },
    enabled: !!tokenIn && !!tokenOut && !!amountIn,
  });

  return { data, isLoading };
};
