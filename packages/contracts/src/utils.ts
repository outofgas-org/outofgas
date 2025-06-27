import { hyperevm } from "@outofgas/utils";
import { hyperevmContracts } from "./hyperevm";

export const getContract = (chainId: number) => {
  switch (chainId) {
    case hyperevm.id:
      return hyperevmContracts;
    default:
      return undefined;
  }
};
