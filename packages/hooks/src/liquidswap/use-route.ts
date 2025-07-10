import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";
import { liquidswap, RouteResponse } from "@outofgas/core";

export const useLiquidswapRoute = (
  tokenIn: Address,
  tokenOut: Address,
  amountIn: string,
  options?: {
    unwrapWHYPE?: boolean;
    slippage?: number;
    feeBps?: number; // 1% => 100
    feeRecipient?: Address;
  },
): { data: RouteResponse | undefined; isLoading: boolean } => {
  const { data, isLoading } = useQuery({
    queryKey: [
      "liquidswapRoute",
      tokenIn,
      tokenOut,
      amountIn,
      options?.unwrapWHYPE,
      options?.slippage,
      options?.feeBps,
      options?.feeRecipient,
    ],
    queryFn: async () => {
      return await liquidswap.getRoute(tokenIn, tokenOut, amountIn, options);
    },
    enabled: !!tokenIn && !!tokenOut && !!amountIn && Number(amountIn) > 0,
  });

  return { data, isLoading };
};
