import { Address, Chain } from "viem"

export interface ERC20TokenInfo {
  address: Address
  symbol: string
  decimals: number
  image?: string
}

export interface ContractAddressConfig {
  [key: string]: Address
}

export interface TokenInfo {
  name?: string
  address: Address
  symbol: string
  decimal: number
}

export interface TokenAddressConfig {
  [key: string]: TokenInfo
}

export interface ChainConfig {
  chain: Chain
  supportedChains: Chain[]
  contract: ContractAddressConfig
  tokens?: TokenInfo[]
  token?: TokenAddressConfig
}

export interface Web3Config {
  supportedChains: Chain[]
  chain: Chain
  contract?: ContractAddressConfig[]
  token?: TokenAddressConfig
}
