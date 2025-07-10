import { defineChain } from "viem";

export const hyperevm = defineChain({
  id: 999,
  name: "HyperEVM",
  network: "HyperEVM",
  nativeCurrency: { name: "HYPE", symbol: "HYPE", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.hyperliquid.xyz/evm"],
    },
    public: {
      http: ["https://rpc.hyperliquid.xyz/evm"],
    },
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://hyperevmscan.io/",
      apiUrl: "",
    },
  },
  contracts: {
    multicall3: {
      address: "0x76Ab12e29598D719C32E02CEf502c33a115B73ec",
      blockCreated: 11090,
    },
  },
});
