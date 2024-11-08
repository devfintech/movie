import { Chain } from "viem"
import { base, bsc, bscTestnet, fantom, fantomTestnet, mainnet, sepolia } from "wagmi/chains"

import { ENV, Env } from "./env.config"

const chainConfigs = <const>{
  [Env.development]: sepolia,
  [Env.staging]: base,
  [Env.production]: base,
}

const supportedChainsConfig = {
  [Env.development]: [mainnet, bsc, bscTestnet, fantom, fantomTestnet, sepolia],
  [Env.staging]: [mainnet, bsc, bscTestnet, fantom, fantomTestnet],
  [Env.production]: [bsc],
}

export const supportedChains: Chain[] = supportedChainsConfig[ENV]

export const defaultChain = chainConfigs[ENV]
