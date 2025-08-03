import { Address } from "viem";

export const hyperevmContracts = {
  WETH: "0x5555555555555555555555555555555555555555" as Address,
  USDT: "0xB8CE59FC3717ada4C02eaDF9682A9e934F625ebb" as Address,
  hyperswapV2: {
    Router: "0xb4a9C4e6Ea8E2191d2FA5B380452a634Fb21240A" as Address,
    Factory: "0x724412C00059bf7d6ee7d4a1d0D5cd4de3ea1C48" as Address,
  },
  hyperswapV3: {
    QuoterV2: "0x03A918028f22D9E1473B7959C927AD7425A45C7C" as Address,
    NonfungiblePositionManager:
      "0x6eDA206207c09e5428F281761DdC0D300851fBC8" as Address,
    Factory: "0xB1c0fa0B789320044A6F623cFe5eBda9562602E3" as Address,
  },
  kittenswap: {
    PairFactory: "0xDa12F450580A4cc485C3b501BAB7b0B3cbc3B31B" as Address,
  },
  hybrafinanceV2: {
    PairFactory: "0x9c7397c9C5ecC400992843408D3A283fE9108009" as Address,
  },
  hybrafinanceV3: {
    QuoterV2: "0x9AAa88ddd409C015F3ab3F557D3B138ec3cd66C0" as Address,
    NonfungiblePositionManager:
      "0x934C4f47B2D3FfcA0156A45DEb3A436202aF1efa" as Address,
  },
};
