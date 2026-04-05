---
name: outofgas-utils
description: Guide for the `packages/utils` workspace in the OutOfGas monorepo. Use when editing shared helpers for formatting, explorer URLs, HyperEVM utilities, clipboard helpers, or market-data integrations such as DexScreener and GeckoTerminal.
---

# Outofgas Utils

## Overview

Use this skill for generic shared helpers in `packages/utils`. This package is the right home for utilities that are reusable across apps, hooks, and contract packages.

## What This Workspace Owns

- formatting helpers in `format.ts`
- explorer helpers in `explorer.ts`
- HyperEVM helpers in `hyperevm.ts`
- clipboard helpers in `clipboard.ts`
- market-data integrations in `dexscreener.ts` and `geckoterminal.ts`
- shared types in `types.ts`

Several modules already have Jest specs, so keep test coverage aligned with behavior changes.

## Key Methods

Use the existing helpers before adding new utility APIs.

### `format.ts`

- `shortenId(id, startWidth, endWidth)`: Collapse long identifiers such as addresses or tx hashes into `prefix...suffix`.
- `formatPrice(price)`: Format token prices with magnitude-aware precision and switch to subscript-style formatting for tiny values.
- `formatPriceSubscript(num, maxDecimals)`: Render very small decimal values with subscript zeros.
- `formatHuman(value, options)`: Convert large numbers into compact `K`, `M`, and `B` display strings.
- `formatWithSignificant(num, decimals, significant)`: Use fixed decimals for values `>= 1` and significant digits for smaller values.

### `explorer.ts`

- `getExplorerUrl(chain, type, value, options)`: Build a block explorer URL for a transaction, address, or token using a `viem` chain config and optional overrides.

### `hyperevm.ts`

- `hyperevm`: Export the repo's `viem` chain definition for HyperEVM, including RPC URLs, explorer URL, and multicall contract metadata.

### `clipboard.ts`

- `copyToClipboard(text, cb)`: Copy text with `navigator.clipboard` when available and fall back to `document.execCommand('copy')`.
- `pasteFromClipboard(cb)`: Read clipboard text with async browser APIs when available and fall back to a paste-capable textarea flow.

### `dexscreener.ts`

- `new DexScreener(apiKey?)`: Create a client for the DexScreener API.
- `pairSearch(query)`: Search DexScreener pairs using `latest/dex/search`.

### `geckoterminal.ts`

- `new GeckoTerminal(apiKey?)`: Create a client for GeckoTerminal API calls.
- `parsePairName(name)`: Parse pair display strings into `symbol0`, `symbol1`, and `feeTier`.
- `getPairs(dex, page, options)`: Fetch and normalize one page of HypereVM pool data for a DEX.
- `getAllPairs(dex, options)`: Page through pools and aggregate all normalized pairs, with a lower cap when no API key is present.

## Working Rules

- Keep utilities generic and decoupled from React.
- Add or update matching `*.spec.ts` files when behavior changes.
- Export new public helpers through `src/index.ts`.
- Keep browser-only helpers such as clipboard access safe for client-side usage.
- Preserve the existing package boundaries: explorer and formatting helpers stay here, not in apps or hooks.

## Validation

Run from `packages/utils`:

```bash
npm test
npm run lint
npm run build
```
