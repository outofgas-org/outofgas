import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";
import { liquidswap } from "@outofgas/core";

export const useLiquidswapRoute = (
  tokenIn: Address,
  tokenOut: Address,
  amountIn: string,
  slippage: number = 0.5,
) => {
  const { data, isLoading } = useQuery({
    queryKey: ["liquidswapRoute", tokenIn, tokenOut, amountIn, slippage],
    queryFn: async () => {
      return await liquidswap.getRoute(tokenIn, tokenOut, amountIn, slippage);
    },
    enabled: !!tokenIn && !!tokenOut && !!amountIn,
  });

  return { data, isLoading };
};
