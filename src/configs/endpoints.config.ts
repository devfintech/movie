import { ENV, Env } from "./env.config"

export const API_URLS = <const>{
  [Env.development]: "https://phim.nguonc.com/api/films",
  [Env.staging]: "",
  [Env.production]: "",
}

export const API_URLS_FOR_CHAINS = {
  TESTNET: {
    url: API_URLS[Env.development],
    chains: [],
    // chains: [baseGoerli, bscTestnet], // Ex
  },
  MAINNET: {
    url: API_URLS[Env.production],
    chains: [],
    // chains: [base, bsc], // Ex
  },
}

export const API_URL = API_URLS[ENV]
