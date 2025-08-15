import type { Chain } from 'viem';

type ExplorerType = 'tx' | 'address' | 'token';

interface ExplorerOptions {
  baseUrl?: string; // Override explorer base URL
  typeMap?: Record<ExplorerType, string>; // Custom path mapping
  trimTrailingSlash?: boolean; // Whether to remove trailing slash from base URL (default true)
}

/**
 * Get block explorer URL for a transaction, address, or token on the given chain.
 * @param chain - viem Chain object
 * @param type - "tx" | "address" | "token"
 * @param value - Transaction hash, wallet address, or token address
 * @param options - Optional configuration
 */
export function getExplorerUrl(chain: Chain, type: ExplorerType, value: string, options: ExplorerOptions = {}): string {
  const baseUrl = options.baseUrl ?? chain.blockExplorers?.default?.url ?? chain.blockExplorers?.etherscan?.url;

  if (!baseUrl) return '';

  const cleanBase =
    options.trimTrailingSlash === false ? baseUrl : baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

  const path = options.typeMap?.[type] ?? type;

  return `${cleanBase}/${path}/${value}`;
}
