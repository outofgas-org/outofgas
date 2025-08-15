import { mainnet, optimism, arbitrum, base, polygon } from 'viem/chains';
import { hyperevm } from './hyperevm';
import { getExplorerUrl } from './explorer';

describe('getExplorerTxUrl', () => {
  it('should return correct URL for Ethereum mainnet', () => {
    const txHash = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
    expect(getExplorerUrl(mainnet, 'tx', txHash)).toBe(`${mainnet.blockExplorers.default.url}/tx/${txHash}`);
  });

  it('should return correct URL for Optimism', () => {
    const txHash = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
    expect(getExplorerUrl(optimism, 'tx', txHash)).toBe(`${optimism.blockExplorers.default.url}/tx/${txHash}`);
  });

  it('should return correct URL for HyperEVM', () => {
    const txHash = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
    expect(getExplorerUrl(hyperevm, 'tx', txHash)).toBe(`${hyperevm.blockExplorers.default.url}/tx/${txHash}`);
  });
});

describe('getExplorerAddressUrl', () => {
  it('should return correct URL for Ethereum mainnet', () => {
    const address = '0x1234567890abcdef1234567890abcdef12345678';
    expect(getExplorerUrl(mainnet, 'address', address)).toBe(
      `${mainnet.blockExplorers.default.url}/address/${address}`,
    );
  });

  it('should return correct URL for Arbitrum', () => {
    const address = '0x1234567890abcdef1234567890abcdef12345678';
    expect(getExplorerUrl(arbitrum, 'address', address)).toBe(
      `${arbitrum.blockExplorers.default.url}/address/${address}`,
    );
  });

  it('should return correct URL for HyperEVM', () => {
    const address = '0x1234567890abcdef1234567890abcdef12345678';
    expect(getExplorerUrl(hyperevm, 'address', address)).toBe(
      `${hyperevm.blockExplorers.default.url}/address/${address}`,
    );
  });
});

describe('getExplorerTokenUrl', () => {
  it('should return correct URL for Ethereum mainnet', () => {
    const tokenAddress = '0x1234567890abcdef1234567890abcdef12345678';
    expect(getExplorerUrl(mainnet, 'token', tokenAddress)).toBe(
      `${mainnet.blockExplorers.default.url}/token/${tokenAddress}`,
    );
  });

  it('should return correct URL for Base', () => {
    const tokenAddress = '0x1234567890abcdef1234567890abcdef12345678';
    expect(getExplorerUrl(base, 'token', tokenAddress)).toBe(
      `${base.blockExplorers.default.url}/token/${tokenAddress}`,
    );
  });

  it('should return correct URL for Polygon', () => {
    const tokenAddress = '0x1234567890abcdef1234567890abcdef12345678';
    expect(getExplorerUrl(polygon, 'token', tokenAddress)).toBe(
      `${polygon.blockExplorers.default.url}/token/${tokenAddress}`,
    );
  });

  it('should return correct URL for HyperEVM', () => {
    const tokenAddress = '0x1234567890abcdef1234567890abcdef12345678';
    expect(getExplorerUrl(hyperevm, 'token', tokenAddress)).toBe(
      `${hyperevm.blockExplorers.default.url}/token/${tokenAddress}`,
    );
  });
});
