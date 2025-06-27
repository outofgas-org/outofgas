import { getExplorerTxUrl, getExplorerAddressUrl, getExplorerTokenUrl } from "./explorer";
import { mainnet, optimism, arbitrum, base, polygon } from "viem/chains";
import { hyperevm } from "./hyperevm";

describe("getExplorerTxUrl", () => {
  it("should return an empty string for unsupported chain ID", () => {
    expect(getExplorerTxUrl(999999, "0x123")).toBe("");
  });

  it("should return correct URL for Ethereum mainnet", () => {
    const txHash = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
    expect(getExplorerTxUrl(mainnet.id, txHash)).toBe(`${mainnet.blockExplorers.default.url}/tx/${txHash}`);
  });

  it("should return correct URL for Optimism", () => {
    const txHash = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
    expect(getExplorerTxUrl(optimism.id, txHash)).toBe(`${optimism.blockExplorers.default.url}/tx/${txHash}`);
  });

  it("should return correct URL for HyperEVM", () => {
    const txHash = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
    expect(getExplorerTxUrl(hyperevm.id, txHash)).toBe(`${hyperevm.blockExplorers.default.url}/tx/${txHash}`);
  });
});

describe("getExplorerAddressUrl", () => {
  it("should return an empty string for unsupported chain ID", () => {
    expect(getExplorerAddressUrl(999999, "0x123")).toBe("");
  });

  it("should return correct URL for Ethereum mainnet", () => {
    const address = "0x1234567890abcdef1234567890abcdef12345678";
    expect(getExplorerAddressUrl(mainnet.id, address)).toBe(`${mainnet.blockExplorers.default.url}/address/${address}`);
  });

  it("should return correct URL for Arbitrum", () => {
    const address = "0x1234567890abcdef1234567890abcdef12345678";
    expect(getExplorerAddressUrl(arbitrum.id, address)).toBe(`${arbitrum.blockExplorers.default.url}/address/${address}`);
  });

  it("should return correct URL for HyperEVM", () => {
    const address = "0x1234567890abcdef1234567890abcdef12345678";
    expect(getExplorerAddressUrl(hyperevm.id, address)).toBe(`${hyperevm.blockExplorers.default.url}/address/${address}`);
  });
});

describe("getExplorerTokenUrl", () => {
  it("should return an empty string for unsupported chain ID", () => {
    expect(getExplorerTokenUrl(999999, "0x123")).toBe("");
  });

  it("should return correct URL for Ethereum mainnet", () => {
    const tokenAddress = "0x1234567890abcdef1234567890abcdef12345678";
    expect(getExplorerTokenUrl(mainnet.id, tokenAddress)).toBe(`${mainnet.blockExplorers.default.url}/token/${tokenAddress}`);
  });

  it("should return correct URL for Base", () => {
    const tokenAddress = "0x1234567890abcdef1234567890abcdef12345678";
    expect(getExplorerTokenUrl(base.id, tokenAddress)).toBe(`${base.blockExplorers.default.url}/token/${tokenAddress}`);
  });

  it("should return correct URL for Polygon", () => {
    const tokenAddress = "0x1234567890abcdef1234567890abcdef12345678";
    expect(getExplorerTokenUrl(polygon.id, tokenAddress)).toBe(`${polygon.blockExplorers.default.url}/token/${tokenAddress}`);
  });

  it("should return correct URL for HyperEVM", () => {
    const tokenAddress = "0x1234567890abcdef1234567890abcdef12345678";
    expect(getExplorerTokenUrl(hyperevm.id, tokenAddress)).toBe(`${hyperevm.blockExplorers.default.url}/token/${tokenAddress}`);
  });
});
