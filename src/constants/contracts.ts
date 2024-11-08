import { Address } from "viem"
import { mainnet, sepolia } from "wagmi/chains"

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000" as Address

export const CONTRACTS = {
  MULTICALL: {
    [sepolia.id]: ADDRESS_ZERO,
    [mainnet.id]: ADDRESS_ZERO,
  },
  STAKE: {
    [sepolia.id]: ADDRESS_ZERO,
    [mainnet.id]: ADDRESS_ZERO,
  },
}
