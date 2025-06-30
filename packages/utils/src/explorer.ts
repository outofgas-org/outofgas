import { hyperevm } from "./hyperevm";
import {
  Chain,
  mainnet,
  optimism,
  arbitrum,
  base,
  polygon,
  bsc,
} from "viem/chains";

/**
 * Get the block explorer URL for a transaction hash on a specific chain
 * @param chainId The chain ID
 * @param txHash The transaction hash
 * @returns The block explorer URL for the transaction
 */
export function getExplorerTxUrl(chainId: number, txHash: string): string {
  const explorer = getExplorerBaseUrl(chainId);
  if (!explorer) return "";

  return `${explorer}/tx/${txHash}`;
}

/**
 * Get the block explorer URL for an address on a specific chain
 * @param chainId The chain ID
 * @param address The address
 * @returns The block explorer URL for the address
 */
export function getExplorerAddressUrl(
  chainId: number,
  address: string,
): string {
  const explorer = getExplorerBaseUrl(chainId);
  if (!explorer) return "";

  return `${explorer}/address/${address}`;
}

/**
 * Get the block explorer URL for a token on a specific chain
 * @param chainId The chain ID
 * @param tokenAddress The token address
 * @returns The block explorer URL for the token
 */
export function getExplorerTokenUrl(
  chainId: number,
  tokenAddress: string,
): string {
  const explorer = getExplorerBaseUrl(chainId);
  if (!explorer) return "";

  return `${explorer}/token/${tokenAddress}`;
}

/**
 * Get the base URL for a block explorer based on chain ID
 * @param chainId The chain ID
 * @returns The base URL for the block explorer
 */
function getExplorerBaseUrl(chainId: number): string | undefined {
  // Define common chains and their explorers
  switch (chainId) {
    case mainnet.id:
      return mainnet.blockExplorers.default.url;
    case optimism.id:
      return optimism.blockExplorers.default.url;
    case arbitrum.id:
      return arbitrum.blockExplorers.default.url;
    case base.id:
      return base.blockExplorers.default.url;
    case polygon.id:
      return polygon.blockExplorers.default.url;
    case hyperevm.id:
      return hyperevm.blockExplorers.default.url;
    case bsc.id:
      return bsc.blockExplorers.default.url;
    default:
      return undefined;
  }
}
