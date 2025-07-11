import { Address } from "viem";

export const hyperevmContracts = {
  WETH: "0x5555555555555555555555555555555555555555" as Address,
  hyperswapV2: {
    ROUTER: "0xb4a9C4e6Ea8E2191d2FA5B380452a634Fb21240A" as Address,
    FACTORY: "0x724412C00059bf7d6ee7d4a1d0D5cd4de3ea1C48" as Address,
  },
  kittenswap: {
    PAIR_FACTORY: "0xDa12F450580A4cc485C3b501BAB7b0B3cbc3B31B" as Address,
  },
  hybrafinance: {
    PAIR_FACTORY: "0x9c7397c9C5ecC400992843408D3A283fE9108009" as Address,
  },
};
