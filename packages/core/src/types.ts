import { Address } from "viem";

export interface RouteResponse {
  success: boolean;
  tokens: {
    tokenIn: {
      address: Address;
      symbol: string;
      name: string;
      decimals: number;
    };
    tokenOut: {
      address: Address;
      symbol: string;
      name: string;
      decimals: number;
    };
  };
  amountIn: string;
  amountOut: string;
  averagePriceImpact: string;
  execution: {
    to: Address;
    calldata: string;
    details: {
      path: string[];
      amountIn: string;
      amountOut: string;
      minAmountOut: string;
      hopSwaps: {
        tokenIn: Address;
        tokenOut: Address;
        routerName: string;
        fee: number;
        amountIn: string;
        amountOut: string;
        priceImpact: string;
      }[][];
    };
  };
}
