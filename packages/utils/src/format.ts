import numeral from "numeral";
import humanFormat from "human-format";


/**
 * Shortens an identifier string by showing only the beginning and end portions,
 * with ellipsis in the middle. Suitable for various types of identifiers like
 * IPFS CID, transaction hashes, EVM addresses, user IDs, etc.
 *
 * @param id - The identifier string to shorten
 * @param startWidth - Number of characters to show at the start (default: 6)
 * @param endWidth - Number of characters to show at the end (default: 6)
 * @returns Shortened identifier string with ellipsis, or empty string if id is null/undefined
 */
export function shortenId(id: string | null | undefined, startWidth = 6, endWidth = 6): string {
  if (!id) {
    return '';
  }

  if (startWidth === -1 || endWidth === -1) {
    return id;
  }

  return `${id.slice(0, startWidth)}...${id.slice(-endWidth)}`;
}

/**
 * Format a token price for display based on its value.
 *
 * Rules:
 * - If price ≥ 10000 → No decimal places with comma separators
 * - If price ≥ 1 → 2 decimal places with comma separators
 * - If price ≥ 0.1 → 4 decimal places with comma separators
 * - If price ≥ 0.01 → 5 decimal places with comma separators
 * - If price ≥ 0.001 → 6 decimal places with comma separators
 * - If price < 0.001 → Scientific notation with subscript zeros
 *
 * @param price The numeric price value
 * @returns Formatted price string
 */
export function formatPrice(price: number | string | undefined | null): string {
  if (!price) return "0.00";

  const p = Number(price);

  if (isNaN(p)) return "0.00";

  if (p >= 10000) {
    return numeral(p).format("0,0");
  }

  if (p >= 1) {
    return numeral(p).format("0,0.00");
  }

  if (p >= 0.1) {
    return numeral(p).format("0,0.0000");
  }

  if (p >= 0.01) {
    return numeral(p).format("0,0.00000");
  }

  if (p >= 0.001) {
    return numeral(p).format("0,0.000000");
  }

  return formatPriceSubscript(price, 6);
}

export const formatPriceSubscript = (
  num: number | string,
  maxDecimals = 6,
): string => {
  const numValue = typeof num === "number" ? num : Number(num);
  const str = numValue.toFixed(20).replace(/\.?0+$/, "");

  if (!str.includes(".")) return str;

  const match = str.match(/\.?(0+)([1-9].*)/);
  if (!match || match.length <= 1) return str;

  const zeroCount = match[1]?.length ?? 0;
  const rest = match[2]?.slice(0, maxDecimals);

  return `0.0${subscript(zeroCount)}${rest}`;
};

const subscript = (num: number): string => {
  const map: Record<string, string> = {
    "0": "₀",
    "1": "₁",
    "2": "₂",
    "3": "₃",
    "4": "₄",
    "5": "₅",
    "6": "₆",
    "7": "₇",
    "8": "₈",
    "9": "₉",
  };
  return num
    .toString()
    .split("")
    .map((d) => map[d])
    .join("");
};

export const humanScale = new humanFormat.Scale({
  B: 1e9,
  M: 1e6,
  K: 1e3,
});

/**
 * Formats a numeric value into a human-readable string with scale indicators (K, M, B).
 * Values less than 1000 are returned as-is, larger values use K (thousands),
 * M (millions), or B (billions) suffixes.
 *
 * @param value - The numeric value to format
 * @param options - Additional formatting options to pass to human-format
 * @returns Formatted string with appropriate scale indicator
 */
export function formatHuman(
  value: number | string | undefined,
  options?: object,
) {
  const num = Number(value || 0);

  if (num < 1000) return num.toString();

  return humanFormat(Number(value || "0"), {
    scale: humanScale,
    separator: "",
    ...options,
  });
}
